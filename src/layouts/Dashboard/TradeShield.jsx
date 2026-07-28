import { useState } from 'react'
import ComingSoonModal from '../../components/modal/ComingSoonModal'
import Sidebar from './components/layout/Sidebar'
import TradeShieldHeader from './components/tradeshield/TradeShieldHeader'
import SearchBar from './components/tradeshield/SearchBar'
import RecentJobsList from './components/tradeshield/RecentJobsList'

const TradeShield = () => {
  const [search, setSearch] = useState('')
  const [showComingSoon, setShowComingSoon] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-inter">
      <Sidebar onSoonClick={() => setShowComingSoon(true)} />

      <main className="flex-1 px-10 py-10">
        <div className="mx-auto flex max-w-[955px] flex-col gap-8">
          <TradeShieldHeader onNewAnalysis={() => setShowComingSoon(true)} />
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          <RecentJobsList onViewAll={() => setShowComingSoon(true)} />
        </div>
      </main>

      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  )
}

export default TradeShield
