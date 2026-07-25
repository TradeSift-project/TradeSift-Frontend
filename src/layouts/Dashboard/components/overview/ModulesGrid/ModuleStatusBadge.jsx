const ModuleStatusBadge = ({ status = 'soon' }) => {
  if (status === 'active') {
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-[#E8F4EB] px-2.5 py-0.5 shrink-0 select-none">
        <span className="h-1 w-1 rounded-full bg-[#2BA162]" />
        <span className="text-[10px] font-semibold text-[#104F2D]">Active</span>
      </span>
    )
  }

  return (
    <span className="rounded-full border border-[#E5E6E8] px-2.5 py-0.5 text-[10px] font-semibold text-[#686C72] shrink-0 select-none">
      Coming Soon
    </span>
  )
}

export default ModuleStatusBadge
