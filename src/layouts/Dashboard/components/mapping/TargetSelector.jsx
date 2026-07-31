import { Server, Settings2 } from 'lucide-react'

const TargetSelector = ({ systems, selectedSystem, onSelect }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
          Target Integration System
        </span>
      </div>
      
      <div className="flex items-center gap-4 flex-wrap">
        {systems.map(sys => (
          <button
            key={sys.id}
            onClick={() => onSelect(sys.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition ${
              selectedSystem === sys.id 
                ? 'bg-[#FDF6F0] border-[#F87103] text-[#F87103] shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`flex items-center justify-center p-1.5 rounded-lg ${
              selectedSystem === sys.id ? 'bg-white' : 'bg-gray-100'
            }`}>
              <Server size={16} />
            </div>
            <div className="flex flex-col items-start gap-0.5 text-left">
              <span className="text-sm font-bold">{sys.name}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                {sys.type}
              </span>
            </div>
            {selectedSystem === sys.id && (
              <div className="ml-2">
                <Settings2 size={16} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TargetSelector
