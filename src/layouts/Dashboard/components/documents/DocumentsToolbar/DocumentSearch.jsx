import { Search } from 'lucide-react'

const DocumentSearch = ({ value, onChange }) => {
  return (
    <div className="relative flex-1 min-w-[240px]">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
        <Search size={14} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search documents, containers, BL numbers..."
        className="w-full bg-white border border-neutral-200 rounded-full pl-9.5 pr-4 py-2 text-xs font-semibold text-[#0B0D12] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#F87103]/10 focus:border-[#F87103]/50 transition"
      />
    </div>
  )
}

export default DocumentSearch
