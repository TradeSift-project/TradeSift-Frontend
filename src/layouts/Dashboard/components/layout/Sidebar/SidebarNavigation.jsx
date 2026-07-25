import { NAV_ITEMS } from '../../../constants/dashboardConstants'

const SidebarNavigation = ({ onSoonClick }) => (
  <nav className="flex flex-col gap-0.5 px-3">
    {NAV_ITEMS.map(({ label, icon: Icon, active, soon }) => (
      <button
        key={label}
        type="button"
        onClick={() => soon && onSoonClick?.()}
        className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
          active
            ? 'bg-[#FDF6F0] text-[#F87103]'
            : 'text-[#686C72] hover:bg-[#FDF6F0]/60'
        }`}
      >
        <Icon size={18} strokeWidth={1.7} />
        <span className="flex-1">{label}</span>
        {soon && (
          <span className="rounded-full border border-[#E5E6E8] px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.4px] text-[#686C72]">
            Soon
          </span>
        )}
      </button>
    ))}
  </nav>
)

export default SidebarNavigation
