import { FileText } from 'lucide-react'
import DocumentStatusBadge from './DocumentStatusBadge'

const DocumentRow = ({ id, documentName, documentType, workflowType, status, uploadedAt }) => {
  return (
    <tr className="hover:bg-neutral-50/50 transition">
      
      {/* File Icon & Name */}
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-[#0B0D12]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100 text-neutral-500">
            <FileText size={14} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-[#0B0D12]">
              {documentName}
            </span>
            <span className="text-[10px] text-gray-400 font-normal">
              {id}
            </span>
          </div>
        </div>
      </td>

      {/* Doc Type */}
      <td className="whitespace-nowrap px-6 py-4 text-xs text-[#686C72]">
        {documentType}
      </td>

      {/* Workflow direction */}
      <td className="whitespace-nowrap px-6 py-4">
        <span
          className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${
            workflowType === 'Import'
              ? 'bg-blue-50 text-blue-600'
              : 'bg-purple-50 text-purple-600'
          }`}
        >
          {workflowType}
        </span>
      </td>

      {/* Uploaded time */}
      <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-400">
        {uploadedAt}
      </td>

      {/* Status Badge */}
      <td className="whitespace-nowrap px-6 py-4 text-right">
        <div className="flex justify-end">
          <DocumentStatusBadge status={status} />
        </div>
      </td>

    </tr>
  )
}

export default DocumentRow
