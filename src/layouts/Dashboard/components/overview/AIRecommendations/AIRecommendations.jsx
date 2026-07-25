import { Sparkles, ArrowRight } from 'lucide-react'
import { RECOMMENDATIONS as MOCK_RECOMMENDATIONS } from '../../../constants/dashboardConstants'
import RecommendationCard from './RecommendationCard'

const AIRecommendations = ({ recommendations = MOCK_RECOMMENDATIONS }) => {
  const currentRecommendations = recommendations || MOCK_RECOMMENDATIONS

  return (
    <div
      className="flex flex-col gap-4 rounded-[20px] border border-[#E5E6E8] p-6 shadow-sm"
      style={{
        background:
          'linear-gradient(263deg, rgba(248, 113, 3, 0.60) -57.74%, rgba(255, 196, 147, 0.60) -55.37%, rgba(255, 255, 255, 0.60) 17.7%), #FFF',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.93px] text-[#686C72]">
            AI Recommendations
          </span>
          <span className="font-geist text-xs text-[#686C72]">
            {currentRecommendations.length} new recommendations
          </span>
        </div>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm border border-neutral-100">
          <Sparkles size={14} className="text-[#F87103]" />
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {currentRecommendations.map((rec) => (
          <RecommendationCard
            key={rec.title}
            icon={rec.icon}
            title={rec.title}
            description={rec.description}
            badge={rec.badge}
            badgeClass={rec.badgeClass}
          />
        ))}
      </div>

      <button
        type="button"
        className="flex items-center justify-center gap-1 mt-1 text-[11px] font-semibold text-[#F87103] hover:underline"
      >
        <span>View all recommendations</span>
        <ArrowRight size={11} className="text-[#F87103]" />
      </button>
    </div>
  )
}

export default AIRecommendations
