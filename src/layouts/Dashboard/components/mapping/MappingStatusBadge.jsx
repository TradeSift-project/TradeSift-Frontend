import { CheckCircle2, AlertCircle, HelpCircle, XCircle } from 'lucide-react'

const MappingStatusBadge = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case 'Mapped':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-900/20',
          text: 'text-emerald-700 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-900/30',
          icon: <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-500" />
        }
      case 'Missing':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          text: 'text-red-700 dark:text-red-400',
          border: 'border-red-200 dark:border-red-900/30',
          icon: <XCircle size={12} className="text-red-600 dark:text-red-500" />
        }
      case 'Invalid':
        return {
          bg: 'bg-[#FDF6F0] dark:bg-[#F87103]/10',
          text: 'text-[#F87103]',
          border: 'border-[#FDF6F0] dark:border-[#F87103]/20',
          icon: <AlertCircle size={12} className="text-[#F87103]" />
        }
      case 'Needs Configuration':
      case 'Optional':
      default:
        return {
          bg: 'bg-neutral-50 dark:bg-neutral-800',
          text: 'text-gray-600 dark:text-gray-400',
          border: 'border-neutral-200 dark:border-neutral-700',
          icon: <HelpCircle size={12} className="text-gray-500 dark:text-gray-400" />
        }
    }
  }

  const style = getStyles()

  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${style.bg} ${style.border} ${style.text} w-fit`}>
      {style.icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{status}</span>
    </div>
  )
}

export default MappingStatusBadge
