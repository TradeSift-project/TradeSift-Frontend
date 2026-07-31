import { FileText } from 'lucide-react'

const SourceDocumentBadge = ({ sourceName }) => {
  if (!sourceName) return null
  
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 border border-gray-150 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-default" title={`Source Document: ${sourceName}`}>
      <FileText size={10} />
      <span className="text-[9px] font-semibold uppercase tracking-wider truncate max-w-[120px]">
        {sourceName}
      </span>
    </div>
  )
}

export default SourceDocumentBadge
