import { FileSpreadsheet, Send, FileCode, CheckCircle2 } from 'lucide-react'

const StructuredDataPreview = ({ isOpen, onClose, documentName, documentType, fields = [], onExport }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] border border-neutral-150 p-6 w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[85vh] dark:bg-neutral-900 dark:border-neutral-800">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-4 mb-5 dark:border-neutral-800">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-emerald-600 flex items-center gap-1 font-mono">
              <CheckCircle2 size={12} />
              Ready for Integration
            </span>
            <h3 className="font-geist text-lg font-bold text-[#0B0D12] dark:text-white">
              Structured Operational Data
            </h3>
            <p className="text-xs text-gray-400">
              Preview parsed operational schema for {documentName} ({documentType})
            </p>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-y-auto border border-neutral-100 rounded-2xl mb-6 dark:border-neutral-800">
          <table className="w-full border-collapse text-left text-xs text-gray-500 font-semibold dark:text-gray-400">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:bg-neutral-800/30 dark:border-neutral-800">
                <th className="px-5 py-3">Destination Field</th>
                <th className="px-5 py-3">Extracted Value</th>
                <th className="px-5 py-3 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-white/5">
              {fields.map((field) => (
                <tr key={field.id} className="hover:bg-neutral-50/20">
                  <td className="px-5 py-3 text-[#0B0D12] font-semibold dark:text-white">{field.label}</td>
                  <td className="px-5 py-3 font-mono text-gray-700 dark:text-gray-300">{field.value || <span className="text-red-400 italic">Empty</span>}</td>
                  <td className="px-5 py-3 text-right text-[10px] font-bold text-emerald-600 bg-emerald-50/15">
                    {field.confidence !== undefined ? `${Math.round(field.confidence * 100)}%` : '100%'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Panel */}
        <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-[10.5px] text-gray-400 font-semibold">
            <span>Prepared for destination ERP system mapping.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onExport?.('excel')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-neutral-50 uppercase tracking-wider dark:bg-neutral-900 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <FileSpreadsheet size={13} className="text-emerald-600" />
              Export Excel
            </button>
            
            <button
              type="button"
              onClick={() => onExport?.('xml')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-neutral-50 uppercase tracking-wider dark:bg-neutral-900 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <FileCode size={13} className="text-[#F87103]" />
              WeBOC XML
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-850 uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StructuredDataPreview
