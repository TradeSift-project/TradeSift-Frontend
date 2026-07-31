import DataSection from './DataSection'

const StructuredData = ({ sections, onChange }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
      <div className="px-6 py-4 border-b border-gray-150 bg-white sticky top-0 z-10 dark:bg-neutral-900 dark:border-neutral-800">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight dark:text-white">Final Structured ERP Data</h2>
        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Consolidated dataset mapped from uploaded documents.</p>
      </div>

      <div className="flex flex-col p-6 overflow-y-auto">
        {sections.map((section) => (
          <DataSection key={section.id} section={section} onChange={onChange} />
        ))}
      </div>
    </div>
  )
}

export default StructuredData
