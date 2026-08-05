const DocumentStatCard = ({ label, value, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-emerald-600 border-emerald-100 bg-emerald-50/10 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400'
      case 'warning':
        return 'text-amber-600 border-amber-100 bg-amber-50/10 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400'
      case 'primary':
        return 'text-blue-600 border-blue-100 bg-blue-50/10 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400'
      case 'info':
      default:
        return 'text-gray-800 border-neutral-200 bg-neutral-50/50 dark:bg-neutral-900 dark:border-white/5 dark:text-white'
    }
  }

  return (
    <div className={`flex flex-col gap-1.5 rounded-2xl border p-4 shadow-[0_2px_8px_rgba(0,0,0,0.015)] bg-white ${getStatusColor()}`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-gray-500 dark:text-[#9CA3AF]">
        {label}
      </span>
      <span className={`font-geist text-xl font-bold leading-none ${status === 'info' ? 'text-gray-900 dark:text-white' : ''}`}>
        {value}
      </span>
    </div>
  )
}

export default DocumentStatCard
