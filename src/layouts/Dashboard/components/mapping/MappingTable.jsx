import MappingRow from './MappingRow'

const MappingTable = ({ mappings }) => {
  return (
    <div className="flex flex-col border border-gray-150 rounded-[24px] overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:bg-neutral-900 dark:border-neutral-800">
      <div className="hidden lg:flex items-center gap-8 px-5 py-3 border-b border-gray-150 bg-neutral-50/50 dark:bg-neutral-800/30 dark:border-neutral-800">
        <div className="flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">
            Standard Field (Approved Data)
          </span>
        </div>
        <div className="w-[18px]"></div>
        <div className="flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">
            Target Terminal Field
          </span>
        </div>
      </div>
      
      <div className="flex flex-col">
        {mappings.map(mapping => (
          <MappingRow key={mapping.id} mapping={mapping} />
        ))}
        {mappings.length === 0 && (
          <div className="p-12 text-center text-sm text-gray-400">
            No fields available for mapping.
          </div>
        )}
      </div>
    </div>
  )
}

export default MappingTable
