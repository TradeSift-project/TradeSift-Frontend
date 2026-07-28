import { FILING_WORKFLOW_STEPS } from '../../../constants/dashboardConstants'

const WorkflowStepper = ({ steps = FILING_WORKFLOW_STEPS, totalSteps = 13, currentStep = 1, progress = 46 }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-1">
        <span className="font-inter text-[11px] font-medium uppercase tracking-[0.88px] text-[#686C72]">
          Workflow
        </span>
        <h3 className="font-geist text-sm font-semibold text-[#0B0D12]">
          {totalSteps} steps · Step {currentStep} of {totalSteps}
        </h3>
      </div>
      <span className="font-geist text-xs text-[#686C72]">Overall Progress · {progress}%</span>
    </div>

    <div className="overflow-x-auto pb-1">
      <div className="relative flex min-w-max gap-6 pt-3.5">
        <div className="absolute left-3.5 right-3.5 top-[27px] h-px bg-[#E5E6E8]" />
        <div
          className="absolute left-3.5 top-[27px] h-px bg-[#F87103]"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep

          return (
            <div key={step.label} className="relative flex w-[75px] shrink-0 flex-col items-center gap-2.5">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E6E8] bg-white ${
                  isActive ? 'shadow-[0_0_0_4px_rgba(248,113,3,0.15)]' : ''
                }`}
              >
                <span className="font-inter text-[11px] font-semibold text-[#686C72]">{stepNumber}</span>
              </div>
              <span className="text-center font-geist text-[10px] leading-[13px] text-[#686C72]">
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

export default WorkflowStepper
