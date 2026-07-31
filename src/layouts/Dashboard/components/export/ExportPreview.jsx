import { ArrowRight } from 'lucide-react'

const ExportPreview = ({ data }) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-[24px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:bg-neutral-900 dark:border-neutral-700">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200 dark:bg-neutral-800/50 dark:border-neutral-700">
        <span className="font-bold text-gray-900 text-sm dark:text-white">Final Export Preview</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm dark:bg-neutral-900 dark:text-gray-400 dark:border-neutral-700">
          Sample Output
        </span>
      </div>
      
      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr_auto_1fr_1fr] items-center gap-4 px-6 py-3 border-b border-gray-100 bg-neutral-50/50 dark:bg-neutral-800/30 dark:border-neutral-800">
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">
            Standard Field
          </span>
          <div className="w-[18px]"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">
            Target Field
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">
            Exported Value
          </span>
        </div>
        
        {data.map(row => (
          <div key={row.id} className="grid grid-cols-[1fr_auto_1fr_1fr] items-center gap-4 px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-neutral-50/50 transition dark:border-neutral-800 dark:hover:bg-neutral-800/50">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              {row.standardField}
            </span>
            
            <div className="text-gray-300">
              <ArrowRight size={14} />
            </div>
            
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {row.targetField}
            </span>
            
            <span className="text-sm font-mono text-gray-700 bg-gray-50 border border-gray-100 px-2 py-1 rounded w-fit dark:bg-neutral-800/50 dark:text-gray-300 dark:border-neutral-800">
              {row.standardValue}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExportPreview
