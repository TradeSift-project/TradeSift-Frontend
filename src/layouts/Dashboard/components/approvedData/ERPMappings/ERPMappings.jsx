import MappingRow from './MappingRow'

const ERPMappings = ({ mappings, unmapped }) => {
  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">ERP Mapping</h2>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">Review how the approved structured data maps to your target operational system.</p>
      </div>

      <div className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 dark:bg-neutral-800/50 dark:border-neutral-700">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider dark:text-gray-300">Mapped Fields</h3>
        </div>
        <div className="flex flex-col p-1">
          {mappings.map(mapping => (
            <MappingRow key={mapping.id} mapping={mapping} />
          ))}
        </div>
      </div>

      {unmapped && unmapped.length > 0 && (
        <div className="flex flex-col bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden dark:bg-neutral-900">
          <div className="flex items-center justify-between px-4 py-3 bg-amber-50/50 border-b border-amber-100">
            <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider">Unmapped Fields ({unmapped.length})</h3>
            <button 
              onClick={() => window.location.href = window.location.pathname.replace('approved-data', 'mapping')}
              className="text-[10px] font-bold uppercase tracking-wider text-amber-700 hover:text-amber-800 underline"
            >
              Review Mapping
            </button>
          </div>
          <div className="flex flex-col p-1">
            {unmapped.map(field => (
              <MappingRow key={field.id} mapping={field} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ERPMappings
