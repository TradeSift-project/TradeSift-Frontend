import DocumentSearch from './DocumentSearch'
import DocumentFilters from './DocumentFilters'

const DocumentsToolbar = ({
  search,
  onSearchChange,
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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50/50 border border-neutral-150 rounded-[20px] p-4.5 dark:bg-neutral-800/30 dark:border-neutral-800">
      <DocumentSearch value={search} onChange={onSearchChange} />
      <DocumentFilters
        typeFilter={typeFilter}
        onTypeFilterChange={onTypeFilterChange}
        opFilter={opFilter}
        onOpFilterChange={onOpFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        reviewFilter={reviewFilter}
        onReviewFilterChange={onReviewFilterChange}
      />
    </div>
  )
}

export default DocumentsToolbar
