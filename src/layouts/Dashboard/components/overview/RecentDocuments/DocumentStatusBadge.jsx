const DocumentStatusBadge = ({ status }) => {
  const getBadgeClasses = () => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'Processing':
        return 'bg-blue-50 text-blue-600 border-blue-105 animate-pulse'
      case 'Needs Review':
        return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'Validation Issue':
        return 'bg-rose-50 text-rose-600 border-rose-100'
      case 'Failed':
      default:
        return 'bg-neutral-50 text-neutral-500 border-neutral-200'
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${getBadgeClasses()}`}
    >
      {status === 'Processing' && (
        <span className="h-1 w-1 rounded-full bg-blue-500 animate-ping" />
      )}
      {status}
    </span>
  )
}

export default DocumentStatusBadge
