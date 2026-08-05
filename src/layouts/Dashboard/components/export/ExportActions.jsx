import { ArrowLeft, Send, Download } from 'lucide-react'

const ExportActions = ({ destinationId, onBack, onExport, isReady }) => {
  const isExcel = destinationId === 'excel-standard'

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100 bg-white sticky bottom-0 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-10 rounded-t-2xl dark:bg-neutral-900 dark:border-neutral-800">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition uppercase tracking-wider dark:text-gray-400"
      >
        <ArrowLeft size={16} />
        Back to Mapping
      </button>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onExport}
          disabled={!isReady}
          className={`flex items-center gap-2 px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
            isReady 
              ? 'bg-[#F87103] text-white hover:bg-[#E06602] shadow-md shadow-[#F87103]/20' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-neutral-800 dark:text-gray-500'
          }`}
        >
          {isExcel ? <Download size={16} /> : <Send size={16} />}
          {isExcel ? 'Download Excel' : 'Send to Terminal API'}
        </button>
      </div>
    </div>
  )
}

export default ExportActions
