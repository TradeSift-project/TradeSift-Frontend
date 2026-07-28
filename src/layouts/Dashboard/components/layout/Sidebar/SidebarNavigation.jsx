import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../../../constants/dashboardConstants'

const SidebarNavigation = ({ onSoonClick }) => {
  const { pathname } = useLocation()

  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {NAV_ITEMS.map(({ label, icon: Icon, path, soon }) => {
        const active = !soon && pathname === path
        const className = `flex items-center gap-3 rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
          active
            ? 'bg-[#FDF6F0] text-[#F87103]'
            : 'text-[#686C72] hover:bg-[#FDF6F0]/60'
        }`

        const content = (
          <>
            <Icon size={18} strokeWidth={1.7} />
            <span className="flex-1">{label}</span>
            {soon && (
              <span className="rounded-full border border-[#E5E6E8] px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.4px] text-[#686C72]">
                Soon
              </span>
            )}
          </>
        )

        if (soon) {
          return (
            <button key={label} type="button" onClick={() => onSoonClick?.()} className={className}>
              {content}
            </button>
          )
        }

        return (
          <Link key={label} to={path} className={className}>
            {content}
          </Link>
        )
      })}
    </nav>
  )
}

export default SidebarNavigation
