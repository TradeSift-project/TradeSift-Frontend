const ApprovalStatCard = ({ title, value, variant = 'default' }) => {
  let bgColor = 'bg-gray-50'
  let textColor = 'text-gray-900'
  
  if (variant === 'success') {
    bgColor = 'bg-emerald-50'
    textColor = 'text-emerald-700'
  } else if (variant === 'warning') {
    bgColor = 'bg-amber-50'
    textColor = 'text-amber-700'
  }

  return (
    <div className={`flex flex-col p-4 rounded-xl border border-gray-100 ${bgColor} dark:border-neutral-800`}>
      <span className={`text-2xl font-black ${textColor}`}>{value}</span>
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 dark:text-gray-400">{title}</span>
    </div>
  )
}

const ApprovalSummary = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <ApprovalStatCard title="Documents" value={summary.documentsProcessed} />
      <ApprovalStatCard title="Fields" value={summary.fieldsExtracted} />
      <ApprovalStatCard title="Approved" value={summary.fieldsApproved} variant="success" />
      <ApprovalStatCard title="Issues Resolved" value={summary.issuesResolved} />
      <ApprovalStatCard title="Confidence" value={`${summary.overallConfidence}%`} variant="success" />
    </div>
  )
}

export default ApprovalSummary
