import { ChevronsLeft, User } from 'lucide-react'

const SidebarFooter = ({ user = { name: 'Ahmed Raza', role: 'Terminal Operator' } }) => (
  <div className="flex flex-col gap-1 border-t border-[#E5E6E8] px-3 pt-3">
    <button
      type="button"
      className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-[#686C72] transition hover:bg-[#FDF6F0]/60"
    >
      <ChevronsLeft size={18} strokeWidth={1.7} />
      Collapse
    </button>

    <div className="flex items-center gap-3 rounded-full px-4 py-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F87103]">
        <User size={18} strokeWidth={1.75} className="text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-[#0B0D12]">{user.name}</span>
        <span className="text-xs text-[#686C72]">{user.role}</span>
      </div>
    </div>
  </div>
)

export default SidebarFooter
