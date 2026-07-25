const JobStatusBadge = ({ status = 'In Progress' }) => {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-[#FFF2EA] px-2.5 py-1 shrink-0">
      <span className="h-1.5 w-1.5 rounded-full bg-[#F87103]" />
      <span className="text-xs font-medium text-[#8B3C01]">{status}</span>
    </span>
  )
}

export default JobStatusBadge
