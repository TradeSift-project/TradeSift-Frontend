const WorkflowStatusBadge = ({ status }) => {
  const getBadgeClasses = () => {
    switch (status) {
      case 'COMPLETED':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
      case 'PROCESSING':
      case 'Processing':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100 animate-pulse dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20'
      case 'NEEDS_REVIEW':
      case 'Needs Review':
      case 'DRAFT':
      default:
        return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
    }
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.5px] ${getBadgeClasses()}`}>
      {status}
    </span>
  )
}

export default WorkflowStatusBadge
