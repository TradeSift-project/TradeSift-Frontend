import apiClient from "../../../services/apiClient";
import API_BASE_URL from "../../../services/apiConfig";

const post = async (url, body) => {
    const response = await apiClient.post(url, body);
    return response.data;
};

// Login
export const login = ({ email, password, rememberDevice }) =>
    post("/auth/login", { email, password, rememberDevice });

export const verifyLoginOtp = ({ email, otp }) =>
    post("/auth/login/verify-otp", { email, otp });

export const resendLoginOtp = (email) =>
    post("/auth/login/resend-otp", { email });

// Signup
export const signup = ({
    firstName,
    lastName,
    organisation,
    email,
    password,
    passwordConfirmation,
    agreedToTerms,
}) =>
    post("/auth/register", {
        firstName,
        lastName,
        organisation,
        email,
        password,
        passwordConfirmation,
        agreedToTerms,
    });

export const verifyOtp = ({ email, otp }) =>
    post("/auth/register/verify-otp", { email, otp });

export const resendRegistrationOtp = (email) =>
    post("/auth/register/resend-otp", { email });

// Forgot password
export const forgotPassword = (email) =>
    post("/auth/forgot-password", { email });

export const verifyForgotPasswordOtp = ({ email, otp }) =>
    post("/auth/forgot-password/verify-otp", { email, otp });

export const resendForgotPasswordOtp = (email) =>
    post("/auth/forgot-password/resend-otp", { email });

export const resetPassword = ({ email, newPassword, newPasswordConfirmation }) =>
    post("/auth/forgot-password/reset-password", {
        email,
        newPassword,
        newPasswordConfirmation,
    });

/**
 * Initiates the Google OAuth flow by performing a full browser redirect
 * to the backend OAuth endpoint. The backend then redirects to Google,
 * handles the callback, sets HTTP-only auth cookies, and redirects the
 * browser to the authenticated application route.
 *
 * This must be a browser redirect (window.location.href), NOT an Axios
 * request, because OAuth requires the browser to follow redirects and
 * receive Set-Cookie headers directly from the backend.
 */
export const initiateGoogleOAuth = () => {
    // Strip the trailing "/api" segment from API_BASE_URL to get the server root,
    // then append the full OAuth path that the backend exposes.
    const serverRoot = API_BASE_URL.replace(/\/api$/, "");

    window.location.href = `${serverRoot}/api/auth/google`;
};
