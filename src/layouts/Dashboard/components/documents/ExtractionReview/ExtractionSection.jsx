import ExtractionField from './ExtractionField'

const ExtractionSection = ({ section, onFieldChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] border-b border-gray-50 pb-2">
        {section.title}
      </span>

      <div className="space-y-4">
        {section.fields.map((field) => (
          <ExtractionField
            key={field.id}
            field={field}
            onValueSave={(val) => onFieldChange(section.id, field.id, val)}
          />
        ))}
      </div>
    </div>
  )
}

export default ExtractionSection
