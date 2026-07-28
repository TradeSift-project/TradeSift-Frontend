import { Search } from 'lucide-react'

const SearchBar = ({ value, onChange, placeholder = 'Search jobs, documents or filing names…' }) => (
  <div className="flex items-center gap-3 rounded-[21px] border border-[#E5E6E8] bg-white px-5 py-4 shadow-[0_1px_2px_0_rgba(17,22,31,0.03),0_1px_1px_0_rgba(17,22,31,0.02)]">
    <Search size={17} strokeWidth={1.6} className="shrink-0 text-[#686C72]" />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full font-geist text-sm text-[#0B0D12] placeholder:text-[#686C72] focus:outline-none"
    />
    <kbd className="rounded border border-[#E5E6E8] px-1.5 py-0.5 font-mono text-xs text-[#686C72]">
      ⌘K
    </kbd>
  </div>
)

export default SearchBar
