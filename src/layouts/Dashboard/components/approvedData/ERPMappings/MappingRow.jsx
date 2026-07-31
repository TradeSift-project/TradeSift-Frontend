import { ArrowRight, Wand2 } from 'lucide-react'
import MappingStatusBadge from './MappingStatusBadge'

const MappingRow = ({ mapping }) => {
  const isUnmapped = !mapping.status || mapping.status !== 'mapped'
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 px-3 transition-colors dark:border-neutral-800">
      
      <div className="flex-1 min-w-0">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block truncate dark:text-gray-300">
          {mapping.sourceField || mapping.label}
        </span>
        <span className="text-[10px] text-gray-400 font-medium">TradeSift Field</span>
      </div>

      <div className="hidden sm:flex items-center justify-center w-8 shrink-0">
        <ArrowRight size={14} className="text-gray-300" />
      </div>

      <div className="flex-1 min-w-0">
        <span className={`text-sm font-semibold truncate block ${isUnmapped ? 'text-gray-400 italic' : 'text-gray-900'}`}>
          {mapping.targetField || 'Not Mapped'}
        </span>
        <span className="text-[10px] text-gray-400 font-medium">Target ERP Field</span>
      </div>
      
      {mapping.transform && (
        <div className="flex-1 min-w-0 flex items-center gap-1.5 text-indigo-600">
          <Wand2 size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider truncate">
            {mapping.transform}
          </span>
        </div>
      )}
      
      {!mapping.transform && (
        <div className="flex-1 min-w-0 hidden sm:block"></div>
      )}

      <div className="shrink-0 flex items-center justify-end sm:w-32">
        <MappingStatusBadge status={mapping.status || 'needs-mapping'} />
      </div>

    </div>
  )
}

export default MappingRow
