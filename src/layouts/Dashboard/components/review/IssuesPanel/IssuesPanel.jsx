import { AlertCircle } from 'lucide-react'
import IssueCard from '../IssueCard'

const IssuesPanel = ({ issues, onGoToField }) => {
  if (!issues || issues.length === 0) return null

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-rose-200 shadow-sm overflow-hidden mb-6 dark:bg-neutral-900">
      <div className="flex items-center gap-2 bg-rose-50 px-4 py-3 border-b border-rose-200">
        <AlertCircle size={16} className="text-rose-600" />
        <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wide">
          Detected Issues ({issues.length})
        </h3>
      </div>
      <div className="flex flex-col gap-3 p-4">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onGoToField={onGoToField} />
        ))}
      </div>
    </div>
  )
}

export default IssuesPanel
