import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer } from '../../animations/variants'

import ProcessingHeader from './components/processing/ProcessingHeader'
import ProcessingSummary from './components/processing/ProcessingSummary'
import ProcessingPipeline from './components/processing/ProcessingPipeline'
import ProcessingDocuments from './components/processing/ProcessingDocuments'
import ProcessingIssues from './components/processing/ProcessingIssues'

import {
  mockProcessingJob,
  mockPipelineStages,
  mockProcessingDocuments,
  mockProcessingIssues
} from './constants/processingConstants'

const Processing = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  
  // In a real app, we would fetch data based on jobId here
  // For now, we just use the mock data
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setJob({
        ...mockProcessingJob,
        id: jobId || mockProcessingJob.id // use param if provided
      })
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
      <ProcessingHeader job={job} />
      
      <ProcessingSummary documents={mockProcessingDocuments} />
      
      <div className="mt-2">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider ml-1 mb-3">Job Pipeline</h3>
        <ProcessingPipeline stages={mockPipelineStages} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2">
          <ProcessingDocuments documents={mockProcessingDocuments} />
        </div>
        
        <div className="lg:col-span-1">
          <ProcessingIssues issues={mockProcessingIssues} />
        </div>
      </div>
    </motion.div>
  )
}

export default Processing
