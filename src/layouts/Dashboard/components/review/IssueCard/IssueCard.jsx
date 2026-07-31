import { AlertTriangle, AlertCircle, ArrowRight } from 'lucide-react'

const IssueCard = ({ issue, onGoToField }) => {
  const isError = issue.severity === 'error'
  const Icon = isError ? AlertCircle : AlertTriangle
  const bg = isError ? 'bg-rose-50' : 'bg-amber-50'
  const text = isError ? 'text-rose-800' : 'text-amber-800'
  const border = isError ? 'border-rose-200' : 'border-amber-200'
  const iconColor = isError ? 'text-rose-600' : 'text-amber-600'

  return (
    <div className={`flex flex-col gap-3 p-4 rounded-xl border ${bg} ${border}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <Icon size={16} className={iconColor} />
        </div>
        <div className="flex flex-col">
          <span className={`text-xs font-bold uppercase tracking-wide mb-1 ${text}`}>
            {isError ? 'Critical Issue' : 'Review Required'}
          </span>
          <span className="text-sm font-medium text-gray-900 leading-snug">
            {issue.description}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-1">
        <button
          onClick={() => onGoToField(issue.fieldId)}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
        >
          Go to Field <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}

export default IssueCard
