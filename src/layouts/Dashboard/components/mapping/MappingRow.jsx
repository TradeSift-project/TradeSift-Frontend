import { ArrowRight, AlertTriangle } from 'lucide-react'
import MappingStatusBadge from './MappingStatusBadge'

const MappingRow = ({ mapping }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-5 border-b border-gray-100 hover:bg-neutral-50/50 transition">
      
      {/* Standard Field Source */}
      <div className="flex-1 flex flex-col gap-1.5 min-w-[200px]">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#686C72]">
            TradeSift Standard
          </span>
          {!mapping.standardField && (
            <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
              Unassigned
            </span>
          )}
        </div>
        <span className="text-sm font-bold text-[#0B0D12]">
          {mapping.standardField ? mapping.standardField : <span className="text-gray-300 italic">No field selected</span>}
        </span>
        {mapping.standardValue && (
          <span className="text-xs text-gray-500 truncate max-w-[250px]" title={mapping.standardValue}>
            Val: <span className="font-mono text-gray-700">{mapping.standardValue}</span>
          </span>
        )}
      </div>

      {/* Directional Arrow (Desktop Only) */}
      <div className="hidden lg:flex shrink-0 text-gray-300 items-center justify-center">
        <ArrowRight size={18} />
      </div>

      {/* Target Terminal Field */}
      <div className="flex-1 flex flex-col gap-1.5 min-w-[200px]">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#686C72]">
            Target Terminal Field
          </span>
          {mapping.isRequired && (
            <span className="text-[9px] font-bold uppercase tracking-[0.5px] text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-sm">
              Required
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#0B0D12]">
            {mapping.targetField}
          </span>
          <span className="text-[10px] font-mono text-gray-400 border border-gray-200 px-1 rounded bg-gray-50">
            {mapping.targetFormat}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <MappingStatusBadge status={mapping.status} />
          {mapping.validationMessage && (
            <div className="flex items-center gap-1.5 text-[10px] text-red-500 bg-red-50/50 px-2 py-1 rounded-md">
              <AlertTriangle size={12} />
              <span>{mapping.validationMessage}</span>
            </div>
          )}
        </div>
      </div>
      
    </div>
  )
}

export default MappingRow
