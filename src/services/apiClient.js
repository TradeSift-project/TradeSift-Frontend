import axios from "axios";
import API_BASE_URL from "./apiConfig.js";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning":"true"
    },
    timeout: 10000,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // Do not intercept 401s for auth routes (like login, signup) since they don't use access tokens
            if (originalRequest.url && originalRequest.url.includes('/auth/')) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Wait for the refresh to finish, then retry
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(() => {
                    originalRequest._retry = true;
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh endpoint using a fresh axios instance to avoid interceptor deadlocks
                await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                
                // Process queued requests
                processQueue(null);
                
                // Retry the original request
                return apiClient(originalRequest);
            } catch (err) {
                processQueue(err, null);
                // Redirect to login if refresh fails
                try {
                    await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
                } catch (e) {
                    // Ignore logout error if they're already unauthorized
                }
                
                // Only redirect if not already on the login page to prevent infinite reload loops
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        if (error.response && error.response.status === 401 && originalRequest._retry) {
            // If it failed even after retry, clear session and redirect.
            try {
                await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
            } catch (e) {
                // Ignore logout error
            }

            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }

        if (error.response) {
            console.error(
                "API Error:",
                error.response.status,
                error.response.data
            );
        } else if (error.request) {
            console.error(
                "Network Error:",
                error.message
            );
        } else {
            console.error(
                "Request Error:",
                error.message
            );
        }

        return Promise.reject(error);
    }
);

export default apiClient; 