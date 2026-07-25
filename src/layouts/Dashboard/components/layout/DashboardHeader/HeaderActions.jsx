import { Moon, Bell } from 'lucide-react'
import DashboardIconButton from '../../shared/DashboardIconButton'

const HeaderActions = () => (
  <div className="flex items-center gap-2">
    <DashboardIconButton aria-label="Toggle dark mode">
      <Moon size={16} strokeWidth={1.6} className="text-[#686C72]" />
    </DashboardIconButton>
    <DashboardIconButton aria-label="Notifications">
      <Bell size={16} strokeWidth={1.6} className="text-[#686C72]" />
    </DashboardIconButton>
  </div>
)

export default HeaderActions
