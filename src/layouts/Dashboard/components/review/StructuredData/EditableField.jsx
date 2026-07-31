const EditableField = ({ value, onChange, status }) => {
  const isNeedsReview = status === 'requires-review' || status === 'empty'
  const inputBorder = isNeedsReview ? 'border-orange-400 bg-orange-50/20' : 'border-gray-200 bg-white hover:border-gray-300'

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-2.5 py-1.5 text-sm font-semibold text-gray-900 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#F87103]/20 focus:border-[#F87103] transition-colors ${inputBorder}`}
      placeholder="Empty"
    />
  )
}

export default EditableField
