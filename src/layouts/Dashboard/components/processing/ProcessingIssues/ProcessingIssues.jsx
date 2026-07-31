import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { AlertCircle, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProcessingIssueCard = ({ issue }) => {
  const isError = issue.severity === 'error'
  const Icon = isError ? AlertCircle : AlertTriangle
  const bg = isError ? 'bg-rose-50' : 'bg-amber-50'
  const text = isError ? 'text-rose-700' : 'text-amber-700'
  const border = isError ? 'border-rose-100' : 'border-amber-100'
  const iconColor = isError ? 'text-rose-500' : 'text-amber-500'
  const navigate = useNavigate()

  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border ${bg} ${border}`}>
      <div className="flex gap-4">
        <div className="mt-0.5">
          <Icon size={18} className={iconColor} />
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-bold ${text}`}>{issue.type} - {issue.documentName}</span>
          <span className="text-xs text-gray-700 mt-1 dark:text-gray-300">
            <span className="font-semibold">Field: {issue.field}</span> — {issue.description}
          </span>
        </div>
      </div>
      <div className="mt-4 md:mt-0 ml-9 md:ml-0">
        <button 
          onClick={() => navigate(`/dashboard/review/${issue.documentId}`)}
          className="text-xs font-bold px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors shadow-sm dark:bg-neutral-900 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          {issue.actionLabel}
        </button>
      </div>
    </div>
  )
}

const ProcessingIssues = ({ issues }) => {
  if (!issues || issues.length === 0) return null

  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-rose-600 uppercase tracking-wider ml-1 flex items-center gap-2">
        <AlertCircle size={16} />
        Issues Requiring Review ({issues.length})
      </h3>
      <div className="flex flex-col gap-3 bg-white rounded-[24px] border border-gray-200 p-4 shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        {issues.map(issue => (
          <ProcessingIssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </motion.div>
  )
}

export default ProcessingIssues
