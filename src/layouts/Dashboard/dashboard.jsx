import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ComingSoonModal from '../../components/modal/ComingSoonModal'
import Sidebar from './components/layout/Sidebar'
import DashboardHeader from './components/layout/DashboardHeader'
import StatsGrid from './components/overview/StatsGrid'
import WorkflowSummary from './components/overview/WorkflowSummary'
import RecentDocuments from './components/overview/RecentDocuments'
import AttentionRequired from './components/overview/AttentionRequired'
import DashboardLoader from './components/layout/DashboardHeader/DashboardLoader'
import Documents from './Documents'
import DocumentReview from './DocumentReview'
import { getMe } from '../../services/userService'

const Dashboard = () => {
  const [showLoader, setShowLoader] = useState(true)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [user, setUser] = useState(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

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
      .finally(() => {
        if (isMounted) {
          setLoadingProfile(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

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
        <Sidebar user={getSidebarUser()} onSoonClick={() => setShowComingSoon(true)} />

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
                        <WorkflowSummary />
                        <RecentDocuments />
                      </div>
                      <div className="flex flex-col gap-8">
                        <AttentionRequired onResolveItem={() => setShowComingSoon(true)} />
                      </div>
                    </div>
                  </>
                }
              />

              <Route
                path="documents"
                element={<Documents />}
              />
              <Route
                path="documents/:documentId/review"
                element={<DocumentReview />}
              />
            </Routes>
          </div>
        </main>

        <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
      </div>
    </>
  )
}

export default Dashboard
