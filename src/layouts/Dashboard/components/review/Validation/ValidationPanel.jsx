import ValidationIssue from './ValidationIssue'
import { AlertCircle } from 'lucide-react'

const ValidationPanel = ({ issues }) => {
  if (!issues || issues.length === 0) return null

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
      <div className="flex items-center gap-2 px-4 py-3 bg-rose-50/50 border-b border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20">
        <AlertCircle size={14} className="text-rose-500 dark:text-rose-400" />
        <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider dark:text-rose-400">
          Validation Issues ({issues.length})
        </h3>
      </div>
      <div className="flex flex-col">
        {issues.map(issue => (
          <ValidationIssue key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}

export default ValidationPanel
