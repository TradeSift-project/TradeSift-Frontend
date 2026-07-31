import { CheckCircle2, Sparkles, AlertTriangle, CircleDashed, Edit3 } from 'lucide-react'

const StatusBadge = ({ status }) => {
  let bg = ''
  let text = ''
  let border = ''
  let icon = null
  let label = ''

  switch (status) {
    case 'verified':
      bg = 'bg-emerald-50'
      text = 'text-emerald-700'
      border = 'border-emerald-200'
      icon = <CheckCircle2 size={12} className="text-emerald-600" />
      label = 'Verified'
      break
    case 'ai-suggested':
      bg = 'bg-yellow-50'
      text = 'text-yellow-700'
      border = 'border-yellow-200'
      icon = <Sparkles size={12} className="text-yellow-600" />
      label = 'AI Suggested'
      break
    case 'requires-review':
      bg = 'bg-rose-50'
      text = 'text-rose-700'
      border = 'border-rose-200'
      icon = <AlertTriangle size={12} className="text-rose-600" />
      label = 'Requires Review'
      break
    case 'manually-edited':
      bg = 'bg-blue-50'
      text = 'text-blue-700'
      border = 'border-blue-200'
      icon = <Edit3 size={12} className="text-blue-600" />
      label = 'Manually Edited'
      break
    case 'empty':
    default:
      bg = 'bg-gray-50'
      text = 'text-gray-500'
      border = 'border-gray-200'
      icon = <CircleDashed size={12} className="text-gray-400" />
      label = 'Empty'
      break
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${bg} ${text} ${border}`}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wide">
        {label}
      </span>
    </div>
  )
}

export default StatusBadge
