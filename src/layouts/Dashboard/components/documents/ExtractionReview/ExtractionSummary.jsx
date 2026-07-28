const ExtractionSummary = ({ total, reviewCount, averageConfidence }) => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-neutral-50/50 border border-neutral-150 rounded-[20px] p-4.5 text-center sm:text-left">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-bold text-[#686C72] uppercase tracking-[0.5px]">Fields Extracted</span>
        <span className="text-lg font-bold text-gray-900 mt-1">{total} Fields</span>
      </div>
      <div className="flex flex-col gap-0.5 border-l border-neutral-200 pl-4.5">
        <span className="text-[10px] font-bold text-[#686C72] uppercase tracking-[0.5px]">Needs Review</span>
        <span className={`text-lg font-bold mt-1 ${reviewCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
          {reviewCount} Alerts
        </span>
      </div>
      <div className="flex flex-col gap-0.5 border-l border-neutral-200 pl-4.5">
        <span className="text-[10px] font-bold text-[#686C72] uppercase tracking-[0.5px]">Average Confidence</span>
        <span className="text-lg font-bold text-emerald-600 mt-1">{averageConfidence}%</span>
      </div>
    </div>
  )
}

export default ExtractionSummary
