const EditableField = ({ value, onChange, status }) => {
  const isNeedsReview = status === 'requires-review' || status === 'empty'
  const inputBorder = isNeedsReview ? 'border-orange-400 bg-orange-50/20 dark:bg-orange-500/10 dark:border-orange-500/30' : 'border-gray-200 bg-white hover:border-gray-300 dark:bg-neutral-800/50 dark:border-neutral-700'

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-2.5 py-1.5 text-sm font-semibold text-gray-900 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#F87103]/20 focus:border-[#F87103] transition-colors ${inputBorder} dark:text-white`}
      placeholder="Empty"
    />
  )
}

export default EditableField
