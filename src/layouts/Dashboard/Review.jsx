import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer } from '../../animations/variants'
import { toast } from 'sonner'

import JobContextHeader from './components/shared/JobContextHeader'
import WorkflowProgress from './components/shared/WorkflowProgress'
import DocumentNavigator from './components/review/DocumentNavigator'
import StructuredData from './components/review/StructuredData'
import ValidationSummary from './components/review/Validation/ValidationSummary'
import ValidationPanel from './components/review/Validation/ValidationPanel'
import ComparisonPanel from './components/review/Comparison/ComparisonPanel'
import ActionBar from './components/review/ActionBar'

import { mockUnifiedJob } from './constants/workflowConstants'

import { getOperationById } from '../../services/operationService'

const Review = () => {
  const { jobId } = useParams() // Wait, routes uses :documentId for Review, but we will assume it's jobId for unified flow
  const navigate = useNavigate()
  
  const [job, setJob] = useState(null)
  const [documents, setDocuments] = useState([])
  const [sections, setSections] = useState([])
  const [issues, setIssues] = useState([])
  const [comparisons, setComparisons] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

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

        // Merge real backend data with the mock pipeline/documents
        const mergedJob = {
          ...mockUnifiedJob,
          id: backendJob?.id || jobId || mockUnifiedJob.id,
          workflowType: backendJob?.operationType === 'GATE_IN' ? 'Import Gate-In' : 'Export Gate-Out',
          description: backendJob?.notes || backendJob?.referenceNo || 'Electronics Components',
          status: 'Needs Review'
        }

        setJob(mergedJob)
        setDocuments(JSON.parse(JSON.stringify(mergedJob.review.documentsHealth)))
        setSections(JSON.parse(JSON.stringify(mergedJob.review.structuredData)))
        setIssues(JSON.parse(JSON.stringify(mergedJob.review.validationIssues)))
        setComparisons(JSON.parse(JSON.stringify(mergedJob.review.comparisons)))
        setSummary(JSON.parse(JSON.stringify(mergedJob.review.reviewSummary)))

      } catch (err) {
        console.error('Failed to load review context:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchJob()
    return () => { isMounted = false }
  }, [jobId])

  const handleFieldChange = (sectionId, fieldId, value) => {
    setSections(prev => {
      const newSections = [...prev]
      const section = newSections.find(s => s.id === sectionId)
      if (section) {
        const field = section.fields.find(f => f.id === fieldId)
        if (field) {
          field.editableValue = value
          
          if ((field.status === 'requires-review' || field.status === 'empty') && value.trim() !== '') {
            field.status = 'manually-edited' // Upgrade status after manual edit
          } else if (value.trim() !== field.aiValue && field.aiValue !== '') {
            field.status = 'manually-edited'
          }
        }
      }
      return newSections
    })
  }

  const handleApprove = () => {
    toast.success('Structured dataset approved! Proceeding to Export.')
    navigate(`/dashboard/approved-data/${job.id}`)
  }

  const handleSaveDraft = () => {
    toast.success('Validation progress saved as draft.')
  }

  const handleRequestReview = () => {
    toast.warning('Document sent back to processing queue for review.')
    navigate(`/dashboard/processing/${job.id}`)
  }

  const handleExportPreview = () => {
    toast.info('Generating structured JSON/Excel preview...')
  }

  if (loading || !sections.length || !job) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103]"></div>
        <p className="mt-4 text-sm text-gray-500">Consolidating structured dataset...</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col w-full max-w-[1600px] mx-auto min-h-screen pb-24"
    >
      <JobContextHeader job={job} backTo={`/dashboard/processing/${job.id}`} />
      <WorkflowProgress steps={job.pipeline} currentStepId="review" />
      
      <div className="flex flex-col lg:flex-row gap-6 mt-6 flex-1 items-stretch">
        
        {/* Left Panel: Document Navigator */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-6 lg:h-[calc(100vh-200px)]">
          <DocumentNavigator documents={documents} />
        </div>
        
        {/* Center Panel: Final Structured Data */}
        <div className="flex-1 min-w-0 flex flex-col">
          <StructuredData sections={sections} onChange={handleFieldChange} />
        </div>

        {/* Right Panel: Validation & Comparison Widgets */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6 lg:sticky lg:top-6 lg:h-[calc(100vh-200px)] overflow-y-auto pr-1">
          <ValidationSummary summary={summary} />
          <ValidationPanel issues={issues} />
          <ComparisonPanel comparisons={comparisons} />
        </div>
        
      </div>

      <ActionBar 
        onApprove={handleApprove}
        onRequestReview={handleRequestReview}
        onExportPreview={handleExportPreview}
        onSaveDraft={handleSaveDraft}
      />
    </motion.div>
  )
}

export default Review
