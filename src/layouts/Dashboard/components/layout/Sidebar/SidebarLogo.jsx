import Logo from '../../../../../../assets/Logo.png'

const SidebarLogo = ({ isCollapsed }) => (
  <div className={`flex items-center gap-2 px-5 pb-3 ${isCollapsed ? 'justify-center px-0' : ''}`}>
    <img src={Logo} alt="TradeSift" className="h-8 w-8 object-contain shrink-0" />
    {!isCollapsed && <span className="font-geist text-xl font-medium text-black dark:text-white">TradeSift</span>}
  </div>
)

export default SidebarLogo
