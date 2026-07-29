import { CheckCircle2, Clock, AlertCircle, Play } from 'lucide-react'

const ProcessingStep = ({ label, status, progress }) => {
  const getStepStyles = () => {
    switch (status) {
      case 'completed':
        return {
          text: 'text-gray-800 font-bold',
          icon: CheckCircle2,
          iconColor: 'text-emerald-500 bg-emerald-50',
          border: 'border-emerald-100',
        }
      case 'active':
        return {
          text: 'text-[#F87103] font-bold',
          icon: Play,
          iconColor: 'text-[#F87103] bg-[#FDF6F0] animate-pulse',
          border: 'border-amber-200',
        }
      case 'error':
        return {
          text: 'text-rose-800 font-bold',
          icon: AlertCircle,
          iconColor: 'text-rose-500 bg-rose-50',
          border: 'border-rose-200',
        }
      case 'pending':
      default:
        return {
          text: 'text-gray-400 font-semibold',
          icon: Clock,
          iconColor: 'text-gray-300 bg-neutral-50',
          border: 'border-neutral-100',
        }
    }
  }

  const styles = getStepStyles()
  const Icon = styles.icon

  return (
    <div className={`flex flex-col gap-2 p-3.5 rounded-2xl border bg-white ${styles.border} transition`}>
      <div className="flex items-center justify-between">
        <span className={`text-xs ${styles.text}`}>
          {label}
        </span>
        <div className={`flex h-6 w-6 items-center justify-center rounded-full shrink-0 ${styles.iconColor}`}>
          <Icon size={12} />
        </div>
      </div>

      {status === 'active' && progress !== undefined && (
        <div className="w-full bg-neutral-100 h-1 rounded-full overflow-hidden mt-1">
          <div
            className="bg-[#F87103] h-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default ProcessingStep
