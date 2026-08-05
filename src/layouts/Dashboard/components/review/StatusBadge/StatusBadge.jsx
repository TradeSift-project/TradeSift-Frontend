import { CheckCircle2, Sparkles, AlertTriangle, CircleDashed, Edit3 } from 'lucide-react'

const StatusBadge = ({ status }) => {
  let bg = ''
  let text = ''
  let border = ''
  let icon = null
  let label = ''

  switch (status) {
    case 'verified':
      bg = 'bg-emerald-50 dark:bg-emerald-500/10'
      text = 'text-emerald-700 dark:text-emerald-400'
      border = 'border-emerald-200 dark:border-emerald-500/20'
      icon = <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
      label = 'Verified'
      break
    case 'ai-suggested':
      bg = 'bg-yellow-50 dark:bg-yellow-500/10'
      text = 'text-yellow-700 dark:text-yellow-400'
      border = 'border-yellow-200 dark:border-yellow-500/20'
      icon = <Sparkles size={12} className="text-yellow-600 dark:text-yellow-400" />
      label = 'AI Suggested'
      break
    case 'requires-review':
      bg = 'bg-rose-50 dark:bg-rose-500/10'
      text = 'text-rose-700 dark:text-rose-400'
      border = 'border-rose-200 dark:border-rose-500/20'
      icon = <AlertTriangle size={12} className="text-rose-600 dark:text-rose-400" />
      label = 'Requires Review'
      break
    case 'manually-edited':
      bg = 'bg-blue-50 dark:bg-indigo-500/10'
      text = 'text-blue-700 dark:text-indigo-400'
      border = 'border-blue-200 dark:border-indigo-500/20'
      icon = <Edit3 size={12} className="text-blue-600 dark:text-indigo-400" />
      label = 'Manually Edited'
      break
    case 'empty':
    default:
      bg = 'bg-gray-50 dark:bg-neutral-800/50'
      text = 'text-gray-500 dark:text-gray-400'
      border = 'border-gray-200 dark:border-neutral-700'
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
