import { CheckCircle2, AlertTriangle, XCircle, FileType } from 'lucide-react'

const MappingSummary = ({ summary }) => {
  const isReady = summary.requiredRemaining === 0 && summary.invalid === 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
          Mapping Summary
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Fields */}
        <div className="flex flex-col gap-1 p-4 rounded-[16px] bg-white border border-gray-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-gray-500 flex items-center gap-1.5">
            <FileType size={12} />
            Total Fields
          </span>
          <span className="text-xl font-bold text-[#0B0D12]">{summary.totalFields}</span>
        </div>

        {/* Mapped */}
        <div className="flex flex-col gap-1 p-4 rounded-[16px] bg-emerald-50/50 border border-emerald-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 size={12} />
            Mapped
          </span>
          <span className="text-xl font-bold text-emerald-700">{summary.mapped}</span>
        </div>

        {/* Missing */}
        <div className="flex flex-col gap-1 p-4 rounded-[16px] bg-red-50/50 border border-red-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-red-600 flex items-center gap-1.5">
            <XCircle size={12} />
            Missing
          </span>
          <span className="text-xl font-bold text-red-700">{summary.missing}</span>
        </div>

        {/* Invalid */}
        <div className="flex flex-col gap-1 p-4 rounded-[16px] bg-orange-50/50 border border-orange-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-orange-600 flex items-center gap-1.5">
            <AlertTriangle size={12} />
            Invalid
          </span>
          <span className="text-xl font-bold text-orange-700">{summary.invalid}</span>
        </div>

        {/* Required Remaining */}
        <div className="flex flex-col gap-1 p-4 rounded-[16px] bg-blue-50/50 border border-blue-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-blue-600 flex items-center gap-1.5">
            <AlertTriangle size={12} />
            Required Left
          </span>
          <span className="text-xl font-bold text-blue-700">{summary.requiredRemaining}</span>
        </div>
      </div>

      {/* Readiness Banner */}
      <div className={`mt-2 p-4 rounded-[16px] border flex items-center gap-3 ${
        isReady 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-red-50 border-red-200 text-red-800'
      }`}>
        {isReady ? (
          <>
            <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
            <div>
              <p className="font-bold text-sm">Ready for Export</p>
              <p className="text-xs text-emerald-700/80 mt-0.5">All required fields are mapped and valid.</p>
            </div>
          </>
        ) : (
          <>
            <AlertTriangle className="text-red-600 shrink-0" size={20} />
            <div>
              <p className="font-bold text-sm">Mapping Incomplete</p>
              <p className="text-xs text-red-700/80 mt-0.5">
                {summary.requiredRemaining > 0 ? `${summary.requiredRemaining} required fields still need configuration.` : 'Please resolve invalid mappings.'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MappingSummary
