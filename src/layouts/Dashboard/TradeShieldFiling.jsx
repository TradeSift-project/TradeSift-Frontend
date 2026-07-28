import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ComingSoonModal from '../../components/modal/ComingSoonModal'
import Sidebar from './components/layout/Sidebar'
import {
  FilingDetailHeader,
  WorkflowStepper,
  FilingTabs,
  FilingOverview,
} from './components/tradeshield/FilingDetail'

const TradeShieldFiling = () => {
  const { filingId = 'TS-784512' } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [showComingSoon, setShowComingSoon] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-inter">
      <Sidebar onSoonClick={() => setShowComingSoon(true)} />

      <main className="flex-1 px-10 py-10">
        <div className="mx-auto flex max-w-[955px] flex-col gap-8">
          <FilingDetailHeader
            filingId={filingId}
            title="Import — Electronics Components"
            meta="Filing ID · TS-784512 · Created Nov 12, 2026 · Last updated 2 mins ago · Assigned to John Doe"
          />

          <WorkflowStepper />

          <FilingTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onResumeAnalysis={() => setShowComingSoon(true)}
          />

          {activeTab === 'overview' && <FilingOverview />}
          {activeTab === 'ai-recommendations' && (
            <p className="font-geist text-sm text-[#686C72]">No AI recommendations to show yet.</p>
          )}
          {activeTab === 'activity-log' && (
            <p className="font-geist text-sm text-[#686C72]">No activity logged yet.</p>
          )}
        </div>
      </main>

      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  )
}

export default TradeShieldFiling
