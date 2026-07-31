import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer } from '../../animations/variants'

import JobContextHeader from './components/shared/JobContextHeader'
import WorkflowProgress from './components/shared/WorkflowProgress'
import ApprovalSummary from './components/approvedData/ApprovalSummary'
import StructuredData from './components/approvedData/StructuredData'
import ERPMappings from './components/approvedData/ERPMappings'
import ExportSection from './components/approvedData/ExportSection'

import { mockUnifiedJob } from './constants/workflowConstants'

import { useParams } from 'react-router-dom'
import { getOperationById } from '../../services/operationService'

const ApprovedData = () => {
  const { jobId } = useParams()
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchJob = async () => {
      try {
        let backendJob = null
        try {
          const res = await getOperationById(jobId)
          if (res.success) backendJob = res.data
        } catch (e) {
          console.warn('Could not fetch real operation, falling back to mock details')
        }

        if (!isMounted) return

        const mergedJob = {
          ...mockUnifiedJob,
          id: backendJob?.id || jobId || mockUnifiedJob.id,
          workflowType: backendJob?.operationType === 'GATE_IN' ? 'Import Gate-In' : 'Export Gate-Out',
          description: backendJob?.notes || backendJob?.referenceNo || 'Electronics Components',
          status: 'Approved'
        }

        setJob(mergedJob)
      } catch (err) {
        console.error('Failed to load approved data context:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchJob()
    return () => { isMounted = false }
  }, [jobId])

  if (loading || !job) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading approved dataset...</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col w-full max-w-[1200px] mx-auto min-h-screen pb-24"
    >
      <JobContextHeader job={job} backTo={`/dashboard/review/${job.id}`} />
      <WorkflowProgress steps={job.pipeline} currentStepId="approved" />
      
      <div className="mt-4">
        <ApprovalSummary summary={job.approved.summary} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        
        {/* Left Column: The Data */}
        <div className="flex-1 min-w-0">
          <StructuredData groups={job.approved.structuredDataGroups} />
        </div>

        {/* Right Column: Mapping & Export */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col">
          <ERPMappings mappings={job.approved.erpMappings} unmapped={job.approved.unmappedFields} />
          <ExportSection />
        </div>

      </div>
    </motion.div>
  )
}

export default ApprovedData
