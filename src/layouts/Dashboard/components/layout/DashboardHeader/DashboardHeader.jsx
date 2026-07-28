import HeaderActions from './HeaderActions'

const DashboardHeader = ({
  greeting = 'Good morning, Ahmed Raza 👋',
  subtitle = "Here's what's happening with your document-to-data automation today.",
}) => (
  <div className="flex items-start justify-between">
    <div className="flex flex-col gap-1.5">
      <h1 className="font-geist text-[34px] font-semibold tracking-[-0.685px] text-[#0B0D12] leading-tight">
        {greeting}
      </h1>
      <p className="font-geist text-sm text-[#686C72]">{subtitle}</p>
    </div>
    <HeaderActions />
  </div>
)

export default DashboardHeader
