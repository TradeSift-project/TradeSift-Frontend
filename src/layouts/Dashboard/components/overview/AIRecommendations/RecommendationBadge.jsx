import DashboardBadge from '../../shared/DashboardBadge'

const BADGE_STYLES = {
  high: 'text-[#F87103] border-[#F87103]/30 bg-[#FFF9F5]',
  medium: 'text-[#2BA162] border-[#2BA162]/30 bg-[#F4FBF7]',
  attention: 'text-[#EF852E] border-[#EF852E]/40 bg-[#FFF9F5]',
}

const RecommendationBadge = ({ type = 'high', label = 'High', className = '' }) => {
  const normalizedType = type.toLowerCase()
  const badgeStyle = BADGE_STYLES[normalizedType] || BADGE_STYLES.high

  return (
    <DashboardBadge 
      className={`border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25px] shrink-0 ${badgeStyle} ${className}`}
    >
      {label}
    </DashboardBadge>
  )
}

export default RecommendationBadge
