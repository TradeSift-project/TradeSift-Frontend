import RecommendationBadge from './RecommendationBadge'

const RecommendationCard = ({ 
  icon: Icon, 
  title, 
  description, 
  badge, 
  badgeClass 
}) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[16px] border border-[#E5E6E8] bg-white px-4 py-3.5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white">
          {Icon && <Icon size={16} className="text-[#0B0D12]" />}
        </div>
        <div className="flex flex-col gap-0.5">
          <h4 className="font-geist text-sm font-semibold text-[#0B0D12] leading-snug">
            {title}
          </h4>
          <p className="font-geist text-xs text-[#686C72] leading-normal">
            {description}
          </p>
        </div>
      </div>
      <RecommendationBadge 
        type={badge} 
        label={badge} 
        className={badgeClass} 
      />
    </div>
  )
}

export default RecommendationCard
