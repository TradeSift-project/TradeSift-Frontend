import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { ArrowLeft, Database } from 'lucide-react'
import { Link } from 'react-router-dom'

const ReviewHeader = () => {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-6 border-b border-gray-150 dark:border-neutral-800">
      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard/documents"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          <ArrowLeft size={16} className="text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2 dark:text-white">
            Data Validation & Consolidation
          </h1>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Review the final consolidated ERP dataset prior to export mapping.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="flex items-center justify-center h-10 w-10 bg-orange-50 text-[#F87103] rounded-lg">
          <Database size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Target Workflow
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            ERP Mapping Queue
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default ReviewHeader
