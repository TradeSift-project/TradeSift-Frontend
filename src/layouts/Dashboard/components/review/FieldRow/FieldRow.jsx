import ConfidenceBadge from '../ConfidenceBadge'

const FieldRow = ({ field, onChange }) => {
  const isNeedsReview = field.status === 'needs-review' || field.status === 'low'
  const inputBorder = isNeedsReview ? 'border-orange-400 bg-orange-50/30' : 'border-gray-200 bg-white hover:border-gray-300'

  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex items-center justify-between">
        <label htmlFor={field.id} className="text-xs font-semibold text-gray-700 uppercase tracking-wide dark:text-gray-300">
          {field.label}
        </label>
        <ConfidenceBadge status={field.status} confidence={field.confidence} />
      </div>
      <input
        id={field.id}
        type="text"
        value={field.value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className={`w-full px-3 py-2 text-sm font-medium text-gray-900 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F87103]/20 focus:border-[#F87103] transition-colors ${inputBorder} dark:text-white`}
        placeholder="Enter value"
      />
    </div>
  )
}

export default FieldRow
