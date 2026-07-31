import { AlertTriangle, FileText, ArrowRight } from 'lucide-react'

const ValidationIssueCard = ({ issue, onResolve }) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-amber-100 bg-amber-50/10 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
      
      {/* Alert Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-500 shrink-0">
          <AlertTriangle size={14} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-amber-600 font-mono">
            {issue.type || 'Cross-Document Alert'}
          </span>
          <p className="text-xs font-bold text-gray-900 leading-normal dark:text-white">
            {issue.message}
          </p>
        </div>
      </div>

      {/* Details Row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10.5px] text-gray-500 font-semibold border-t border-amber-50 pt-2.5 mt-0.5 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <FileText size={12} className="text-gray-400" />
          <span>Docs: <span className="text-[#0B0D12] dark:text-white">{issue.affectedDocs.join(' ⇄ ')}</span></span>
        </div>
        <div className="flex items-center gap-1">
          <span>Field: <span className="text-red-500">{issue.field}</span></span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={() => onResolve?.(issue)}
          className="inline-flex items-center gap-1 text-[9.5px] font-bold text-amber-600 hover:text-amber-700 uppercase tracking-[0.5px] transition"
        >
          {issue.actionLabel || 'Resolve Discrepancy'}
          <ArrowRight size={10} />
        </button>
      </div>

    </div>
  )
}

export default ValidationIssueCard
