import DocumentTableRow from './DocumentTableRow'

const DocumentsTable = ({
  documents,
  onReview,
  onViewDetails,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto rounded-[20px] border border-[#E5E6E8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      <table className="min-w-full divide-y divide-neutral-100 text-left text-xs font-medium text-gray-500">
        <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          <tr>
            <th className="px-6 py-4">Document</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Operation</th>
            <th className="px-6 py-4">Reference</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Uploaded</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 bg-white">
          {documents.map((doc) => (
            <DocumentTableRow
              key={doc.id}
              doc={doc}
              onReview={onReview}
              onViewDetails={onViewDetails}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DocumentsTable
