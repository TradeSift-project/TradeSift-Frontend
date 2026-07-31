import { Package, FileText, Play, Cpu, AlertTriangle, CheckCircle, UploadCloud, ArrowRightLeft } from 'lucide-react'

const ActivityIcon = ({ type }) => {
  switch (type) {
    case 'OPERATION':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm border border-white">
          <Package size={14} />
        </div>
      )
    case 'DOCUMENT':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-600 shadow-sm border border-white">
          <FileText size={14} />
        </div>
      )
    case 'PROCESSING':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 shadow-sm border border-white">
          <Play size={14} />
        </div>
      )
    case 'AI':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600 shadow-sm border border-white">
          <Cpu size={14} />
        </div>
      )
    case 'VALIDATION':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 shadow-sm border border-white">
          <AlertTriangle size={14} />
        </div>
      )
    case 'REVIEW':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-sm border border-white">
          <CheckCircle size={14} />
        </div>
      )
    case 'EXPORT':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 shadow-sm border border-white">
          <ArrowRightLeft size={14} />
        </div>
      )
    default:
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 shadow-sm border border-white">
          <Package size={14} />
        </div>
      )
  }
}

export default ActivityIcon
