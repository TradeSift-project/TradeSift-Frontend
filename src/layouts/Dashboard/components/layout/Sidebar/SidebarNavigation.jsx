import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../../../constants/dashboardConstants'

const SidebarNavigation = ({ onSoonClick, isCollapsed }) => {
  const { pathname } = useLocation()

  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {NAV_ITEMS.map(({ label, icon: Icon, path, soon }) => {
        const active = !soon && pathname === path
        const className = `flex items-center gap-3 rounded-full ${isCollapsed ? 'px-0 justify-center w-10 mx-auto' : 'px-4'} py-2.5 text-left text-sm font-medium transition-colors group relative ${
          active
            ? 'bg-[#FDF6F0] text-[#F87103] dark:bg-amber-900/20 dark:text-amber-500'
            : 'text-[#686C72] hover:bg-[#FDF6F0]/60 dark:text-gray-400 dark:hover:bg-neutral-900'
        }`

        const content = (
          <>
            <Icon size={18} strokeWidth={1.7} className="shrink-0" />
            
            {!isCollapsed && (
              <>
                <span className="flex-1 whitespace-nowrap">{label}</span>
                {soon && (
                  <span className="rounded-full border border-[#E5E6E8] px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.4px] text-[#686C72] dark:border-neutral-800 dark:text-gray-500">
                    Soon
                  </span>
                )}
              </>
            )}

            {isCollapsed && (
              <div className="absolute left-14 hidden group-hover:flex items-center rounded-md bg-black px-2 py-1 text-xs text-white z-50 shadow-lg whitespace-nowrap dark:bg-white dark:text-black font-semibold">
                {label}
                {soon && <span className="ml-2 text-gray-300 dark:text-gray-600 text-[10px] uppercase">Soon</span>}
              </div>
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
