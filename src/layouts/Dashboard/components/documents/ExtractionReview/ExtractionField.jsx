import FieldStatusBadge from './FieldStatusBadge'
import ExtractionFieldEditor from './ExtractionFieldEditor'

const ExtractionField = ({ field, onValueSave }) => {
  const percentage = Math.round(field.confidence * 100)
  
  const getBorderColor = () => {
    if (field.status === 'missing' || field.status === 'mismatch' || field.confidence === 0) {
      return 'border-rose-150 bg-rose-50/5 text-rose-800'
    }
    if (percentage >= 90 && field.status === 'verified') {
      return 'border-emerald-100 bg-emerald-50/5 text-emerald-800'
    }
    return 'border-amber-150 bg-amber-50/5 text-amber-800'
  }

  return (
    <div className={`flex flex-col gap-1.5 p-3.5 rounded-xl border ${getBorderColor()}`}>
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5px]">
          {field.label}
        </label>
        <FieldStatusBadge status={field.status} confidence={field.confidence} />
      </div>

      <ExtractionFieldEditor
        initialValue={field.value}
        placeholder={field.status === 'missing' ? 'Missing information' : 'Add value'}
        onSave={onValueSave}
      />

      {field.message && (
        <span className="text-[9.5px] font-medium text-gray-450 mt-1 flex items-center gap-1">
          ⚠️ {field.message}
        </span>
      )}
    </div>
  )
}

export default ExtractionField
