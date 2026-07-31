import FieldRow from '../FieldRow'

const FieldGroup = ({ section, onChange }) => {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <h3 className="text-sm font-bold text-gray-900 border-b border-gray-150 pb-2 mb-2 uppercase tracking-wide dark:text-white dark:border-neutral-800">
        {section.title}
      </h3>
      <div className="flex flex-col gap-1">
        {section.fields.map((field) => (
          <FieldRow key={field.id} field={field} onChange={(fieldId, val) => onChange(section.id, fieldId, val)} />
        ))}
      </div>
    </div>
  )
}

export default FieldGroup
