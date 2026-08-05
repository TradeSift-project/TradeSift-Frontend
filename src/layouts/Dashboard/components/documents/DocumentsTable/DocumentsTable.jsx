import DocumentTableRow from './DocumentTableRow'

const DocumentsTable = ({
  documents,
  onReview,
  onViewDetails,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto rounded-[20px] border border-[#E5E6E8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:bg-neutral-900 dark:border-neutral-800">
      <table className="min-w-full divide-y divide-neutral-100 text-left text-xs font-medium text-gray-500 dark:divide-white/5 dark:text-gray-400">
        <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:bg-neutral-800/50">
          <tr>
            <th className="px-4 md:px-6 py-4">Document</th>
            <th className="px-4 md:px-6 py-4 hidden sm:table-cell">Type</th>
            <th className="px-4 md:px-6 py-4 hidden md:table-cell">Operation</th>
            <th className="px-4 md:px-6 py-4 hidden lg:table-cell">Uploaded</th>
            <th className="px-4 md:px-6 py-4">Processing Status</th>
            <th className="px-4 md:px-6 py-4 hidden sm:table-cell">Review Status</th>
            <th className="px-4 md:px-6 py-4 hidden xl:table-cell">Confidence</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 bg-white dark:divide-white/5 dark:bg-neutral-900">
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
