import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreVertical, Eye, FileEdit, Download, Trash2 } from 'lucide-react'
import DocumentTypeIcon from './DocumentTypeIcon'
import DocumentStatusBadge from '../../overview/RecentDocuments/DocumentStatusBadge'

const DocumentTableRow = ({
  doc,
  onReview,
  onViewDetails,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const getAction = () => {
    if (doc.processingStatus === 'Processing') return { label: 'View Processing', path: `/dashboard/processing/${doc.operationId}` }
    if (doc.processingStatus === 'Failed') return { label: 'View Error', path: `/dashboard/processing/${doc.operationId}` }
    if (doc.reviewStatus === 'Pending') return { label: 'Review Document', path: `/dashboard/documents/${doc.id}/review` }
    if (doc.reviewStatus === 'Approved') return { label: 'View Approved Data', path: `/dashboard/approved-data/${doc.operationId}` }
    return { label: 'View Details', path: `/dashboard/documents/${doc.id}/review` }
  }
  const action = getAction()

  return (
    <tr className="hover:bg-neutral-50/50 transition dark:hover:bg-neutral-800/50">
      {/* Name & ID */}
      <td className="whitespace-nowrap px-4 md:px-6 py-4 font-semibold text-[#0B0D12] dark:text-white">
        <div className="flex items-center gap-3">
          <DocumentTypeIcon type={doc.type} />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-[#0B0D12] truncate max-w-[200px] dark:text-white">
              {doc.name}
            </span>
            <span className="text-[10px] text-gray-400 font-normal">
              {doc.id}
            </span>
          </div>
        </div>
      </td>

      {/* Doc Type */}
      <td className="whitespace-nowrap px-4 md:px-6 py-4 text-xs text-[#686C72] hidden sm:table-cell dark:text-gray-400">
        {doc.type}
      </td>

      {/* Operation */}
      <td className="whitespace-nowrap px-4 md:px-6 py-4 hidden md:table-cell">
        <div className="flex flex-col gap-1 items-start">
          <span
            className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold w-fit ${
              doc.operation === 'Import'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                : 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400'
            }`}
          >
            {doc.operation}
          </span>
          {doc.operationId ? (
            <button 
              onClick={() => navigate(`/dashboard/operations/${doc.operationId}`)}
              className="text-[10px] text-gray-500 font-mono hover:text-[#F87103] hover:underline text-left transition dark:text-gray-400"
            >
              {doc.reference || doc.operationId}
            </button>
          ) : (
            <span className="text-[10px] text-gray-500 font-mono dark:text-gray-400">
              {doc.reference || 'No Ref'}
            </span>
          )}
        </div>
      </td>

      {/* Uploaded */}
      <td className="whitespace-nowrap px-4 md:px-6 py-4 text-xs text-gray-400 hidden lg:table-cell">
        {doc.uploadedAt}
      </td>

      {/* Processing Status */}
      <td className="whitespace-nowrap px-4 md:px-6 py-4">
        <DocumentStatusBadge status={doc.processingStatus} />
      </td>

      {/* Review Status */}
      <td className="whitespace-nowrap px-4 md:px-6 py-4 hidden sm:table-cell">
        <DocumentStatusBadge status={doc.reviewStatus} />
      </td>

      {/* Confidence */}
      <td className="whitespace-nowrap px-4 md:px-6 py-4 text-xs font-semibold hidden xl:table-cell">
        {doc.confidence ? (
          <span className="text-emerald-600">{doc.confidence}</span>
        ) : (
          <span className="text-gray-300">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="whitespace-nowrap px-4 md:px-6 py-4 text-right relative">
        <div className="flex items-center justify-end gap-1 md:gap-2">
          
          <button
            type="button"
            onClick={() => navigate(action.path)}
            className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-2 md:px-3 py-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5px] text-[#0B0D12] transition hover:bg-neutral-50 hover:border-neutral-300 dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            {action.label}
          </button>

          {/* Action dots menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              <MoreVertical size={14} />
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 mt-1 w-36 rounded-xl border border-neutral-150 bg-white p-1 shadow-lg z-20 text-left dark:bg-neutral-900 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false)
                      onViewDetails(doc)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] font-semibold text-gray-700 hover:bg-neutral-50 dark:text-gray-300 dark:hover:bg-neutral-800"
                  >
                    <Eye size={12} />
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false)
                      onReview(doc.id)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] font-semibold text-gray-700 hover:bg-neutral-50 dark:text-gray-300 dark:hover:bg-neutral-800"
                  >
                    <FileEdit size={12} />
                    Edit Fields
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false)
                      onDelete(doc.id)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </td>
    </tr>
  )
}

export default DocumentTableRow
