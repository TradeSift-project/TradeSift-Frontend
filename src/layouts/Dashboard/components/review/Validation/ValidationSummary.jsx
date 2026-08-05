const ValidationSummary = ({ summary }) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm p-4 dark:bg-neutral-900 dark:border-neutral-700">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 dark:text-white">
        Review Summary
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col p-3 bg-gray-50 rounded-xl dark:bg-neutral-800/50">
          <span className="text-2xl font-black text-gray-900 dark:text-white">{summary.documents}</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 dark:text-gray-400">Documents</span>
        </div>
        <div className="flex flex-col p-3 bg-gray-50 rounded-xl dark:bg-neutral-800/50">
          <span className="text-2xl font-black text-gray-900 dark:text-white">{summary.fieldsExtracted}</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 dark:text-gray-400">Fields</span>
        </div>
        <div className="flex flex-col p-3 bg-emerald-50 rounded-xl dark:bg-emerald-500/10">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-500">{summary.verified}</span>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1 dark:text-emerald-500">Verified</span>
        </div>
        <div className="flex flex-col p-3 bg-rose-50 rounded-xl dark:bg-rose-500/10">
          <span className="text-2xl font-black text-rose-600 dark:text-rose-500">{summary.needReview}</span>
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mt-1 dark:text-rose-500">Needs Review</span>
        </div>
      </div>
    </div>
  )
}

export default ValidationSummary
