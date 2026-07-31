import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const ApprovedDataHeader = ({ jobDetails }) => {
  return (
    <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center md:justify-between py-6 border-b border-gray-150 dark:border-neutral-800">
      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard/documents"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          <ArrowLeft size={16} className="text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight dark:text-white">
              {jobDetails.workflowType}
            </h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
              <CheckCircle2 size={12} className="text-emerald-600" />
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{jobDetails.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1 dark:text-gray-400">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Job ID: {jobDetails.id}</span>
            <span>•</span>
            <span>{jobDetails.description}</span>
            <span>•</span>
            <span>{jobDetails.documentsCount} Documents</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 flex gap-3">
        <button className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm dark:bg-neutral-900 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800">
          View Audit Log
        </button>
        <button className="px-6 py-2.5 text-sm font-bold text-white bg-black rounded-full hover:bg-neutral-800 transition-colors uppercase tracking-wider shadow-sm">
          Export Data
        </button>
      </div>
    </motion.div>
  )
}

export default ApprovedDataHeader
