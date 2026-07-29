import WorkflowCard from './WorkflowCard'
import { ACTIVE_WORKFLOWS } from '../../../constants/dashboardConstants'

const ActiveWorkflows = ({ workflows = ACTIVE_WORKFLOWS }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
          Active Gate Operations
        </span>
        <span className="text-[10px] text-gray-400">
          {workflows.length} active jobs
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {workflows.map((flow) => (
          <WorkflowCard key={flow.id} {...flow} />
        ))}
      </div>
    </div>
  )
}

export default ActiveWorkflows
