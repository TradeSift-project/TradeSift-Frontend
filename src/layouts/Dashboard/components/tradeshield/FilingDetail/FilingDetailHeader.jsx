import { Bell } from 'lucide-react'

const FilingDetailHeader = ({ filingId, title, meta }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-1.5 text-xs">
      <span className="font-geist text-[#686C72]">TradeShield</span>
      <span className="text-[#686C72]/50">/</span>
      <span className="font-geist text-[#686C72]">Filings</span>
      <span className="text-[#686C72]/50">/</span>
      <span className="font-geist text-[#0B0D12]">{filingId}</span>
    </div>

    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-geist text-[28px] font-semibold leading-9 tracking-[-0.6px] text-[#0B0D12]">
          {title}
        </h1>
        <p className="font-geist text-sm text-[#686C72]">{meta}</p>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E6E8] text-[#686C72] transition hover:bg-neutral-50"
      >
        <Bell size={16} strokeWidth={1.6} />
      </button>
    </div>
  </div>
)

export default FilingDetailHeader
