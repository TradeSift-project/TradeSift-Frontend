import ModuleStatusBadge from './ModuleStatusBadge'

const ModuleCard = ({
  icon: Icon,
  name,
  description,
  status = 'soon',
  onSoonClick,
}) => {
  const handleClick = () => {
    if (status === 'soon') {
      onSoonClick?.()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex flex-col items-start gap-3 w-full rounded-[18px] border border-[#E5E6E8] bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDF6F0]">
        {Icon && <Icon size={16} strokeWidth={1.6} className="text-[#F87103]" />}
      </div>
      
      <div className="flex flex-col gap-0.5 mt-1 flex-1">
        <span className="text-base font-semibold text-[#0B0D12] tracking-tight">{name}</span>
        <span className="text-xs text-[#686C72] leading-snug">{description}</span>
      </div>

      <div className="mt-2">
        <ModuleStatusBadge status={status} />
      </div>
    </button>
  )
}

export default ModuleCard
