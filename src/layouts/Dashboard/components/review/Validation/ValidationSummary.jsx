const ValidationSummary = ({ summary }) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
        Review Summary
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
          <span className="text-2xl font-black text-gray-900">{summary.documents}</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Documents</span>
        </div>
        <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
          <span className="text-2xl font-black text-gray-900">{summary.fieldsExtracted}</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Fields</span>
        </div>
        <div className="flex flex-col p-3 bg-emerald-50 rounded-xl">
          <span className="text-2xl font-black text-emerald-600">{summary.verified}</span>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Verified</span>
        </div>
        <div className="flex flex-col p-3 bg-rose-50 rounded-xl">
          <span className="text-2xl font-black text-rose-600">{summary.needReview}</span>
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mt-1">Needs Review</span>
        </div>
      </div>
    </div>
  )
}

export default ValidationSummary
