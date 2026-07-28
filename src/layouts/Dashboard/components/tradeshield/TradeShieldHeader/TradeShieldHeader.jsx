import { Plus } from 'lucide-react'

const TradeShieldHeader = ({ onNewAnalysis }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-1.5 text-[13px]">
      <span className="text-[#686C72]">TradeSift</span>
      <span className="text-[#686C72]/50">/</span>
      <span className="text-[#0B0D12]">TradeShield</span>
    </div>

    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-inter text-4xl font-semibold tracking-[-0.685px] text-[#0B0D12]">
          TradeShield
        </h1>
        <p className="font-geist text-base text-[#686C72]">
          AI customs compliance workspace for import and export filings.
        </p>
      </div>

      <button
        type="button"
        onClick={onNewAnalysis}
        className="flex items-center gap-1.5 rounded-[14px] bg-[#F87103] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#e06d09] active:scale-95"
      >
        <Plus size={15} strokeWidth={2} />
        New Analysis
      </button>
    </div>
  </div>
)

export default TradeShieldHeader
