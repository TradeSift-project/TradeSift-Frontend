import { Check, Circle } from 'lucide-react'

const WorkflowStep = ({ step, isLast }) => {
  const isCompleted = step.status === 'completed'
  const isCurrent = step.status === 'current'
  
  let icon = <Circle size={14} className="text-gray-300" />
  let textColor = 'text-gray-400'
  let weight = 'font-medium'
  
  if (isCompleted) {
    icon = <Check size={14} className="text-emerald-500" />
    textColor = 'text-gray-900'
  } else if (isCurrent) {
    icon = <div className="w-3.5 h-3.5 rounded-full bg-[#F87103] flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full dark:bg-neutral-900"></div></div>
    textColor = 'text-[#F87103]'
    weight = 'font-bold'
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <div className="flex items-center gap-2 py-1 md:py-0">
        {icon}
        <span className={`text-xs uppercase tracking-wider ${textColor} ${weight}`}>{step.label}</span>
      </div>
      {!isLast && (
        <div className={`hidden md:block w-8 md:w-12 lg:w-16 h-px mx-3 ${isCompleted ? 'bg-emerald-200' : 'bg-gray-200'}`}></div>
      )}
      {!isLast && (
        <div className={`md:hidden w-px h-6 ml-[6px] my-1 ${isCompleted ? 'bg-emerald-200' : 'bg-gray-200'}`}></div>
      )}
    </div>
  )
}

const WorkflowProgress = ({ steps, currentStepId }) => {
  // Update statuses based on currentStepId if it's provided, else use raw steps
  const derivedSteps = steps.map(step => {
    if (!currentStepId) return step
    
    // Find index of currentStepId in the steps array
    const currentIndex = steps.findIndex(s => s.id === currentStepId)
    const stepIndex = steps.findIndex(s => s.id === step.id)

    if (stepIndex < currentIndex) {
      return { ...step, status: 'completed' }
    } else if (stepIndex === currentIndex) {
      return { ...step, status: 'current' }
    } else {
      return { ...step, status: 'next' }
    }
  })

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-y-1 md:gap-y-3 py-6">
      {derivedSteps.map((step, index) => (
        <WorkflowStep key={step.id} step={step} isLast={index === derivedSteps.length - 1} />
      ))}
    </div>
  )
}

export default WorkflowProgress
