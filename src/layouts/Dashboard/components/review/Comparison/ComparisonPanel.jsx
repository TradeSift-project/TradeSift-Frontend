import ComparisonCard from './ComparisonCard'
import { GitCompare } from 'lucide-react'

const ComparisonPanel = ({ comparisons }) => {
  if (!comparisons || comparisons.length === 0) return null

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-150 dark:bg-neutral-800/50 dark:border-neutral-800">
        <GitCompare size={14} className="text-gray-500 dark:text-gray-400" />
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider dark:text-gray-300">
          Cross-Document Comparison
        </h3>
      </div>
      <div className="flex flex-col">
        {comparisons.map(comp => (
          <ComparisonCard key={comp.id} comparison={comp} />
        ))}
      </div>
    </div>
  )
}

export default ComparisonPanel
