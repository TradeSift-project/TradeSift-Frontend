import { GitCompare } from 'lucide-react'

const ComparisonCard = ({ comparison }) => {
  const isConflict = comparison.status === 'conflict'
  const badgeBg = isConflict ? 'bg-rose-50 dark:bg-rose-500/10' : 'bg-emerald-50 dark:bg-emerald-500/10'
  const badgeText = isConflict ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'

  return (
    <div className="flex flex-col p-4 bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 dark:text-white">
          <GitCompare size={12} className="text-gray-400" />
          {comparison.fieldName}
        </h4>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeBg} ${badgeText}`}>
          {comparison.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex flex-col gap-1 p-2 bg-gray-50 rounded-lg border border-gray-100 dark:bg-neutral-800/50 dark:border-neutral-800">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{comparison.docA.name}</span>
          <span className="text-xs font-bold text-gray-900 dark:text-white">{comparison.docA.value}</span>
        </div>
        <div className="flex flex-col gap-1 p-2 bg-gray-50 rounded-lg border border-gray-100 dark:bg-neutral-800/50 dark:border-neutral-800">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{comparison.docB.name}</span>
          <span className="text-xs font-bold text-gray-900 dark:text-white">{comparison.docB.value}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Difference:</span>
        <span className={`text-xs font-bold ${isConflict ? 'text-rose-600' : 'text-emerald-600'}`}>
          {comparison.difference}
        </span>
      </div>
    </div>
  )
}

export default ComparisonCard
