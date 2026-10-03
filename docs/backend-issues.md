# Backend review: issues found

This is a read-only review of `backend-TradeSift`. No backend code was changed. It is written for the backend developers and lists each issue with where it is, why it matters, and a suggested fix.

**Overall rating: 5/10.** The structure is good, but there are several real security holes and processing bugs. Fixing the six items under "Fix first" would bring it to about 7.

---

## What is done well

- Code is organised by feature (controller, service, repository), and every request body, query string and URL parameter is validated with zod.
- Every operation, document, extraction and export query checks that the record belongs to the logged-in user and returns 404 otherwise. No way was found to read another user's data through the API.
- Refresh tokens are random, stored only as hashes, and replaced on every use. Cookies are httpOnly.
- Passwords are hashed with bcrypt. OTPs come from a secure random generator, with a cooldown on how often they can be requested.

---

## Fix first

1. Confirm `NODE_ENV=production` is set on Render (issue C6).
2. Fix the signup OTP limit and make the attempt counter atomic (C1, C3).
3. Add rate limiting to every `/auth` route (C2).
4. Stop logging tokens (C5).
5. Issue a one-time reset token when the password-reset OTP is verified (C4).
6. Make uploaded documents private (C7).

---

## Critical / high

### C1. Signup OTP can be guessed without limit

**Where:** `src/modules/auth/auth.service.ts`, `verifyOtp`, lines 277–279.

**Problem.** When the attempt limit is reached, the code throws "Too many incorrect attempts" but never deletes the pending signup and never saves the new attempt count. The OTP is compared *before* the limit check, so the correct code keeps working. An attacker can keep guessing for the full 5-minute OTP window.

Combined with the missing rate limits (C2), this lets someone register an email address they do not own. If the real owner later signs in with Google using that email, they land in the attacker's account.

**Fix.** Delete the pending signup when the limit is hit, as `verifyLoginOtp` already does. Check the limit before comparing the OTP.

### C2. No rate limiting anywhere

**Where:** `src/middleware/rateLimit.middleware.ts` is empty. `express-rate-limit` and `helmet` are installed but never used.

**Problem.** Login passwords and OTPs can be guessed as fast as the server can answer.

**Fix.**
- Add `express-rate-limit` to all `/auth` routes, limited per IP and per email.
- Set `app.set('trust proxy', 1)` so the limiter sees real client IPs behind Render's proxy.
- Add `helmet()` while there.

### C3. OTP attempt counter can be bypassed with parallel requests

**Where:** `verifyOtp`, `verifyLoginOtp` and `verifyForgotPasswordOtp` in `auth.service.ts`.

**Problem.** The attempt count is read from Redis, checked, and written back as separate steps. Many requests sent at the same moment all read "0 attempts", so each one gets a guess. This matters most for forgot-password, because no password is needed there, which makes it an account-takeover route.

**Fix.** Keep the attempt count in its own Redis key and use `INCR`, which is atomic. Reject when the returned value is over the limit, before comparing the OTP.

### C4. Password reset is not tied to the person who verified the OTP

**Where:** `resetPassword` in `auth.service.ts`, line 631.

**Problem.** After the OTP is verified, a "verified" flag is stored under the email address for 5 minutes. `resetPassword` only needs the email and a new password. Anyone who sends that email address during those 5 minutes can set the new password.

**Fix.** On successful verification, generate a random one-time reset token, store its hash, and return it to the client. Require that token in `resetPassword` and delete it after use.

### C5. Tokens are written to the logs

**Where:** `src/modules/auth/auth.controller.ts`
- The refresh controller logs the raw refresh cookie (`log('Refresh token from cookie:', ...)`).
- The Google callback logs both tokens (`logger.info({ accessToken, refreshToken }, ...)`).

**Problem.** Anyone with access to the logs (Render dashboard, log storage) can copy a token and take over that session.

**Fix.** Remove both log lines. Treat any logs already written as exposed.

### C6. Unauthenticated "delete all users" route if `NODE_ENV` is not set

**Where:** `src/modules/users/user.routes.ts` and `src/config/env.ts`.

**Problem.** `GET /users` (list all users) and `DELETE /users` (wipe all users, sessions and devices) have no authentication. They are only hidden when `NODE_ENV` is exactly `production`, and `NODE_ENV` defaults to `development`. If Render does not set it, anyone can wipe every account. The same missing setting also turns off the `secure` flag on cookies.

**Fix.** Check Render's environment variables today. Better: delete these test routes, or protect them with an admin check. Do not rely on an environment default for safety.

### C7. Uploaded documents are publicly readable

**Where:** `src/integrations/storage/cloudinary.provider.ts`.

**Problem.** Files are uploaded with Cloudinary's default public delivery. Anyone with the link can open customs and trade documents, permanently, even after they are deleted from TradeSift (see M8).

**Fix.** Upload with `type: 'authenticated'` (or `private`), and serve files through signed links that expire, generated only after an ownership check.

---

## Medium

### M1. Two refreshes with the same token can both succeed

**Where:** `rotateRefreshToken` in `src/modules/sessions/session.service.ts`.

**Problem.** The code finds the session by token hash, then updates it by session id. Two refreshes sent at the same time both pass the lookup, and the last write wins. One tab ends up holding a token that no longer exists, and is logged out on its next refresh. The frontend now works around this with a cross-tab lock, but the backend should be safe on its own.

**Fix.** Update with a condition that the stored hash still equals the old hash (`updateMany({ where: { id, refreshTokenHash: oldHash } })`) and treat zero updated rows as a conflict. Optionally accept the previous token for a few seconds as a grace period.

### M2. Refresh clears cookies on any error

**Where:** the `refreshToken` controller in `auth.controller.ts`.

**Problem.** The `catch` block calls `clearAuthCookies` for every error, including a temporary database failure. A brief outage logs users out.

**Fix.** Only clear cookies when the error is a `401` (session missing or expired).

### M3. Google login has no `state` parameter

**Where:** `getGoogleAuthUrl` and `googleAuthCallback`.

**Problem.** Without a `state` value checked on return, an attacker can trick someone into completing a Google login into the *attacker's* account (login CSRF). Separately, `access_type: 'offline'` and `prompt: 'consent'` are not needed, since Google's tokens are not stored.

**Fix.** Generate a random `state`, store it in a short-lived httpOnly cookie, and reject the callback if they do not match.

**Also check:** `GOOGLE_OAUTH_REDIRECT_URI` must point at the frontend domain (through the Vercel `/api` proxy), not at `onrender.com`. Otherwise the auth cookies are saved for the Render domain, the frontend never sees them, and Google users always end up back on `/login`.

### M4. Failed AI extractions look like success

**Where:** `src/integrations/ai/ai.client.ts`.

**Problem.** When a single document fails, it is turned into `{ fields: {}, confidence: 0 }` and the job still finishes as COMPLETED, moving the operation to REVIEW. If `AI_BACKEND_URL` is not set at all, every document "succeeds" with empty fields. Users see empty results with no error. Confidence is also hardcoded to `1.0` on success.

**Fix.** Record a failure per document. Fail the job (or mark it partially failed) when documents fail. Fail fast if `AI_BACKEND_URL` is missing. Use the confidence the AI engine returns.

### M5. Failed jobs can create duplicate extractions

**Where:** `src/modules/processing/processing.worker.ts` and `processing.service.ts`.

**Problem.** The worker marks the job FAILED and then rethrows, so BullMQ retries it up to 3 times. If a step fails *after* the extractions were saved (for example the status change to REVIEW, which throws if the operation is not in PROCESSING), the retry saves the extractions again.

**Fix.** Delete existing extractions for the job before saving, or check whether they already exist. Only mark the job FAILED on the last attempt.

### M6. Uploads can exhaust memory

**Where:** `src/middleware/upload.middleware.ts` and `document.constants.ts`.

**Problem.** Files are held in memory, up to 20 files × 10 MB = 200 MB per request, which can crash a small Render instance. There is also no per-operation total, so the frontend's 20-document limit is not enforced by the server.

**Fix.** Lower the per-request size or stream uploads to Cloudinary. Check the existing document count before accepting new files.

### M7. File type checks do not match what the AI can handle

**Where:** `ALLOWED_MIME_TYPES` in `document.constants.ts`.

**Problem.** The allowed list includes doc, docx, xls, xlsx, gif, webp, bmp, tiff, svg and heic. The AI only handles PDF, JPG and PNG, and the error message already says "Only PDF, JPG, JPEG, and PNG are allowed." The type is also taken from what the client reports, not checked against the file's contents.

**Fix.** Limit the list to PDF, JPEG and PNG, and check the file's first bytes (for example with the `file-type` package).

### M8. Deletes leave orphaned files and records

**Problem.**
- Deleting an account removes the user, sessions and trusted devices, but leaves operations, documents, extractions and Cloudinary files behind.
- Deleting an operation removes its document records but not the Cloudinary files.
- Extractions have no relation to their operation in the schema, so they are never cleaned up.
- `cloudinary.uploader.destroy()` is called without a resource type. Non-image files are not deleted, but the "not found" reply is counted as success.

**Fix.** Delete Cloudinary files whenever their records are deleted, passing the right resource type. Add a relation from `Extraction` to `Operation` with cascade delete. Delete all user data on account deletion.

### M9. No database indexes on `userId` or `operationId`

**Where:** `prisma/schema.prisma`.

**Problem.** Every "list my operations / documents / extractions" query scans the whole MongoDB collection. This gets slower as data grows.

**Fix.** Add `@@index([userId])` and `@@index([operationId])` to the models that are queried by them.

### M10. Overly broad CORS

**Where:** `src/app.ts`.

**Problem.** Any `*.vercel.app` origin is allowed with credentials, so any site anyone deploys on Vercel passes the check. The `lax` cookies limit the damage, but the list should be exact. A rejected origin also returns `500` instead of `403`.

**Fix.** Allow only the real frontend URL (and preview URLs matching your project's specific prefix). Return `403` for rejected origins.

---

## Low / cleanup

- **Account enumeration:** login takes noticeably less time for an unknown email than for a wrong password (the bcrypt check is skipped), and `/register` returns 409 for existing emails. Both reveal which emails have accounts.
- **OTP comparison:** OTPs are compared with `!==` rather than a constant-time comparison (`crypto.timingSafeEqual`).
- **Noisy logs:** every `/users/me` call logs "Checking user ID......", and `requireAuth` logs an *error* for every logged-out request. There is also unreachable code after a `throw` in `getMe`.
- **Stale Vercel config:** `vercel.json` with `api/index.ts` deploys the backend as serverless functions, where the BullMQ worker never runs. Render is what the frontend uses; remove the Vercel setup or document it as unsupported.
- **Unused code:** dependencies `ngrok`, `@ngrok/ngrok`, `mongodb`, `compression`; functions `signRefreshToken` and `verifyRefreshToken`; the commented-out `ngrokUrl()` call in `server.ts`.
- **No tests:** `npm test` prints "no test specified". The auth service and session rotation are the most important to cover.
- **Email template typo:** a stray `c` after `<div class="logo">` in the OTP email.
- **Signup always trusts the device:** `verifyOtp` creates a trusted device for every new signup, regardless of any "remember me" choice.

---

## For the frontend team

`PATCH /users/me` already exists (`src/modules/users/user.routes.ts`). The frontend's mocked `updateUser` in `src/services/userService.js` can be connected now. Approved data, ERP mapping and the activity log are the only areas that still lack backend endpoints.
