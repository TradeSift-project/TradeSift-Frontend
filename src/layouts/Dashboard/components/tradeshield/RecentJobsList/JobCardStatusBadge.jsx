const STATUS_STYLES = {
  'in-progress': {
    label: 'In Progress',
    badgeBg: 'bg-[#FFF2EA]',
    dot: 'bg-[#F87103]',
    text: 'text-[#8B3C01]',
  },
  completed: {
    label: 'Completed',
    badgeBg: 'bg-[#E8F4EB]',
    dot: 'bg-[#2BA162]',
    text: 'text-[#104F2D]',
  },
}

const JobCardStatusBadge = ({ status = 'completed' }) => {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.completed

  return (
    <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 shrink-0 ${style.badgeBg}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      <span className={`text-xs font-medium ${style.text}`}>{style.label}</span>
    </span>
  )
}

export default JobCardStatusBadge
export { STATUS_STYLES }
