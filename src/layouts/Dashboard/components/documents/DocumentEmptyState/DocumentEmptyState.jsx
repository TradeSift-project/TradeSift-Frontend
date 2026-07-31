import { AlertCircle } from 'lucide-react'

const DocumentEmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white border border-[#E5E6E8] rounded-[24px] shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50 text-neutral-400 mb-4">
        <AlertCircle size={20} />
      </div>
      <h3 className="font-geist text-sm font-bold text-[#0B0D12]">
        No documents found
      </h3>
      <p className="text-xs text-[#686C72] mt-1 max-w-xs leading-relaxed">
        Try adjusting your filters or query terms to see results.
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10.5px] font-bold text-[#0b0d12] uppercase tracking-[0.5px] hover:bg-neutral-50"
        >
          Reset Filters
        </button>
      )}
    </div>
  )
}

export default DocumentEmptyState
