import { useState } from 'react'
import { Edit2, Check, X } from 'lucide-react'

const ExtractionFieldEditor = ({ initialValue, placeholder, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(initialValue)

  const handleSave = () => {
    setIsEditing(false)
    onSave(tempValue)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempValue(initialValue)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 w-full mt-1.5">
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-white border border-neutral-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#0B0D12] focus:outline-none focus:ring-2 focus:ring-[#F87103]/15 focus:border-[#F87103]/50 transition"
          autoFocus
        />
        <button
          type="button"
          onClick={handleSave}
          className="p-2 bg-black text-white hover:bg-neutral-850 transition rounded-lg shrink-0"
          title="Save changes"
        >
          <Check size={12} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="p-2 border border-neutral-200 text-gray-500 hover:bg-neutral-50 transition rounded-lg shrink-0"
          title="Cancel"
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-3 w-full mt-1.5 p-1 rounded-lg hover:bg-neutral-50/50 group transition">
      <span className={`text-xs font-semibold ${initialValue ? 'text-[#0B0D12]' : 'text-gray-400 italic'}`}>
        {initialValue || placeholder || 'Not detected'}
      </span>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-[0.5px] transition px-2 py-1 rounded border border-neutral-200 bg-white"
      >
        <Edit2 size={9} />
        Edit
      </button>
    </div>
  )
}

export default ExtractionFieldEditor
