import { Plus } from 'lucide-react'

const DocumentsHeader = ({ onUploadClick }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-geist text-2xl font-bold tracking-tight text-[#0B0D12]">
          Documents Workspace
        </h1>
        <p className="text-xs text-[#686C72] leading-normal">
          Ingest, search, filter, and review cargo operational documents from terminal gate operations.
        </p>
      </div>

      <button
        type="button"
        onClick={onUploadClick}
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-850 uppercase tracking-wider shrink-0"
      >
        <Plus size={14} />
        Upload Documents
      </button>
    </div>
  )
}

export default DocumentsHeader
