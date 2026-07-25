import { useState } from 'react'
import ComingSoonModal from '../../components/modal/ComingSoonModal'
import Sidebar from './components/layout/Sidebar'
import DashboardHeader from './components/layout/DashboardHeader'
import RecentJobCard from './components/overview/RecentJobCard'
import AIRecommendations from './components/overview/AIRecommendations'
import ModulesGrid from './components/overview/ModulesGrid'

const Dashboard = () => {
  const [showComingSoon, setShowComingSoon] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-inter">
      <Sidebar onSoonClick={() => setShowComingSoon(true)} />

      <main className="flex-1 px-10 py-10">
        <div className="mx-auto flex max-w-[955px] flex-col gap-8">
          <DashboardHeader />
          <RecentJobCard />
          <AIRecommendations />
          <ModulesGrid onSoonClick={() => setShowComingSoon(true)} />
        </div>
      </main>

      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  )
}

export default Dashboard
