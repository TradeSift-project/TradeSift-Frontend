import { ArrowRight, Wand2 } from 'lucide-react'
import MappingStatusBadge from './MappingStatusBadge'

const MappingRow = ({ mapping }) => {
  const isUnmapped = !mapping.status || mapping.status !== 'mapped'
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 px-3 transition-colors dark:border-neutral-800 dark:hover:bg-neutral-800/50">
      
      <div className="flex-[1.5] min-w-0">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block truncate dark:text-gray-300" title={mapping.sourceField || mapping.label}>
          {mapping.sourceField || mapping.label}
        </span>
      </div>

      <div className="hidden sm:flex items-center justify-center w-6 shrink-0">
        <ArrowRight size={14} className="text-gray-300 dark:text-neutral-600" />
      </div>

      <div className="flex-[1.5] min-w-0 flex flex-col justify-center">
        <span className={`text-sm font-semibold truncate block ${isUnmapped ? 'text-gray-400 italic' : 'text-gray-900 dark:text-white'}`} title={mapping.targetField || 'Not Mapped'}>
          {mapping.targetField || 'Not Mapped'}
        </span>
        {mapping.transform && (
          <div className="flex items-center gap-1 mt-0.5 text-indigo-600 dark:text-indigo-400" title={mapping.transform}>
            <Wand2 size={10} />
            <span className="text-[9px] font-bold uppercase tracking-wider truncate">
              {mapping.transform}
            </span>
          </div>
        )}
      </div>

      <div className="shrink-0 flex items-center justify-end sm:w-28">
        <MappingStatusBadge status={mapping.status || 'needs-mapping'} />
      </div>

    </div>
  )
}

export default MappingRow
