import { FileText, Download } from 'lucide-react'

const ExcelExport = ({ filename, fieldsCount }) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-[24px] bg-white overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-200">
        <FileText className="text-gray-500" size={20} />
        <span className="font-bold text-gray-900 text-sm">Excel Export Configuration</span>
      </div>
      
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Target Filename</span>
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-gray-700">
            {filename}
            <Download size={14} className="ml-auto text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Format</span>
            <span className="text-sm font-semibold text-gray-900">.XLSX</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Mapped Columns</span>
            <span className="text-sm font-semibold text-gray-900">{fieldsCount} Fields</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Rows</span>
            <span className="text-sm font-semibold text-gray-900">1 Operation</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Schema</span>
            <span className="text-sm font-semibold text-gray-900">Terminal Standard</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExcelExport
