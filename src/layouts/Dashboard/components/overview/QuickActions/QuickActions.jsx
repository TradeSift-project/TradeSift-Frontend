import { useNavigate } from 'react-router-dom'
import { UploadCloud, ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react'

const QuickActions = ({ onStartWorkflow }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4 rounded-[22px] border border-[#E5E6E8] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)] dark:bg-neutral-900 dark:border-white/5">
      <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] border-b border-gray-50 pb-2 dark:text-[#9CA3AF] dark:border-white/5">
        Quick Operator Actions
      </span>

      <div className="flex flex-col gap-2.5">
        
        {/* Upload cargo documents */}
        <button
          type="button"
          onClick={() => navigate('/dashboard/documents')}
          className="flex items-center gap-3 w-full p-3 rounded-xl border border-[#F87103] bg-transparent hover:bg-[#FDF6F0]/50 transition text-left shadow-sm dark:bg-[#F87103] dark:hover:bg-[#e06502] dark:border-transparent"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FDF6F0] text-[#F87103] shrink-0 dark:bg-white/20 dark:text-white">
            <UploadCloud size={16} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-[#0B0D12] dark:text-white">Upload Documents</span>
            <span className="text-[10px] text-gray-500 dark:text-white/80">Ingest invoice or packing lists</span>
          </div>
        </button>

        {/* Start Import Workflow */}
        <button
          type="button"
          onClick={() => onStartWorkflow?.('Import')}
          className="flex items-center gap-3 w-full p-3 rounded-xl border border-neutral-100 bg-white hover:bg-neutral-50 transition text-left dark:bg-neutral-900 dark:border-white/5 dark:hover:bg-white/5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0 dark:bg-blue-500/10 dark:text-blue-400">
            <ArrowDownRight size={16} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-[#0B0D12] dark:text-white">Start Import Gate-In</span>
            <span className="text-[10px] text-gray-400 dark:text-[#9CA3AF]">Initiate cargo check and OCR</span>
          </div>
        </button>

        {/* Start Export Workflow */}
        <button
          type="button"
          onClick={() => onStartWorkflow?.('Export')}
          className="flex items-center gap-3 w-full p-3 rounded-xl border border-neutral-100 bg-white hover:bg-neutral-50 transition text-left dark:bg-neutral-900 dark:border-white/5 dark:hover:bg-white/5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 shrink-0 dark:bg-purple-500/10 dark:text-purple-400">
            <ArrowUpRight size={16} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-[#0B0D12] dark:text-white">Start Export Gate-Out</span>
            <span className="text-[10px] text-gray-400 dark:text-[#9CA3AF]">Validate weighments & release</span>
          </div>
        </button>

        {/* View All Documents */}
        <button
          type="button"
          onClick={() => navigate('/dashboard/documents')}
          className="flex items-center gap-3 w-full p-3 rounded-xl border border-neutral-100 bg-white hover:bg-neutral-50 transition text-left dark:bg-neutral-900 dark:border-white/5 dark:hover:bg-white/5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 text-gray-500 shrink-0 dark:bg-white/5 dark:text-[#9CA3AF]">
            <FileText size={16} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-[#0B0D12] dark:text-white">View Document List</span>
            <span className="text-[10px] text-gray-400 dark:text-[#9CA3AF]">Browse terminal repository</span>
          </div>
        </button>

      </div>
    </div>
  )
}

export default QuickActions
