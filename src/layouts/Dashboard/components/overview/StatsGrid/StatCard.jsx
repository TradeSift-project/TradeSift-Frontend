const StatCard = ({ label, value, description, icon: Icon, status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'success':
        return {
          border: 'border-emerald-100 dark:border-emerald-500/20',
          bg: 'bg-emerald-50/30 dark:bg-emerald-500/10',
          text: 'text-emerald-600 dark:text-emerald-400',
          iconBg: 'bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20',
          iconText: 'text-emerald-600 dark:text-emerald-400',
        }
      case 'error':
        return {
          border: 'border-red-100 dark:border-red-500/20',
          bg: 'bg-red-50/20 dark:bg-red-500/10',
          text: 'text-red-600 dark:text-red-400',
          iconBg: 'bg-red-50 border-red-100 dark:bg-red-500/10 dark:border-red-500/20',
          iconText: 'text-red-600 dark:text-red-400',
        }
      case 'warning':
        return {
          border: 'border-amber-100 dark:border-amber-500/20',
          bg: 'bg-amber-50/20 dark:bg-amber-500/10',
          text: 'text-amber-600 dark:text-amber-400',
          iconBg: 'bg-amber-50 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20',
          iconText: 'text-amber-600 dark:text-amber-400',
        }
      case 'info':
      default:
        return {
          border: 'border-indigo-100 dark:border-indigo-500/20',
          bg: 'bg-indigo-50/20 dark:bg-indigo-500/10',
          text: 'text-indigo-600 dark:text-indigo-400',
          iconBg: 'bg-indigo-50 border-indigo-100 dark:bg-indigo-500/10 dark:border-indigo-500/20',
          iconText: 'text-indigo-600 dark:text-indigo-400',
        }
    }
  }

  const classes = getStatusClasses()

  return (
    <div
      className={`flex flex-col gap-3 rounded-[20px] border ${classes.border} bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition hover:shadow-md dark:bg-neutral-900 dark:border-white/5`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.5px] text-[#686C72] dark:text-[#9CA3AF]">
          {label}
        </span>
        <div className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg border ${classes.iconBg} ${classes.iconText}`}>
          {Icon && <Icon size={14} />}
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <span className="font-geist text-2xl font-bold text-[#0B0D12] dark:text-white">
          {value}
        </span>
        <span className="text-[10px] font-medium text-[#686C72] dark:text-[#9CA3AF]">
          {description}
        </span>
      </div>
    </div>
  )
}

export default StatCard
