import FieldCard from './FieldCard'

const DataSection = ({ section, onChange }) => {
  return (
    <div className="flex flex-col mb-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2 dark:border-neutral-700">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest dark:text-white">
          {section.title}
        </h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-full dark:bg-neutral-800">
          {section.fields.length} Fields
        </span>
      </div>
      
      <div className="flex flex-col">
        {section.fields.map((field) => (
          <FieldCard 
            key={field.id} 
            field={field} 
            onChange={(fieldId, val) => onChange(section.id, fieldId, val)} 
          />
        ))}
      </div>
    </div>
  )
}

export default DataSection
