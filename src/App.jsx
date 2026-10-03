import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import ComingSoonModal from './components/modal/ComingSoonModal'
import AppRoutes from './routes/Routes'
import ErrorBoundary from './components/ErrorBoundary'
import { Toaster } from 'sonner'

const STORAGE_KEY = 'tradesift_preview_shown'
const EXCLUDED_PATHS = ['/dashboard', '/dashboard/tradeshield']

const App = () => {
  const location = useLocation()
  const isExcludedPath = EXCLUDED_PATHS.includes(location.pathname)
  const [alreadyShown] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      // localStorage unavailable – show once per session
      return false
    }
  })
  const [dismissed, setDismissed] = useState(false)
  const modalOpen = !isExcludedPath && !alreadyShown && !dismissed

  useEffect(() => {
    if (!modalOpen) return
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignore – modal just shows again next session
    }
  }, [modalOpen])

  const handleClose = useCallback(() => setDismissed(true), [])

  return (
    <>
      <ComingSoonModal isOpen={modalOpen} onClose={handleClose} />
      <ErrorBoundary resetKey={location.pathname}>
        <AppRoutes />
      </ErrorBoundary>
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
        expand
      />
    </>
  )
}

export default App
