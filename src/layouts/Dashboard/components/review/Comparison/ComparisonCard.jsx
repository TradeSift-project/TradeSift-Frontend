import { GitCompare } from 'lucide-react'

const ComparisonCard = ({ comparison }) => {
  const isConflict = comparison.status === 'conflict'
  const badgeBg = isConflict ? 'bg-rose-50' : 'bg-emerald-50'
  const badgeText = isConflict ? 'text-rose-600' : 'text-emerald-600'

  return (
    <div className="flex flex-col p-4 bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
          <GitCompare size={12} className="text-gray-400" />
          {comparison.fieldName}
        </h4>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeBg} ${badgeText}`}>
          {comparison.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex flex-col gap-1 p-2 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{comparison.docA.name}</span>
          <span className="text-xs font-bold text-gray-900">{comparison.docA.value}</span>
        </div>
        <div className="flex flex-col gap-1 p-2 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{comparison.docB.name}</span>
          <span className="text-xs font-bold text-gray-900">{comparison.docB.value}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Difference:</span>
        <span className={`text-xs font-bold ${isConflict ? 'text-rose-600' : 'text-emerald-600'}`}>
          {comparison.difference}
        </span>
      </div>
    </div>
  )
}

export default ComparisonCard
