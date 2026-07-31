import { ChevronsLeft, ChevronsRight, User, LogOut } from 'lucide-react'

const SidebarFooter = ({ user = { name: 'Ahmed Raza', role: 'Terminal Operator' }, onLogout, isCollapsed, onToggleCollapse }) => (
  <div className="flex flex-col gap-1 border-t border-[#E5E6E8] px-3 pt-3 dark:border-neutral-800">
    <button
      type="button"
      onClick={onToggleCollapse}
      className={`flex items-center gap-3 rounded-full ${isCollapsed ? 'justify-center mx-auto w-10 px-0' : 'px-4'} py-2.5 text-sm font-medium text-[#686C72] transition hover:bg-[#FDF6F0]/60 w-full text-left dark:text-gray-400 dark:hover:bg-neutral-900`}
      title={isCollapsed ? "Expand Sidebar" : "Collapse"}
    >
      {isCollapsed ? <ChevronsRight size={18} strokeWidth={1.7} /> : <ChevronsLeft size={18} strokeWidth={1.7} />}
      {!isCollapsed && "Collapse"}
    </button>

    <div className={`flex items-center ${isCollapsed ? 'justify-center mx-auto' : 'justify-between'} gap-2 rounded-full px-2 py-2 hover:bg-neutral-50/50 transition dark:hover:bg-neutral-900`}>
      <div className={`flex items-center gap-3 min-w-0 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F87103]">
          <User size={18} strokeWidth={1.75} className="text-white" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-[#0B0D12] truncate max-w-[100px] dark:text-white">{user.name}</span>
            <span className="text-xs text-[#686C72] truncate max-w-[100px] dark:text-gray-400">{user.role}</span>
          </div>
        )}
      </div>

      {(!isCollapsed && onLogout) && (
        <button
          type="button"
          onClick={onLogout}
          className="p-1.5 text-neutral-400 hover:text-red-500 rounded-full hover:bg-neutral-100/50 transition shrink-0 dark:hover:bg-neutral-800"
          title="Log Out"
        >
          <LogOut size={16} strokeWidth={1.7} />
        </button>
      )}
    </div>
  </div>
)

export default SidebarFooter
