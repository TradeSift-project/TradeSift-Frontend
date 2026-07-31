const StatCard = ({ label, value, description, icon: Icon, status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'success':
        return {
          border: 'border-emerald-100',
          bg: 'bg-emerald-50/30',
          text: 'text-emerald-600',
          iconBg: 'bg-emerald-50 border-emerald-100',
          iconText: 'text-emerald-600',
        }
      case 'error':
        return {
          border: 'border-rose-100',
          bg: 'bg-rose-50/20',
          text: 'text-rose-600',
          iconBg: 'bg-rose-50 border-rose-100',
          iconText: 'text-rose-600',
        }
      case 'warning':
        return {
          border: 'border-amber-100',
          bg: 'bg-amber-50/20',
          text: 'text-amber-600',
          iconBg: 'bg-amber-50 border-amber-105',
          iconText: 'text-[#F87103]',
        }
      case 'info':
      default:
        return {
          border: 'border-blue-100',
          bg: 'bg-blue-50/20',
          text: 'text-blue-600',
          iconBg: 'bg-blue-50 border-blue-100',
          iconText: 'text-blue-600',
        }
    }
  }

  const classes = getStatusClasses()

  return (
    <div
      className={`flex flex-col gap-3 rounded-[20px] border ${classes.border} bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition hover:shadow-md dark:bg-neutral-900`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.5px] text-[#686C72] dark:text-gray-400">
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
        <span className="text-[10px] font-medium text-[#686C72] dark:text-gray-400">
          {description}
        </span>
      </div>
    </div>
  )
}

export default StatCard
