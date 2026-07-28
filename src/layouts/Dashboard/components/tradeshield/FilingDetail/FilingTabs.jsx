import { Play } from 'lucide-react'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'ai-recommendations', label: 'AI Recommendations', count: 4 },
  { key: 'activity-log', label: 'Activity Log', count: 7 },
]

const FilingTabs = ({ activeTab, onTabChange, onResumeAnalysis }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-1 rounded-full border border-[#E5E6E8] p-1">
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-geist text-sm font-medium transition ${
              isActive ? 'bg-[#0B0D12] text-white' : 'text-[#686C72] hover:text-[#0B0D12]'
            }`}
          >
            {tab.label}
            {tab.count != null && (
              <span
                className={`font-geist text-xs ${isActive ? 'text-white/70' : 'text-[#686C72]/70'}`}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>

    <button
      type="button"
      onClick={onResumeAnalysis}
      className="flex items-center gap-1.5 rounded-full bg-[#F87103] px-4 py-2.5 font-inter text-[13px] font-medium text-white transition hover:bg-[#e06d09] active:scale-95"
    >
      <Play size={14} fill="white" strokeWidth={0} />
      Resume Analysis
    </button>
  </div>
)

export default FilingTabs
