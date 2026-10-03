# Frontend cleanup and auth fixes

This document describes the changes made to the TradeSift frontend: what was wrong, what was changed, and what is still open. It is written for anyone working on this codebase.

**Result:** lint went from 102 problems to 0, the build passes, the main bundle went from one 780 KB file to several smaller ones, and the project now has 16 automated tests.

---

## 1. Auth bugs fixed (the "logged in but sent back to login" problem)

Users who were logged in were sometimes redirected to the login page. Five separate causes were found and fixed.

### 1.1 Guard reused between `/login` and `/dashboard`

**Problem.** After a successful login or OTP verification, the app navigates from `/login` (or `/verify-otp`) to `/dashboard`. Both routes rendered the same guard component in the same position, so React reused the existing instance instead of creating a new one. The guard kept its old "this user is logged out" state and sent the user straight back to `/login`.

**Fix.** Each guard type now gets its own instance (`key="public"` and `key="protected"` in `src/routes/Routes.jsx`), so moving from a public page to the dashboard always re-checks the session. A test covers this exact flow.

### 1.2 Slow backend treated as "logged out"

**Problem.** The backend runs on Render's free tier, which sleeps when idle and can take 30 seconds or more to wake up. Requests gave up after 10 seconds. When the session check timed out, the app treated it as a logout and redirected to `/login`.

**Fix.**
- The request timeout is now 30 seconds.
- The session check retries up to 3 times, with a short pause between attempts.
- Only a `401` or `403` response counts as "logged out". A timeout, network error or `5xx` now shows an **"Unable to reach the server"** screen with a **Retry** button, and the user stays logged in.

### 1.3 A failed refresh destroyed the session

**Problem.** When the access token expired, the client asked the backend for a new one. If that refresh call failed for *any* reason, including a timeout, the client called `/auth/logout`. That deletes the session on the server, so one network blip logged the user out for good.

**Fix.** The client only redirects to `/login` when the refresh is actually rejected with `401` or `403`, and it never calls logout itself. On a timeout or server error, the request simply fails and the session stays valid.

### 1.4 Two tabs refreshing at the same time

**Problem.** The backend issues a new refresh token every time one is used, and the old one stops working. When two tabs refreshed at the same moment, the second tab sent the old token. The backend answered "Session not found" and cleared the cookies, which logged out both tabs.

**Fix.** Refreshes are now done one at a time across all open tabs, using the browser's Web Locks API. A tab also skips its refresh if another tab refreshed in the last 10 seconds, since the new cookies are already shared.

### 1.5 Logout after a successful refresh

**Problem.** If a request still got a `401` right after a successful refresh, the client called logout and killed the session it had just renewed.

**Fix.** That branch was removed. The request now just fails.

---

## 2. Auth structure

### 2.1 One auth context instead of repeated checks

Before, the login guard and the public-page guard were two copied components, and each called `GET /users/me` every time it was shown. The Dashboard and Settings pages also called `/users/me` themselves.

Now:
- `src/context/AuthContext.jsx` holds the session state (`unknown`, `authenticated`, `unauthenticated` or `error`) and the current user. It exposes `checkAuth()`, `logout()` and `setUser()`.
- `src/hooks/useAuth.js` gives components access to it.
- `src/routes/Routes.jsx` has a single `AuthGuard` with two modes, `public` and `protected`.
- The session is only checked when a guarded page loads. The landing page no longer calls `/users/me` at all.
- Dashboard and Settings read the user from the context instead of fetching it again.
- Logging out clears the session in the context, so `/login` no longer bounces a logged-out user back to the dashboard.

### 2.2 Auth API calls in one file

The 11 files under `src/layouts/auth/services/` (one per endpoint) were replaced by a single `src/layouts/auth/services/authService.js`. The exported function names are unchanged, so the handlers only needed their import paths updated.

### 2.3 API client cleanup (`src/services/apiClient.js`)

- Removed the leftover `ngrok-skip-browser-warning` header.
- The list of public pages (where a failed session must not redirect) is now defined once as `PUBLIC_PATHS`.
- The default API address is now `/api`, which works with the Vite proxy in development and the `vercel.json` rewrite in production. It used to fall back to `localhost:3000`, which matched neither.

---

## 3. Fake data removed from job headers

The Review, Export, Mapping, Processing, Approved Data and Upload pages built their header by spreading a mock job (`mockUnifiedJob`) and overriding a few fields. Anything not overridden leaked through, so users saw a fake "7 Documents" count and "Electronics Components" description.

A new mapper, `src/services/jobMapper.js`, builds the header from the real operation returned by the API: id, type, description, real document count and status. The workflow step labels moved to a `WORKFLOW_PIPELINE` constant.

**Still using placeholder data** (because the backend endpoints do not exist yet), each marked `TODO(backend)`:
- Approved Data page contents (`mockUnifiedJob.approved`)
- Mapping table (`MOCK_MAPPING_DATA`)
- Activity log (`activityService`)
- Profile update (`updateUser`). Note: the backend already has `PATCH /users/me`, so this one can be connected now.

---

## 4. Code quality

### 4.1 Lint: 102 problems to 0

- Removed unused imports, variables and catch-block parameters across about 45 files.
- Fixed the React hook warnings that could cause extra renders or stale data:
  - Theme and sidebar-collapsed state now load once at startup instead of in an effect.
  - The dashboard closes the mobile menu on navigation without an effect.
  - The dashboard and documents pages load data without triggering an extra render.
  - The coming-soon modal's visibility is calculated instead of being set inside an effect.
  - `DocumentTypeIcon` uses a plain lookup map instead of creating a component during render.
  - Missing effect dependencies were added (`useAutoClearer`, `ActiveWorkflows`).
- The nav-theme context object moved to its own file (`src/context/navTheme.js`) so hot reload works for the provider.
- The three placeholder services (`activityService`, `approvedDataService`, `mappingService`) have a lint exception, so the real API calls can be connected by uncommenting them.

### 4.2 Smaller fixes

- **Router package:** all imports now use `react-router-dom`, and the separate `react-router` package was uninstalled.
- **ERP mappings:** the "Review Mapping" button now uses the router instead of `window.location.href`, which reloaded the whole app.
- **Document limit:** the hardcoded `20` is now a shared `MAX_DOCUMENTS_PER_OPERATION` constant in `documentConstants.js`, used by both the upload screen and the operations list.

---

## 5. Performance: pages load on demand

All top-level pages (landing, login, signup, OTP, reset password, dashboard) are now loaded on demand with `React.lazy`. Visitors to the landing page no longer download the dashboard code.

| | Before | After |
|---|---|---|
| Largest JavaScript file | 780 KB (215 KB gzipped) | 255 KB (84 KB gzipped) |
| Vite "chunk too large" warning | Yes | No |

---

## 6. Error boundary

`src/components/ErrorBoundary.jsx` wraps all routes. If a page crashes while rendering, the user sees a "Something went wrong" screen with **Try again** and **Dashboard** buttons instead of a blank app. It clears itself when the user navigates to another page.

---

## 7. Tests

The project now uses Vitest and Testing Library. Run `npm test` (or `npm run test:watch`).

| File | What it covers |
|---|---|
| `src/services/apiClient.test.js` | Retry after a refresh; one refresh for many failed requests; redirect only when the server rejects the session; no logout on timeouts; no redirect from public pages; auth endpoints passed through untouched; skipping the refresh when another tab just did it |
| `src/routes/Routes.test.jsx` | Logged-in users reach the dashboard; rejected sessions go to `/login`; logged-in users are sent away from `/login`; the landing page never checks the session; the post-login case from 1.1; retries; the "unable to reach the server" screen |
| `src/components/ErrorBoundary.test.jsx` | Fallback screen on a crash; recovery on navigation |

All 16 tests pass. Configuration is in `vitest.config.js` and `src/test/setup.js`.

---

## 8. What is still open

- **Backend endpoints:** approved data, ERP mapping and activity log need endpoints before their placeholder data can be removed.
- **TypeScript:** the project is still plain JavaScript.
- **Backend issues:** see `docs/backend-issues.md`. Several of them (missing rate limits, token logging, OTP weaknesses) affect the security of the whole product.

---

## Files added

- `src/context/AuthContext.jsx`, `src/context/auth.js`, `src/hooks/useAuth.js`
- `src/context/navTheme.js`
- `src/services/jobMapper.js`
- `src/layouts/auth/services/authService.js`
- `src/components/ErrorBoundary.jsx`
- `vitest.config.js`, `src/test/setup.js` and the three test files above
- `docs/frontend-changes.md`, `docs/backend-issues.md`

## Files removed

- The 11 per-endpoint files under `src/layouts/auth/services/` (`forgotPassword/`, `googleAuth/`, `login/`, `signup/`)
