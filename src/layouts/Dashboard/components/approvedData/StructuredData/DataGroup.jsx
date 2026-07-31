import FieldValueRow from './FieldValueRow'

const DataGroup = ({ group }) => {
  return (
    <div className="flex flex-col mb-8 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
          {group.title}
        </h3>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          {group.fields.length} Fields
        </span>
      </div>
      
      <div className="flex flex-col p-2">
        {group.fields.map((field) => (
          <FieldValueRow key={field.id} field={field} />
        ))}
      </div>
    </div>
  )
}

export default DataGroup
