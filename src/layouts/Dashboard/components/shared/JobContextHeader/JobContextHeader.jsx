import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { ArrowLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const JobContextHeader = ({ job, backTo }) => {
  if (!job) return null

  let StatusIcon = Loader2
  let statusColor = 'text-amber-600 bg-amber-50 border-amber-200'
  
  if (job.status === 'Approved' || job.status === 'Completed') {
    StatusIcon = CheckCircle2
    statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200'
  } else if (job.status === 'Needs Review') {
    StatusIcon = AlertCircle
    statusColor = 'text-rose-600 bg-rose-50 border-rose-200'
  } else if (job.status === 'Processing') {
    StatusIcon = Loader2
    statusColor = 'text-blue-600 bg-blue-50 border-blue-200'
  }

  return (
    <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center md:justify-between py-6 border-b border-gray-150">
      <div className="flex items-center gap-4">
        {backTo && (
          <Link 
            to={backTo}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm shrink-0"
          >
            <ArrowLeft size={16} className="text-gray-600" />
          </Link>
        )}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {job.workflowType}
            </h1>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-full ${statusColor}`}>
              <StatusIcon size={12} className={job.status === 'Processing' ? 'animate-spin' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{job.status}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
            <span className="font-semibold text-gray-700">Job ID: {job.id}</span>
            <span className="hidden sm:inline">•</span>
            <span>{job.description}</span>
            <span className="hidden sm:inline">•</span>
            <span>{job.documentsCount} Documents</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default JobContextHeader
