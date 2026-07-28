const WorkflowCard = ({ title, description, processed, processing, review, icon: Icon }) => {
  return (
    <div className="flex flex-col gap-4 rounded-[22px] border border-[#E5E6E8] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-geist text-lg font-bold text-[#0B0D12]">
            {title} Operations
          </h3>
          <p className="text-xs text-[#686C72] leading-relaxed max-w-sm mt-0.5">
            {description}
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 text-[#F87103]">
          {Icon && <Icon size={16} />}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mt-2 pt-4 border-t border-neutral-50 text-center">
        
        {/* Processed */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#686C72]">
            Processed
          </span>
          <span className="font-geist text-lg font-bold text-gray-900 mt-1">
            {processed}
          </span>
        </div>

        {/* Processing */}
        <div className="flex flex-col gap-0.5 border-l border-neutral-150">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#686C72]">
            Processing
          </span>
          <span className="font-geist text-lg font-bold text-[#F87103] mt-1">
            {processing}
          </span>
        </div>

        {/* Review */}
        <div className="flex flex-col gap-0.5 border-l border-neutral-150">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#686C72]">
            Review
          </span>
          <span className="font-geist text-lg font-bold text-red-600 mt-1">
            {review}
          </span>
        </div>

      </div>

    </div>
  )
}

export default WorkflowCard
