import { AlertTriangle, AlertCircle } from 'lucide-react'

const ValidationIssue = ({ issue }) => {
  const isError = issue.severity === 'error'
  const Icon = isError ? AlertCircle : AlertTriangle
  const iconColor = isError ? 'text-rose-500' : 'text-amber-500'

  return (
    <div className="flex flex-col gap-1 p-3 bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
      <div className="flex items-center gap-2">
        <Icon size={14} className={iconColor} />
        <span className="text-xs font-bold text-gray-900">{issue.title}</span>
        <span className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-full">
          {issue.type}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1 pl-5">
        {issue.description}
      </p>
    </div>
  )
}

export default ValidationIssue
