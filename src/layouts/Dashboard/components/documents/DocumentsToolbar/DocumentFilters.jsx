import { DOCUMENT_TYPES } from '../../../constants/documentConstants'

const DocumentFilters = ({
  typeFilter,
  onTypeFilterChange,
  opFilter,
  onOpFilterChange,
  statusFilter,
  onStatusFilterChange,
  reviewFilter,
  onReviewFilterChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
      
      {/* Type Filter */}
      <select
        value={typeFilter}
        onChange={(e) => onTypeFilterChange(e.target.value)}
        className="bg-white border border-neutral-200 rounded-full px-3.5 py-2 text-[11px] font-bold text-[#686C72] focus:outline-none focus:ring-2 focus:ring-[#F87103]/10 transition dark:bg-neutral-900 dark:text-gray-400 dark:border-neutral-700"
      >
        <option value="All">All Types</option>
        {DOCUMENT_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Operation Filter */}
      <select
        value={opFilter}
        onChange={(e) => onOpFilterChange(e.target.value)}
        className="bg-white border border-neutral-200 rounded-full px-3.5 py-2 text-[11px] font-bold text-[#686C72] focus:outline-none focus:ring-2 focus:ring-[#F87103]/10 transition dark:bg-neutral-900 dark:text-gray-400 dark:border-neutral-700"
      >
        <option value="All">All Operations</option>
        <option value="Import">Import</option>
        <option value="Export">Export</option>
      </select>

      {/* Processing Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="bg-white border border-neutral-200 rounded-full px-3.5 py-2 text-[11px] font-bold text-[#686C72] focus:outline-none focus:ring-2 focus:ring-[#F87103]/10 transition dark:bg-neutral-900 dark:text-gray-400 dark:border-neutral-700"
      >
        <option value="All">All Processing Status</option>
        <option value="Processing">Processing</option>
        <option value="Completed">Completed</option>
        <option value="Needs Review">Needs Review</option>
        <option value="Failed">Failed</option>
      </select>

      {/* Review Status Filter */}
      <select
        value={reviewFilter}
        onChange={(e) => onReviewFilterChange(e.target.value)}
        className="bg-white border border-neutral-200 rounded-full px-3.5 py-2 text-[11px] font-bold text-[#686C72] focus:outline-none focus:ring-2 focus:ring-[#F87103]/10 transition dark:bg-neutral-900 dark:text-gray-400 dark:border-neutral-700"
      >
        <option value="All">All Review Status</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

    </div>
  )
}

export default DocumentFilters
