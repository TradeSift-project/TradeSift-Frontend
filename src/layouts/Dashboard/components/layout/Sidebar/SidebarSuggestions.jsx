import { Sparkles } from 'lucide-react'

const SidebarSuggestions = () => (
  <div className="flex flex-col gap-0.5 px-3 pt-3">
    <p className="px-4 pb-1.5 text-[11px] font-medium uppercase tracking-[1.3px] text-[#686C72]/80">
      Suggestions
    </p>
    <button
      type="button"
      className="flex items-center gap-3 rounded-full px-4 py-2.5 text-left text-sm font-medium text-[#686C72] hover:bg-[#FDF6F0]/60"
    >
      <Sparkles size={18} strokeWidth={1.7} />
      Activity Log
    </button>
  </div>
)

export default SidebarSuggestions
