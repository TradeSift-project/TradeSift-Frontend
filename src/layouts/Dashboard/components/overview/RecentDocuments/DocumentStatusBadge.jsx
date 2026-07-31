const DocumentStatusBadge = ({ status }) => {
  const getBadgeClasses = () => {
    switch (status) {
      case 'Completed':
      case 'Verified':
      case 'Approved':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'Processing':
        return 'bg-blue-50 text-blue-600 border-blue-100 animate-pulse'
      case 'Extracted':
        return 'bg-teal-50 text-teal-650 border-teal-100'
      case 'Needs Review':
      case 'Pending':
        return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'Validation Issue':
      case 'Failed':
      case 'Rejected':
        return 'bg-rose-50 text-rose-600 border-rose-100'
      case '-':
        return 'text-gray-300'
      default:
        return 'bg-neutral-50 text-neutral-500 border-neutral-200'
    }
  }

  if (status === '-') {
    return <span className="text-gray-300 font-semibold">—</span>
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
