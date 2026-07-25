import Logo from '../../../../../../assets/Logo.png'

const SidebarLogo = () => (
  <div className="flex items-center gap-2 px-5 pb-3">
    <img src={Logo} alt="TradeSift" className="h-8 w-8 object-contain" />
    <span className="font-geist text-xl font-medium text-black">TradeSift</span>
  </div>
)

export default SidebarLogo
