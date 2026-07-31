import { Save, CheckCircle, ArrowLeft, Send } from 'lucide-react'

const MappingActions = ({ onBack, onSave, onValidate, onExport, isReady }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100 bg-white sticky bottom-0 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-10 rounded-t-2xl dark:bg-neutral-900 dark:border-neutral-800">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition uppercase tracking-wider dark:text-gray-400"
      >
        <ArrowLeft size={16} />
        Back to Approved Data
      </button>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition uppercase tracking-wider dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          <Save size={16} />
          Save Mapping
        </button>

        <button
          type="button"
          onClick={onValidate}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold hover:bg-blue-100 transition uppercase tracking-wider"
        >
          <CheckCircle size={16} />
          Validate
        </button>

        <button
          type="button"
          onClick={onExport}
          disabled={!isReady}
          className={`flex items-center gap-2 px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
            isReady 
              ? 'bg-black text-white hover:bg-neutral-800 shadow-md' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send size={16} />
          Export Data
        </button>
      </div>
    </div>
  )
}

export default MappingActions
