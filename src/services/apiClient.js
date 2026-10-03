import axios from "axios";
import API_BASE_URL from "./apiConfig.js";

// Generous enough for the Render backend to wake from a cold start
const REQUEST_TIMEOUT_MS = 30000;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: REQUEST_TIMEOUT_MS,
    withCredentials: true,
});

// Auth pages where a failed session must not trigger a redirect (prevents reload loops)
const PUBLIC_PATHS = ['/login', '/signup', '/verify-otp', '/reset-password', '/'];

const REFRESH_STAMP_KEY = 'tradesift_last_refresh';
// Another tab refreshed this recently, so its new cookies are already shared with us
const REFRESH_REUSE_WINDOW_MS = 10000;

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

const readRefreshStamp = () => {
    try {
        return Number(localStorage.getItem(REFRESH_STAMP_KEY)) || 0;
    } catch {
        return 0;
    }
};

const writeRefreshStamp = () => {
    try {
        localStorage.setItem(REFRESH_STAMP_KEY, String(Date.now()));
    } catch {
        // storage unavailable; cross-tab dedupe just won't apply
    }
};

// The backend rotates refresh tokens, so two tabs refreshing with the same token makes the
// second one fail and wipes the cookies for both. Serialise refreshes across tabs with a
// Web Lock and skip the call when another tab just did it.
const refreshSession = async () => {
    const doRefresh = async () => {
        if (Date.now() - readRefreshStamp() < REFRESH_REUSE_WINDOW_MS) return;
        // Fresh axios instance so the refresh call is not intercepted
        await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
            timeout: REQUEST_TIMEOUT_MS,
        });
        writeRefreshStamp();
    };

    if (navigator.locks?.request) {
        return navigator.locks.request('tradesift-auth-refresh', doRefresh);
    }
    return doRefresh();
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
                await refreshSession();
                processQueue(null);
                return apiClient(originalRequest);
            } catch (err) {
                processQueue(err, null);

                // Only a definitive auth rejection ends the session. Timeouts, network errors and
                // 5xx (e.g. a cold-starting backend) must not log the user out.
                const status = err.response?.status;
                if ((status === 401 || status === 403) && !PUBLIC_PATHS.includes(window.location.pathname)) {
                    window.location.href = '/login';
                }

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
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