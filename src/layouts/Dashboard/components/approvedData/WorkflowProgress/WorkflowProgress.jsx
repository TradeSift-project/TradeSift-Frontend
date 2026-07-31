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
    icon = <div className="w-3.5 h-3.5 rounded-full bg-[#F87103] flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>
    textColor = 'text-[#F87103]'
    weight = 'font-bold'
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        {icon}
        <span className={`text-xs uppercase tracking-wider ${textColor} ${weight}`}>{step.label}</span>
      </div>
      {!isLast && (
        <div className={`w-8 md:w-16 h-px mx-3 ${isCompleted ? 'bg-emerald-200' : 'bg-gray-200'}`}></div>
      )}
    </div>
  )
}

const WorkflowProgress = ({ steps }) => {
  return (
    <div className="flex flex-wrap items-center gap-y-3 py-6">
      {steps.map((step, index) => (
        <WorkflowStep key={step.id} step={step} isLast={index === steps.length - 1} />
      ))}
    </div>
  )
}

export default WorkflowProgress
