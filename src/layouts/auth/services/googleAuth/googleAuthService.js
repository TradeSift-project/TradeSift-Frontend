import API_BASE_URL from "../../../../services/apiConfig";

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
