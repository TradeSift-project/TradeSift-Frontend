import { FileText, Clock, Settings2 } from 'lucide-react'
import WorkflowStatusBadge from './WorkflowStatusBadge'

const WorkflowCard = ({ id, type, description, docCount, stage, status, updatedAt }) => {
  return (
    <div className="flex flex-col gap-4 rounded-[22px] border border-[#E5E6E8] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition hover:shadow-md dark:bg-neutral-900 dark:border-white/5">
      
      {/* Title Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">
            {id}
          </span>
          <h4 className="font-geist text-sm font-bold text-[#0B0D12] dark:text-white">
            {type}
          </h4>
          <p className="text-xs text-[#686C72] leading-relaxed mt-0.5 max-w-xs dark:text-[#9CA3AF]">
            {description}
          </p>
        </div>

        <WorkflowStatusBadge status={status} />
      </div>

      {/* Attributes Row */}
      <div className="grid grid-cols-3 gap-2 mt-1 pt-3.5 border-t border-neutral-50 text-left font-semibold text-gray-500 dark:border-white/5 dark:text-[#9CA3AF]">
        
        {/* Documents */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.5px] text-gray-400 flex items-center gap-1 dark:text-[#8A94A6]">
            <FileText size={10} />
            Docs
          </span>
          <span className="text-xs font-bold text-gray-800 mt-1 dark:text-gray-200">
            {docCount} Files
          </span>
        </div>

        {/* Stage */}
        <div className="flex flex-col gap-0.5 border-l border-neutral-150 pl-3.5 col-span-2 dark:border-white/5">
          <span className="text-[9px] font-bold uppercase tracking-[0.5px] text-gray-400 flex items-center gap-1 dark:text-[#8A94A6]">
            <Settings2 size={10} />
            Current Stage
          </span>
          <span className="text-xs font-bold text-gray-800 mt-1 truncate max-w-[150px] dark:text-gray-200">
            {stage}
          </span>
        </div>

      </div>

      {/* Footer Info */}
      <div className="flex items-center gap-1 text-[10px] text-gray-400 border-t border-neutral-50 pt-3 mt-0.5 dark:border-white/5 dark:text-[#8A94A6]">
        <Clock size={10} />
        <span>Last updated {updatedAt}</span>
      </div>

    </div>
  )
}

export default WorkflowCard
