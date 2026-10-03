import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Home = lazy(() => import('../layouts/Landing/Home'))
const Login = lazy(() => import('../layouts/auth/Login'))
const Signup = lazy(() => import('../layouts/auth/Signup'))
const OTP = lazy(() => import('../layouts/auth/OTP'))
const ResetPassword = lazy(() => import('../layouts/auth/ResetPassword'))
const Dashboard = lazy(() => import('../layouts/Dashboard/Dashboard'))

const FullScreenLoader = ({ label }) => (
  <div className="flex h-screen w-screen items-center justify-center bg-white font-geist">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
      {label && (
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{label}</span>
      )}
    </div>
  </div>
)

// protected: unauthenticated users go to /login; public: authenticated users go to /dashboard
const AuthGuard = ({ mode, children }) => {
  const { status, checkAuth } = useAuth()

  // Trust the cached status only when it can't be stale for this route. A protected route
  // reached while marked logged-out (e.g. right after login/OTP) is re-verified first.
  const [verified, setVerified] = useState(
    status === 'authenticated' || (mode === 'public' && status === 'unauthenticated')
  )

  useEffect(() => {
    if (!verified) checkAuth().then(() => setVerified(true))
  }, [verified, checkAuth])

  if (!verified) {
    return <FullScreenLoader label="Verifying session..." />
  }

  // Server unreachable: the session may still be valid, so offer a retry instead of logging out
  if (mode === 'protected' && status === 'error') {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white font-geist">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <span className="text-sm font-semibold text-gray-700">Unable to reach the server.</span>
          <button
            onClick={() => setVerified(false)}
            className="px-6 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (mode === 'protected' && status !== 'authenticated') {
    return <Navigate to="/login" replace />
  }
  if (mode === 'public' && status === 'authenticated') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* key per mode: React would otherwise reuse the guard (and its verified state)
            when navigating from /login to /dashboard and bounce a fresh login back */}
        <Route path="/login" element={<AuthGuard key="public" mode="public"><Login /></AuthGuard>} />
        <Route path="/signup" element={<AuthGuard key="public" mode="public"><Signup /></AuthGuard>} />
        <Route path="/reset-password" element={<AuthGuard key="public" mode="public"><ResetPassword /></AuthGuard>} />
        <Route path="/verify-otp" element={<AuthGuard key="public" mode="public"><OTP /></AuthGuard>} />

        <Route path="/dashboard/*" element={<AuthGuard key="protected" mode="protected"><Dashboard /></AuthGuard>} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
