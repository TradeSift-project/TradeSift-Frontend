import { useState, useCallback, useMemo } from 'react'
import { AuthContext } from './auth'
import { getMe, logoutUser } from '../services/userService'

const MAX_SESSION_CHECK_ATTEMPTS = 3

const isAuthRejection = (err) => [401, 403].includes(err?.response?.status)

const fetchMeWithRetry = async (attempt = 1) => {
  try {
    return await getMe()
  } catch (err) {
    if (isAuthRejection(err) || attempt >= MAX_SESSION_CHECK_ATTEMPTS) throw err
    await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
    return fetchMeWithRetry(attempt + 1)
  }
}

// Single source of truth for the session. The check is lazy: AuthGuard triggers it,
// so public pages like the landing page never hit /users/me.
export const AuthProvider = ({ children }) => {
  // 'unknown' | 'authenticated' | 'unauthenticated' | 'error'
  const [status, setStatus] = useState('unknown')
  const [user, setUser] = useState(null)

  // State is only set after the request settles, so this is safe to call from effects.
  // Only 401/403 means logged out; timeouts, network errors and 5xx become 'error' so a
  // slow or waking backend never bounces a logged-in user to /login.
  const checkAuth = useCallback(
    () =>
      fetchMeWithRetry()
        .then((res) => {
          const ok = Boolean(res.success && res.data)
          setUser(ok ? res.data : null)
          setStatus(ok ? 'authenticated' : 'unauthenticated')
          return ok
        })
        .catch((err) => {
          if (isAuthRejection(err)) {
            setUser(null)
            setStatus('unauthenticated')
          } else {
            setStatus('error')
          }
          return false
        }),
    []
  )

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } finally {
      // Clear session locally even if the request fails
      setUser(null)
      setStatus('unauthenticated')
    }
  }, [])

  const value = useMemo(
    () => ({ status, user, setUser, checkAuth, logout }),
    [status, user, checkAuth, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
