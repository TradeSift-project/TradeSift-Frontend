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

import { getOperationById } from '../../services/operationService'
import { documentService } from '../../services/documentService'
import { processingService } from '../../services/processingService'
import OperationNotFound from './components/shared/OperationNotFound'

const Processing = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchJob = async () => {
      try {
        let backendJob = null
        let backendDocs = []
        // Try to fetch real job if it's a UUID/ID from backend
        try {
          const res = await getOperationById(jobId)
          if (res.success) {
            backendJob = res.data
            // Fetch real documents for this operation
            try {
              const docRes = await documentService.listOperationDocuments(jobId)
              if (docRes && docRes.data && docRes.data.documents) {
                backendDocs = docRes.data.documents
              }
            } catch (err) {
              console.error('Failed to fetch documents for operation', err)
            }
          } else {
            if (isMounted) setError(true)
            return
          }
        } catch (e) {
          if (isMounted) setError(true)
          return
        }

        if (!isMounted) return

        // Format backend documents for the Processing UI
        const mappedDocs = backendDocs.map(doc => ({
          id: doc.id,
          name: doc.originalFileName.split('.')[0],
          fileName: doc.originalFileName,
          uploadedAt: new Date(doc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'processing', // since AI doesn't exist yet, we keep them in processing state
          confidence: null,
          actionRequired: false
        }))

        // Merge real backend data with the mock pipeline/documents
        const mergedJob = {
          ...mockUnifiedJob,
          id: backendJob?.id || jobId || mockUnifiedJob.id,
          workflowType: backendJob?.operationType === 'GATE_IN' ? 'Import Gate-In' : 'Export Gate-Out',
          description: backendJob?.notes || backendJob?.referenceNo || 'Electronics Components',
          status: 'Processing', // Start by showing processing status for UX
          processing: {
            ...mockUnifiedJob.processing,
            // If we have real documents, use them instead of the mock ones
            documents: mappedDocs.length > 0 ? mappedDocs : mockUnifiedJob.processing.documents
          }
        }

        setJob(mergedJob)
        // Simulate merging processing pipeline status from the backend service
        try {
          const processingRes = await processingService.getProcessingStatus(jobId)
          if (processingRes.success) {
            // Apply backend statuses to our pipeline
            // setJob(prev => ({ ...prev, status: processingRes.data.status }))
            
            // For now, simulate delay then set status to Needs Review
            setTimeout(() => {
              if (isMounted) setJob(prev => ({ ...prev, status: processingRes.data.status }))
            }, 3000)
          }
        } catch (err) {
          console.error('Failed to get processing status:', err)
        }

      } catch (err) {
        console.error('Failed to load job context:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchJob()
    return () => { isMounted = false }
  }, [jobId])

  if (error) return <OperationNotFound />

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
