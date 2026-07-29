import ValidationIssueCard from './ValidationIssueCard'

const ValidationIssues = ({ issues = [], onResolveIssue }) => {
  if (!issues || issues.length === 0) return null

  return (
    <div className="flex flex-col gap-4 rounded-[22px] border border-[#E5E6E8] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
      <div className="flex items-center justify-between border-b border-gray-50 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
          Cross-Document Validation Alerts
        </span>
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-50 text-[10px] font-bold text-amber-600">
          {issues.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {issues.map((issue) => (
          <ValidationIssueCard
            key={issue.id}
            issue={issue}
            onResolve={onResolveIssue}
          />
        ))}
      </div>
    </div>
  )
}

export default ValidationIssues
