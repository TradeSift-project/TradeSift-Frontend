import { Plus } from 'lucide-react'

const DocumentsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5 dark:border-neutral-800">
      <div className="flex flex-col gap-1">
        <h1 className="font-geist text-2xl font-bold tracking-tight text-[#0B0D12] dark:text-white">
          Documents History
        </h1>
        <p className="text-xs text-[#686C72] leading-normal dark:text-gray-400">
          Search, filter, and inspect historical cargo operational documents from terminal gate operations.
        </p>
      </div>
    </div>
  )
}

export default DocumentsHeader
