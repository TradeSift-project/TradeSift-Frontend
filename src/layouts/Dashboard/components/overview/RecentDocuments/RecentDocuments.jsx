import DocumentRow from './DocumentRow'
import { RECENT_DOCUMENTS } from '../../../constants/dashboardConstants'

const RecentDocuments = ({ documents }) => {
  const currentDocuments = documents || []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-[#9CA3AF]">
          Recent Processing Activity
        </span>
      </div>

      <div className="overflow-x-auto rounded-[20px] border border-[#E5E6E8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:bg-neutral-900 dark:border-white/5">
        <table className="min-w-full divide-y divide-neutral-100 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] dark:divide-white/5">
          <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:bg-white/5">
            <tr>
              <th className="px-4 md:px-6 py-4">Document Name</th>
              <th className="px-4 md:px-6 py-4 hidden sm:table-cell">Type</th>
              <th className="px-4 md:px-6 py-4 hidden md:table-cell">Workflow</th>
              <th className="px-4 md:px-6 py-4 hidden lg:table-cell">Processed</th>
              <th className="px-4 md:px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 bg-white dark:bg-neutral-900 dark:divide-white/5">
            {currentDocuments.length > 0 ? (
              currentDocuments.map((doc) => (
                <DocumentRow key={doc.id} {...doc} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-400 dark:text-gray-500">
                  <p className="text-sm">No recent documents</p>
                  <p className="text-xs mt-1">Start an operation to begin processing documents.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentDocuments
