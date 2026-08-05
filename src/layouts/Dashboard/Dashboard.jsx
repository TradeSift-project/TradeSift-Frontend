import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import ComingSoonModal from '../../components/modal/ComingSoonModal'
import Sidebar from './components/layout/Sidebar'
import DashboardHeader from './components/layout/DashboardHeader'
import HeaderActions from './components/layout/DashboardHeader/HeaderActions'
import { Menu, X } from 'lucide-react'
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
import { dashboardService } from '../../services/dashboardService'
import { mapDashboardSummaryToUI } from '../../services/dashboardMapper'
import NewOperationModal from '../../components/modal/NewOperationModal'
import Settings from './Settings'
import { AlertCircle, RefreshCw } from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showLoader, setShowLoader] = useState(true)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [showNewOpModal, setShowNewOpModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [dashboardLoading, setDashboardLoading] = useState(true)
  const [dashboardError, setDashboardError] = useState(null)

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

  const fetchDashboardData = async () => {
    try {
      setDashboardLoading(true)
      setDashboardError(null)
      const res = await dashboardService.getDashboardSummary()
      if (res.success) {
        setDashboardData(mapDashboardSummaryToUI(res.data))
      } else {
        throw new Error(res.message || 'Failed to fetch dashboard summary')
      }
    } catch (err) {
      console.error(err)
      setDashboardError('Unable to load dashboard data.')
    } finally {
      setDashboardLoading(false)
    }
  }

  useEffect(() => {
    // Only fetch if we are on the root dashboard route, but for simplicity we fetch it when dashboard mounts
    // or we could fetch it in a child component. Let's fetch it here.
    fetchDashboardData()
  }, [])

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false)
  }, [location.pathname])

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
    return 'Good morning 👋'
  }

  const getUserNameForLoader = () => {
    if (user) {
      return `${user.firstName} ${user.lastName}`
    }
    return ''
  }

  const getSidebarUser = () => {
    if (user) {
      return {
        name: `${user.firstName} ${user.lastName}`,
        role: user.organisation || 'Terminal Operator',
      }
    }
    return {
      name: 'Loading...',
      role: '...',
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

      <div className="flex min-h-screen bg-[#FDFDFD] font-inter dark:bg-neutral-950">
        
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Container */}
        <div className={`fixed inset-y-0 left-0 z-50 transform bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} dark:bg-neutral-950`}>
          <Sidebar 
            user={getSidebarUser()} 
            onSoonClick={() => setShowComingSoon(true)} 
            onLogout={handleLogout} 
          />
        </div>

        <main className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto relative">
          
          {/* Global Header */}
          <div className="sticky top-0 z-30 bg-[#FDFDFD]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between lg:justify-end border-b border-[#E5E6E8] lg:border-none lg:bg-transparent lg:px-10 dark:bg-neutral-950/80 dark:border-neutral-800">
            <button 
              className="lg:hidden p-2 -ml-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition dark:text-gray-400"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <HeaderActions />
          </div>

          <div className="flex-1 px-6 lg:px-10 pb-10 pt-4 lg:pt-2">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
              <Routes>
              {/* Overview Page */}
              <Route
                path=""
                element={
                  <>
                    <DashboardHeader greeting={getGreeting()} />
                    {dashboardLoading ? (
                      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm flex flex-col items-center justify-center p-12 min-h-[400px] text-gray-400 dark:bg-neutral-900 dark:border-neutral-800">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103] mb-4"></div>
                        <p className="text-sm">Loading dashboard summary...</p>
                      </div>
                    ) : dashboardError ? (
                      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm flex flex-col items-center justify-center p-12 min-h-[400px] text-center dark:bg-neutral-900 dark:border-neutral-800">
                        <AlertCircle size={40} className="text-red-400 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-1 dark:text-white">Unable to load dashboard data.</h3>
                        <p className="text-sm text-gray-500 mb-6 dark:text-gray-400">{dashboardError}</p>
                        <button
                          onClick={fetchDashboardData}
                          className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
                        >
                          <RefreshCw size={16} />
                          Retry
                        </button>
                      </div>
                    ) : dashboardData && (
                      <>
                        <StatsGrid stats={dashboardData.stats} />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                          <div className="lg:col-span-2 flex flex-col gap-8">
                            <ActiveWorkflows />
                            <RecentDocuments documents={dashboardData.recentDocuments} />
                          </div>
                          <div className="flex flex-col gap-8">
                            <QuickActions 
                              onStartWorkflow={() => {
                                setShowNewOpModal(true)
                              }} 
                            />
                            <OperationalAlerts 
                              alerts={dashboardData.alerts} 
                              onResolveItem={() => setShowComingSoon(true)} 
                            />
                          </div>
                        </div>
                      </>
                    )}
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
              <Route
                path="settings"
                element={<Settings />}
              />
            </Routes>
            </div>
          </div>
        </main>

        <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
        <NewOperationModal isOpen={showNewOpModal} onClose={() => setShowNewOpModal(false)} />
      </div>
    </>
  )
}

export default Dashboard
