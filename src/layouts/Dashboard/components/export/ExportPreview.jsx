import { ArrowRight } from 'lucide-react'

const ExportPreview = ({ data }) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-[24px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
        <span className="font-bold text-gray-900 text-sm">Final Export Preview</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm">
          Sample Output
        </span>
      </div>
      
      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr_auto_1fr_1fr] items-center gap-4 px-6 py-3 border-b border-gray-100 bg-neutral-50/50">
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
            Standard Field
          </span>
          <div className="w-[18px]"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
            Target Field
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
            Exported Value
          </span>
        </div>
        
        {data.map(row => (
          <div key={row.id} className="grid grid-cols-[1fr_auto_1fr_1fr] items-center gap-4 px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-neutral-50/50 transition">
            <span className="text-xs font-semibold text-gray-600">
              {row.standardField}
            </span>
            
            <div className="text-gray-300">
              <ArrowRight size={14} />
            </div>
            
            <span className="text-sm font-bold text-gray-900">
              {row.targetField}
            </span>
            
            <span className="text-sm font-mono text-gray-700 bg-gray-50 border border-gray-100 px-2 py-1 rounded w-fit">
              {row.standardValue}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExportPreview
