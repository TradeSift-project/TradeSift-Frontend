const DocumentStatCard = ({ label, value, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-emerald-600 border-emerald-100 bg-emerald-50/10'
      case 'warning':
        return 'text-amber-600 border-amber-100 bg-amber-50/10'
      case 'primary':
        return 'text-blue-600 border-blue-100 bg-blue-50/10'
      case 'info':
      default:
        return 'text-gray-800 border-neutral-200 bg-neutral-50/50'
    }
  }

  return (
    <div className={`flex flex-col gap-1.5 rounded-2xl border p-4 shadow-[0_2px_8px_rgba(0,0,0,0.015)] bg-white ${getStatusColor()} dark:bg-neutral-900`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="font-geist text-xl font-bold text-gray-900 leading-none dark:text-white">
        {value}
      </span>
    </div>
  )
}

export default DocumentStatCard
