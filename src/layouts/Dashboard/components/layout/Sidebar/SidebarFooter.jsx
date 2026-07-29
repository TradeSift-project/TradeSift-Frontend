import { ChevronsLeft, User, LogOut } from 'lucide-react'

const SidebarFooter = ({ user = { name: 'Ahmed Raza', role: 'Terminal Operator' }, onLogout }) => (
  <div className="flex flex-col gap-1 border-t border-[#E5E6E8] px-3 pt-3">
    <button
      type="button"
      className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-[#686C72] transition hover:bg-[#FDF6F0]/60 w-full text-left"
    >
      <ChevronsLeft size={18} strokeWidth={1.7} />
      Collapse
    </button>

    <div className="flex items-center justify-between gap-2 rounded-full px-4 py-2 hover:bg-neutral-50/50 transition">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F87103]">
          <User size={18} strokeWidth={1.75} className="text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-[#0B0D12] truncate max-w-[100px]">{user.name}</span>
          <span className="text-xs text-[#686C72] truncate max-w-[100px]">{user.role}</span>
        </div>
      </div>

      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className="p-1.5 text-neutral-400 hover:text-red-500 rounded-full hover:bg-neutral-100/50 transition shrink-0"
          title="Log Out"
        >
          <LogOut size={16} strokeWidth={1.7} />
        </button>
      )}
    </div>
  </div>
)

export default SidebarFooter
