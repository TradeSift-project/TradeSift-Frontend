import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer } from '../../animations/variants'
import { FileSearch } from 'lucide-react'

import JobContextHeader from './components/shared/JobContextHeader'
import WorkflowProgress from './components/shared/WorkflowProgress'
import ProcessingSummary from './components/processing/ProcessingSummary'
import ProcessingDocuments from './components/processing/ProcessingDocuments'
import ProcessingIssues from './components/processing/ProcessingIssues'

import { mockUnifiedJob } from './constants/workflowConstants'

const Processing = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setJob({
        ...mockUnifiedJob,
        id: jobId || mockUnifiedJob.id,
        status: 'Processing' // Start by showing processing status for UX
      })
      
      // Simulate moving to "Needs Review" after a few seconds
      setTimeout(() => {
        setJob(prev => ({ ...prev, status: 'Needs Review' }))
      }, 3000)

      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [jobId])

  if (loading || !job) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading processing status...</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 py-2">
        <div className="flex-1">
          <JobContextHeader job={job} backTo="/dashboard" />
        </div>
        {job.status === 'Needs Review' && (
          <button 
            onClick={() => navigate(`/dashboard/review/${job.id}`)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-black rounded-full hover:bg-neutral-800 transition-colors uppercase tracking-wider shadow-sm shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <FileSearch size={16} />
            Review Data
          </button>
        )}
      </div>
      
      <WorkflowProgress steps={job.pipeline} currentStepId="processing" />

      <ProcessingSummary documents={job.processing.documents} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2">
          <ProcessingDocuments documents={job.processing.documents} />
        </div>
        
        <div className="lg:col-span-1">
          <ProcessingIssues issues={job.processing.issues} />
        </div>
      </div>
    </motion.div>
  )
}

export default Processing
