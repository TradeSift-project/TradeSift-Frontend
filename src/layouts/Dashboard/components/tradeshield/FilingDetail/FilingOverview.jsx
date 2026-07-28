import { FILING_INFO_ITEMS } from '../../../constants/dashboardConstants'

const FilingOverview = ({ items = FILING_INFO_ITEMS }) => (
  <div className="flex flex-col gap-1">
    <span className="font-inter text-[11px] font-medium uppercase tracking-[0.88px] text-[#686C72]">
      Overview
    </span>
    <h3 className="font-inter text-[15px] font-semibold text-[#0B0D12]">Filing Information</h3>

    <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[#E5E6E8] bg-[#E5E6E8] sm:grid-cols-2">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3 bg-white px-4 py-3.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4F5F7]">
            <Icon size={14} strokeWidth={1.6} className="text-[#686C72]" />
          </div>
          <div className="flex flex-col">
            <span className="font-inter text-xs text-[#686C72]">{label}</span>
            <span className="font-inter text-[12.5px] font-medium text-[#0B0D12]">{value}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default FilingOverview
