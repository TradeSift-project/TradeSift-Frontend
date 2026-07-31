import ThemeToggle from './ThemeToggle'
import NotificationPanel from './NotificationPanel'

const HeaderActions = () => (
  <div className="flex items-center gap-2">
    <ThemeToggle />
    <NotificationPanel />
  </div>
)

export default HeaderActions
