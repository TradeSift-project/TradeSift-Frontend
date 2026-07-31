import { Server, FileText } from 'lucide-react'

const ExportDestination = ({ destinations, selectedDestination, onSelect }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 dark:border-neutral-800">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">
          Output Destination
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {destinations.map(dest => {
          const isSelected = selectedDestination === dest.id
          const Icon = dest.icon === 'server' ? Server : FileText
          
          return (
            <button
              key={dest.id}
              onClick={() => onSelect(dest.id)}
              className={`flex items-start gap-4 p-5 rounded-[20px] border text-left transition ${
                isSelected 
                  ? 'bg-[#FDF6F0] border-[#F87103] shadow-[0_2px_12px_rgba(248,113,3,0.08)]'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } dark:border-neutral-700`}
            >
              <div className={`flex items-center justify-center p-2 rounded-xl shrink-0 ${
                isSelected ? 'bg-white text-[#F87103]' : 'bg-gray-100 text-gray-500'
              }`}>
                <Icon size={20} />
              </div>
              <div className="flex flex-col gap-1 mt-0.5">
                <span className={`text-sm font-bold ${isSelected ? 'text-[#F87103]' : 'text-gray-900'}`}>
                  {dest.name}
                </span>
                <span className="text-xs text-gray-500 leading-relaxed dark:text-gray-400">
                  {dest.type === 'API' 
                    ? 'Push structured data directly to the configured terminal operational system via API.'
                    : 'Download the mapped dataset locally as a formatted Excel spreadsheet.'}
                </span>
              </div>
              
              <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                isSelected ? 'border-[#F87103]' : 'border-gray-300'
              }`}>
                {isSelected && <div className="w-2.5 h-2.5 bg-[#F87103] rounded-full" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ExportDestination
