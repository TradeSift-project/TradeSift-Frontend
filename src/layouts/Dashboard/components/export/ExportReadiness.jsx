import { CheckCircle2, AlertTriangle, Check, LayoutTemplate, FileText } from 'lucide-react'

const ExportReadiness = ({ summary, isReady }) => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-[24px] border border-gray-150 p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-neutral-800">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">
          Operational Readiness
        </span>
        {isReady ? (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">
            <CheckCircle2 size={14} />
            Ready for Export
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-bold uppercase tracking-wider dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
            <AlertTriangle size={14} />
            Mapping Incomplete
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 shrink-0 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Check size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Processing Complete</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{summary.documents} documents</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 shrink-0 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Check size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Data Reviewed</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{summary.fieldsApproved} fields approved</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${isReady ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'}`}>
            {isReady ? <Check size={16} /> : <AlertTriangle size={16} />}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Terminal Mapping</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isReady ? `${summary.fieldsMapped} fields mapped` : `${summary.requiredRemaining} required missing`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:border-l border-gray-100 lg:pl-4 dark:border-neutral-800">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-600 shrink-0 border border-gray-200 dark:bg-neutral-800/50 dark:text-gray-400 dark:border-neutral-700">
            <LayoutTemplate size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Target System</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{summary.targetSystem}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportReadiness
