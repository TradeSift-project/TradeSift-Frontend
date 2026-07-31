import { CheckCircle2, AlertCircle, HelpCircle, XCircle } from 'lucide-react'

const MappingStatusBadge = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case 'Mapped':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          icon: <CheckCircle2 size={12} className="text-emerald-600" />
        }
      case 'Missing':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: <XCircle size={12} className="text-red-600" />
        }
      case 'Invalid':
        return {
          bg: 'bg-[#FDF6F0]',
          text: 'text-[#F87103]',
          border: 'border-[#FDF6F0]',
          icon: <AlertCircle size={12} className="text-[#F87103]" />
        }
      case 'Needs Configuration':
      case 'Optional':
      default:
        return {
          bg: 'bg-neutral-50',
          text: 'text-gray-600',
          border: 'border-neutral-200',
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
