import { Check } from 'lucide-react'
import SourceDocumentBadge from '../SourceTraceability/SourceDocumentBadge'

const FieldValueRow = ({ field }) => {
  return (
    <div className="grid grid-cols-12 gap-4 py-2.5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-2 items-center">
      
      {/* Field Label */}
      <div className="col-span-12 sm:col-span-3">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block truncate">
          {field.label}
        </span>
      </div>

      {/* Normalized Value */}
      <div className="col-span-12 sm:col-span-4">
        <span className="text-sm font-semibold text-gray-900 truncate block">
          {field.value}
        </span>
      </div>

      {/* Source Traceability */}
      <div className="col-span-6 sm:col-span-3 flex items-center">
        <SourceDocumentBadge sourceName={field.source} />
      </div>

      {/* Status & Confidence */}
      <div className="col-span-6 sm:col-span-2 flex flex-col sm:items-end gap-1">
        <div className="flex items-center gap-1">
          <Check size={12} className="text-emerald-500" />
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            {field.status}
          </span>
        </div>
        <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
          {field.confidence}% Confidence
        </span>
      </div>

    </div>
  )
}

export default FieldValueRow
