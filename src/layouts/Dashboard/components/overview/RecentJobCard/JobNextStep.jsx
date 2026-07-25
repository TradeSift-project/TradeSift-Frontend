import { ArrowRight } from 'lucide-react'

const JobNextStep = ({ nextStep = 'HS Code Intelligence', onResume }) => {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.93px] text-[#686C72]">
          Next Step
        </span>
        <span className="font-geist text-sm font-semibold text-[#0B0D12]">
          {nextStep}
        </span>
      </div>
      <button
        type="button"
        onClick={onResume}
        className="flex items-center gap-1.5 rounded-full bg-[#F87103] px-4.5 py-2.5 text-xs font-medium text-white transition-all hover:bg-[#e06d09] active:scale-95"
      >
        Resume Analysis
        <ArrowRight size={14} />
      </button>
    </div>
  )
}

export default JobNextStep
