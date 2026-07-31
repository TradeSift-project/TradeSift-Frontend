import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import ComingSoonModal from '../../components/modal/ComingSoonModal'
import Sidebar from './components/layout/Sidebar'
import DashboardHeader from './components/layout/DashboardHeader'
import StatsGrid from './components/overview/StatsGrid'
import ActiveWorkflows from './components/overview/ActiveWorkflows'
import RecentDocuments from './components/overview/RecentDocuments'
import OperationalAlerts from './components/overview/OperationalAlerts'
import QuickActions from './components/overview/QuickActions'
import DashboardLoader from './components/layout/DashboardHeader/DashboardLoader'
import Documents from './Documents'
import DocumentReview from './DocumentReview'
import Processing from './Processing'
import Review from './Review'
import ApprovedData from './ApprovedData'
import Mapping from './Mapping'
import Export from './Export'
import UploadOperation from './UploadOperation'
import OperationsList from './OperationsList'
import OperationWorkspace from './OperationWorkspace'
import { getMe, logoutUser } from '../../services/userService'
import NewOperationModal from '../../components/modal/NewOperationModal'

const Dashboard = () => {
  const navigate = useNavigate()
  const [showLoader, setShowLoader] = useState(true)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [showNewOpModal, setShowNewOpModal] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    let isMounted = true
    getMe()
      .then((res) => {
        if (isMounted && res.success && res.data) {
          setUser(res.data)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch user profile:', err)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logoutUser()
      toast.success('Logged out successfully.')
      navigate('/login')
    } catch (err) {
      console.error('Failed to log out:', err)
      // Clear session locally and redirect anyway
      navigate('/login')
    }
  }

  const getGreeting = () => {
    if (user) {
      return `Good morning, ${user.firstName} 👋`
    }
    return 'Good morning, Ahmed 👋'
  }

  const getUserNameForLoader = () => {
    if (user) {
      return `${user.firstName} ${user.lastName}`
    }
    return 'Ahmed Raza'
  }

  const getSidebarUser = () => {
    if (user) {
      return {
        name: `${user.firstName} ${user.lastName}`,
        role: user.organisation || 'Terminal Operator',
      }
    }
    return {
      name: 'Ahmed Raza',
      role: 'Terminal Operator',
    }
  }

  return (
    <>
      {showLoader && (
        <DashboardLoader
          userName={getUserNameForLoader()}
          onComplete={() => setShowLoader(false)}
        />
      )}

      <div className="flex min-h-screen bg-[#FDFDFD] font-inter">
        <Sidebar user={getSidebarUser()} onSoonClick={() => setShowComingSoon(true)} onLogout={handleLogout} />

        <main className="flex-1 px-10 py-10">
          <div className="mx-auto flex max-w-[1000px] flex-col gap-8">
            <Routes>
              {/* Overview Page */}
              <Route
                path=""
                element={
                  <>
                    <DashboardHeader greeting={getGreeting()} />
                    <StatsGrid />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      <div className="lg:col-span-2 flex flex-col gap-8">
                        <ActiveWorkflows />
                        <RecentDocuments />
                      </div>
                      <div className="flex flex-col gap-8">
                        <QuickActions 
                          onStartWorkflow={() => {
                            // Can pre-select type in future, for now just open modal
                            setShowNewOpModal(true)
                          }} 
                        />
                        <OperationalAlerts onResolveItem={() => setShowComingSoon(true)} />
                      </div>
                    </div>
                  </>
                }
              />

              <Route
                path="operations"
                element={<OperationsList />}
              />
              <Route
                path="operations/:operationId"
                element={<OperationWorkspace />}
              />
              <Route
                path="upload/:operationId"
                element={<UploadOperation />}
              />
              <Route
                path="documents"
                element={<Documents />}
              />
              <Route
                path="documents/:documentId/review"
                element={<DocumentReview />}
              />
              <Route
                path="processing/:jobId"
                element={<Processing />}
              />
              <Route
                path="review/:jobId"
                element={<Review />}
              />
              <Route
                path="approved-data/:jobId"
                element={<ApprovedData />}
              />
              <Route
                path="mapping/:jobId"
                element={<Mapping />}
              />
              <Route
                path="export/:jobId"
                element={<Export />}
              />
            </Routes>
          </div>
        </main>

        <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
        <NewOperationModal isOpen={showNewOpModal} onClose={() => setShowNewOpModal(false)} />
      </div>
    </>
  )
}

export default Dashboard
