import { Check, AlertTriangle, XCircle, AlertCircle } from 'lucide-react'

const ConfidenceBadge = ({ status, confidence }) => {
  let bg = ''
  let text = ''
  let border = ''
  let icon = null
  let label = ''

  switch (status) {
    case 'high':
      bg = 'bg-emerald-50'
      text = 'text-emerald-700'
      border = 'border-emerald-200'
      icon = <Check size={12} className="text-emerald-600" />
      label = 'High Confidence'
      break
    case 'medium':
      bg = 'bg-yellow-50'
      text = 'text-yellow-700'
      border = 'border-yellow-200'
      icon = <AlertTriangle size={12} className="text-yellow-600" />
      label = 'Medium Confidence'
      break
    case 'low':
      bg = 'bg-red-50'
      text = 'text-red-700'
      border = 'border-red-200'
      icon = <XCircle size={12} className="text-red-600" />
      label = 'Low Confidence'
      break
    case 'needs-review':
    default:
      bg = 'bg-orange-50'
      text = 'text-orange-700'
      border = 'border-orange-400'
      icon = <AlertCircle size={12} className="text-orange-600" />
      label = 'Needs Review'
      break
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${bg} ${text} ${border}`}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wide">
        {confidence > 0 ? `${confidence}% • ` : ''}{label}
      </span>
    </div>
  )
}

export default ConfidenceBadge
