import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { FileText, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProcessingHeader = ({ job }) => {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard/documents"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Processing Documents</h1>
          <p className="text-sm text-gray-500 mt-1">
            AI is extracting and validating operational data from your uploaded documents.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
        <div className="flex items-center justify-center h-10 w-10 bg-orange-50 text-[#F87103] rounded-lg">
          <FileText size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {job.type} {job.operation}
          </span>
          <span className="text-sm font-semibold text-gray-900">
            Job ID: {job.id}
          </span>
        </div>
        <div className="ml-4 pl-4 border-l border-gray-100 flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Documents
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {job.totalDocuments} processing
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default ProcessingHeader
