import { AlertTriangle, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react'

const AlertCard = ({ title, action, type, onResolve }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'error':
        return {
          border: 'border-rose-100 bg-rose-50/15',
          icon: AlertCircle,
          iconColor: 'text-rose-500 bg-rose-50',
          textColor: 'text-rose-900',
        }
      case 'warning':
        return {
          border: 'border-amber-100 bg-amber-50/15',
          icon: AlertTriangle,
          iconColor: 'text-amber-500 bg-amber-50',
          textColor: 'text-amber-900',
        }
      case 'info':
      default:
        return {
          border: 'border-blue-100 bg-blue-50/15',
          icon: HelpCircle,
          iconColor: 'text-blue-500 bg-blue-50',
          textColor: 'text-blue-900',
        }
    }
  }

  const styles = getAlertStyles()
  const Icon = styles.icon

  return (
    <div className={`flex flex-col gap-3 rounded-2xl border p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)] ${styles.border}`}>
      <div className="flex items-start gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-100 shrink-0 ${styles.iconColor}`}>
          <Icon size={14} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className={`text-xs font-semibold leading-relaxed ${styles.textColor}`}>
            {title}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-neutral-100/50 pt-2.5 mt-0.5">
        <button
          type="button"
          onClick={onResolve}
          className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-[0.5px] transition"
        >
          {action}
          <ArrowRight size={10} />
        </button>
      </div>
    </div>
  )
}

export default AlertCard
