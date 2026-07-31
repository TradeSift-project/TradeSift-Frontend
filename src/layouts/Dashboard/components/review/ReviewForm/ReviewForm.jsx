import FieldGroup from '../FieldGroup'

const ReviewForm = ({ sections, onChange }) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6 border-b border-gray-150 pb-4">
        <h2 className="text-lg font-bold text-gray-900">Extracted Fields</h2>
        <p className="text-xs text-gray-500 mt-1">
          Review and correct extracted values. Low confidence fields are highlighted.
        </p>
      </div>

      <div className="flex flex-col">
        {sections.map((section) => (
          <FieldGroup key={section.id} section={section} onChange={onChange} />
        ))}
      </div>
    </div>
  )
}

export default ReviewForm
