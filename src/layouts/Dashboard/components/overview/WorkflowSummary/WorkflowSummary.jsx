import WorkflowCard from './WorkflowCard'
import { WORKFLOW_SUMMARY } from '../../../constants/dashboardConstants'

const WorkflowSummary = ({ workflows = WORKFLOW_SUMMARY }) => {
  const currentWorkflows = workflows || WORKFLOW_SUMMARY

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
          Operational Workflow Summary
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {currentWorkflows.map((flow) => (
          <WorkflowCard key={flow.id} {...flow} />
        ))}
      </div>
    </div>
  )
}

export default WorkflowSummary
