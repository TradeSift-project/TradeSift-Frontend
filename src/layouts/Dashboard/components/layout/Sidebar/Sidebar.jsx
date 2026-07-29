import SidebarLogo from './SidebarLogo'
import SidebarNavigation from './SidebarNavigation'
import SidebarSuggestions from './SidebarSuggestions'
import SidebarFooter from './SidebarFooter'

const Sidebar = ({ onSoonClick, user, onLogout }) => (
  <aside className="flex w-[240px] shrink-0 flex-col gap-4 border-r border-[#E5E6E8] bg-white py-5 h-fit">
    <SidebarLogo />
    <SidebarNavigation onSoonClick={onSoonClick} />
    <SidebarSuggestions />
    <SidebarFooter user={user} onLogout={onLogout} />
  </aside>
)

export default Sidebar
