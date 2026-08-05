import Sidebar from '../../layouts/Dashboard/components/layout/Sidebar'
import DashboardHeader from '../../layouts/Dashboard/components/layout/DashboardHeader'
import StatsGrid from '../../layouts/Dashboard/components/overview/StatsGrid'
import ActiveWorkflows from '../../layouts/Dashboard/components/overview/ActiveWorkflows'
import RecentDocuments from '../../layouts/Dashboard/components/overview/RecentDocuments'
import OperationalAlerts from '../../layouts/Dashboard/components/overview/OperationalAlerts'
import QuickActions from '../../layouts/Dashboard/components/overview/QuickActions'
import { DASHBOARD_STATS, RECENT_DOCUMENTS, ATTENTION_ITEMS } from '../../layouts/Dashboard/constants/dashboardConstants'
import { Menu } from 'lucide-react'

const mockOperations = [
  { id: 'JOB-9023-1', operationType: 'GATE_IN', notes: 'Electronics board cargo from Vessel PACIFIC HARMONY', status: 'DRAFT', updatedAt: new Date(Date.now() - 120000).toISOString() },
  { id: 'JOB-9022-1', operationType: 'GATE_OUT', notes: 'Textile export items for vessel KARACHI EXPRESS', status: 'PROCESSING', updatedAt: new Date(Date.now() - 720000).toISOString() },
  { id: 'JOB-9021-1', operationType: 'GATE_OUT', notes: 'Machinery components release for THAL OPERATORS', status: 'COMPLETED', updatedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'JOB-9020-1', operationType: 'GATE_IN', notes: 'Industrial chemicals storage consignments', status: 'COMPLETED', updatedAt: new Date(Date.now() - 7200000).toISOString() }
]

const mockUser = {
  name: 'Ahmed Raza',
  role: 'Terminal Operator'
}

const DashboardPreview = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark'

  return (
    <div className={`relative z-10 mt-10 sm:mt-14 md:mt-16 lg:mt-20 xl:mt-24 pointer-events-none ${isDark ? 'dark' : ''}`}>
      {/* Outer Glow Effect */}
      <div className="absolute inset-0 max-w-[1280px] mx-auto bg-gradient-to-b from-white/10 to-transparent blur-3xl rounded-full opacity-20 transform -translate-y-20"></div>
      
      <div className="mx-auto w-full max-w-[1280px] rounded-[24px] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl relative bg-neutral-950">
        
        {/* Browser Window Controls (macOS style) */}
        <div className="flex items-center gap-2 px-6 py-4 bg-[#F8F9FA] dark:bg-neutral-900 border-b border-gray-200 dark:border-white/5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm"></div>
        </div>
        
        <div className="flex h-[800px] bg-[#FDFDFD] font-inter dark:bg-neutral-950 scale-100 origin-top">
            
            {/* Sidebar */}
            <div className="hidden lg:block w-[280px] shrink-0 border-r border-[#E5E6E8] dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <Sidebar 
                user={mockUser} 
                onSoonClick={() => {}} 
                onLogout={() => {}} 
              />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
              
              {/* Header */}
              <div className="sticky top-0 z-30 bg-[#FDFDFD]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between lg:justify-end border-b border-[#E5E6E8] lg:border-none lg:bg-transparent lg:px-10 dark:bg-neutral-950/80 dark:border-neutral-800">
                <button className="lg:hidden p-2 -ml-2 text-neutral-600 dark:text-neutral-300">
                  <Menu size={20} />
                </button>
                <div className="flex items-center gap-4">
                  {/* Mock Header Actions since real HeaderActions has interactive popovers/modals */}
                  <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
                  <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
                </div>
              </div>

              {/* Scrollable Content Area */}
              {/* Added CSS classes to completely hide the browser scrollbar while keeping it scrollable */}
              <div className="flex-1 px-6 lg:px-10 pb-10 pt-4 lg:pt-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                  
                  <DashboardHeader greeting="Good morning, Ahmed 👋" />
                  
                  <StatsGrid stats={DASHBOARD_STATS} />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                      <ActiveWorkflows mockData={mockOperations} />
                      <RecentDocuments documents={RECENT_DOCUMENTS} />
                    </div>
                    <div className="flex flex-col gap-8">
                      <QuickActions onStartWorkflow={() => {}} />
                      <OperationalAlerts alerts={ATTENTION_ITEMS} onResolveItem={() => {}} />
                    </div>
                  </div>

                </div>
              </div>

            </main>
          </div>

        {/* Glossy overlay effect for the "preview" look */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
      </div>
    </div>
  )
}

export default DashboardPreview