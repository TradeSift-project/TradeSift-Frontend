const WorkflowStatusBadge = ({ status }) => {
  const getBadgeClasses = () => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'Processing':
        return 'bg-blue-50 text-blue-600 border-blue-100 animate-pulse'
      case 'Needs Review':
      default:
        return 'bg-amber-50 text-amber-600 border-amber-100'
    }
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.5px] ${getBadgeClasses()}`}>
      {status}
    </span>
  )
}

export default WorkflowStatusBadge
