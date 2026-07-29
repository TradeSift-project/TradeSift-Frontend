import { CheckCircle2, AlertTriangle, AlertCircle, HelpCircle } from 'lucide-react'

const FieldStatusBadge = ({ status, confidence }) => {
  const percentage = confidence !== undefined ? Math.round(confidence * 100) : null

  const getBadgeConfig = () => {
    switch (status) {
      case 'verified':
        return {
          bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
          icon: CheckCircle2,
          label: percentage ? `${percentage}% Match` : 'Verified',
        }
      case 'needs-review':
        return {
          bg: 'bg-amber-50 text-amber-600 border-amber-100',
          icon: AlertTriangle,
          label: 'Requires Review',
        }
      case 'low-confidence':
        return {
          bg: 'bg-yellow-50 text-yellow-600 border-yellow-100',
          icon: AlertTriangle,
          label: percentage ? `${percentage}% Low Match` : 'Low Confidence',
        }
      case 'missing':
        return {
          bg: 'bg-rose-50 text-rose-600 border-rose-100',
          icon: AlertCircle,
          label: 'Missing',
        }
      case 'mismatch':
        return {
          bg: 'bg-rose-100/50 text-rose-700 border-rose-200',
          icon: AlertCircle,
          label: 'Mismatch',
        }
      default:
        return {
          bg: 'bg-neutral-50 text-neutral-500 border-neutral-150',
          icon: HelpCircle,
          label: 'Unknown',
        }
    }
  }

  const config = getBadgeConfig()
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.5px] ${config.bg}`}>
      <Icon size={10} />
      {config.label}
    </span>
  )
}

export default FieldStatusBadge
