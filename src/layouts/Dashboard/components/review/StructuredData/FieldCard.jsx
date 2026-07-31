import EditableField from './EditableField'
import ConfidenceBadge from '../ConfidenceBadge'
import StatusBadge from '../StatusBadge'

const FieldCard = ({ field, onChange }) => {
  return (
    <div className="grid grid-cols-12 gap-4 py-3 border-b border-gray-100 items-center hover:bg-gray-50/50 transition-colors px-2 rounded-lg group">
      
      {/* Field Name */}
      <div className="col-span-3">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block truncate" title={field.name}>
          {field.name}
        </span>
        <span className="text-[10px] font-medium text-gray-400 truncate mt-0.5 block">
          {field.sourceDocument}
        </span>
      </div>

      {/* Editable Value */}
      <div className="col-span-3">
        <EditableField 
          value={field.editableValue} 
          status={field.status}
          onChange={(val) => onChange(field.id, val)} 
        />
      </div>

      {/* AI Original Value */}
      <div className="col-span-3 px-2">
        <span className="text-sm font-medium text-gray-500 truncate block opacity-70 group-hover:opacity-100 transition-opacity">
          {field.aiValue || <span className="italic text-gray-300">Empty</span>}
        </span>
        <span className="text-[10px] text-gray-400 block mt-0.5">AI Extracted</span>
      </div>

      {/* Confidence & Status */}
      <div className="col-span-3 flex flex-col items-end gap-1.5">
        <StatusBadge status={field.status} />
        {field.confidence > 0 && (
          <div className="flex items-center gap-1">
            <span className={`text-[10px] font-bold ${field.confidence >= 95 ? 'text-emerald-500' : field.confidence >= 80 ? 'text-amber-500' : 'text-rose-500'}`}>
              {field.confidence}% Confidence
            </span>
          </div>
        )}
      </div>

    </div>
  )
}

export default FieldCard
