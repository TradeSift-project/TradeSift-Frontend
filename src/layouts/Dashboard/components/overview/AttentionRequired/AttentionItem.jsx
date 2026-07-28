import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react'

const AttentionItem = ({ title, action, type, onResolve }) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'error':
        return {
          icon: AlertCircle,
          iconClass: 'text-rose-500 bg-rose-50 border-rose-100',
          border: 'border-rose-100/80',
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          iconClass: 'text-amber-500 bg-amber-50 border-amber-100',
          border: 'border-amber-100/80',
        }
      case 'info':
      default:
        return {
          icon: Info,
          iconClass: 'text-blue-500 bg-blue-50 border-blue-100',
          border: 'border-blue-100/80',
        }
    }
  }

  const config = getTypeConfig()
  const Icon = config.icon

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-[16px] border ${config.border} bg-white shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition hover:shadow-sm`}
    >
      <div className="flex items-start sm:items-center gap-3">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${config.iconClass}`}>
          <Icon size={14} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-[#0B0D12]">
            {title}
          </span>
          <span className="text-[10px] text-gray-400 font-normal">
            Requires attention
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onResolve}
        className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-[#0B0D12] transition hover:bg-neutral-50 hover:border-neutral-300 self-end sm:self-auto"
      >
        {action}
        <ChevronRight size={10} strokeWidth={2.5} />
      </button>
    </div>
  )
}

export default AttentionItem
