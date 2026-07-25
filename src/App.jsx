import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Home from './layouts/Landing/Home'
import ComingSoonModal from './components/modal/ComingSoonModal'
import AppRoutes from './routes/Routes'
import { Toaster } from 'sonner'

const STORAGE_KEY = 'tradesift_preview_shown'
const EXCLUDED_PATHS = ['/dashboard']

const App = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const location = useLocation()
  const isExcludedPath = EXCLUDED_PATHS.includes(location.pathname)

  useEffect(() => {
    if (isExcludedPath) {
      setModalOpen(false)
      return
    }

    try {
      const alreadyShown = localStorage.getItem(STORAGE_KEY) === 'true'
      if (!alreadyShown) {
        setModalOpen(true)
        localStorage.setItem(STORAGE_KEY, 'true')
      }
    } catch {
      // localStorage unavailable – show once per session
      setModalOpen(true)
    }
  }, [isExcludedPath])

  const handleClose = useCallback(() => setModalOpen(false), [])

  return (
    <>
      <ComingSoonModal isOpen={modalOpen} onClose={handleClose} />
      <AppRoutes />
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
