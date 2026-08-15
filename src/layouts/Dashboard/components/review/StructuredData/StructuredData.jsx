import DataSection from './DataSection'

const StructuredData = ({ sections, onChange }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
      <div className="px-6 py-4 border-b border-gray-150 bg-white sticky top-0 z-10 dark:bg-neutral-900 dark:border-neutral-800">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight dark:text-white">Final Structured ERP Data</h2>
        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Consolidated dataset mapped from uploaded documents.</p>
      </div>

      <div className="flex flex-col p-6 overflow-y-auto">
        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 dark:bg-neutral-800">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">No data extracted</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-[250px] dark:text-gray-400">The AI could not extract any structured fields from the uploaded documents.</p>
          </div>
        ) : (
          sections.map((section) => (
            <DataSection key={section.id} section={section} onChange={onChange} />
          ))
        )}
      </div>
    </div>
  )
}

export default StructuredData
