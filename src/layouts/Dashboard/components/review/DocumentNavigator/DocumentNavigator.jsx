import { FileText, CheckCircle2, AlertTriangle, AlertCircle, Clock } from 'lucide-react'

const DocumentNavigator = ({ documents }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-150 bg-gray-50/50">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Source Documents</h2>
        <p className="text-xs text-gray-500 mt-1">Review extraction health</p>
      </div>
      
      <div className="flex flex-col p-2 gap-1 overflow-y-auto">
        {documents.map((doc) => {
          let Icon = Clock
          let iconColor = 'text-gray-400'
          let bgColor = 'bg-gray-50'
          
          if (doc.health === 'Verified') {
            Icon = CheckCircle2
            iconColor = 'text-emerald-500'
            bgColor = 'bg-emerald-50/50 hover:bg-emerald-50'
          } else if (doc.health === 'Low Confidence') {
            Icon = AlertTriangle
            iconColor = 'text-amber-500'
            bgColor = 'bg-amber-50/50 hover:bg-amber-50'
          } else if (doc.health === 'Missing') {
            Icon = AlertCircle
            iconColor = 'text-rose-500'
            bgColor = 'bg-rose-50/50 hover:bg-rose-50'
          }

          return (
            <div key={doc.id} className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-200 ${bgColor}`}>
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-100 shadow-sm">
                <FileText size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-bold text-gray-900 truncate">{doc.type}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon size={12} className={iconColor} />
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${iconColor.replace('500', '700')}`}>
                    {doc.health}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DocumentNavigator
