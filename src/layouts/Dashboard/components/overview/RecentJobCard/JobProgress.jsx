const JobProgress = ({ progress = 45 }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <span className="font-geist text-[13px] text-[#686C72]">Progress</span>
        <span className="text-xs font-semibold text-[#0B0D12]">{progress}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#E5E6E8]">
        <div 
          className="h-full rounded-full bg-[#F87103] transition-all duration-300" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  )
}

export default JobProgress
