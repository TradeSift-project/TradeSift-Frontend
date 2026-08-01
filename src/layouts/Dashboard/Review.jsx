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
import { documentService } from '../../services/documentService'
import { reviewService } from '../../services/reviewService'
import { mapExtractionDataToUI } from '../../services/reviewMapper'
import OperationNotFound from './components/shared/OperationNotFound'

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
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchJob = async () => {
      try {
        let backendJob = null
        let backendDocs = []
        let extractions = []

        try {
          const res = await getOperationById(jobId)
          if (res.success) {
            backendJob = res.data
          } else {
            if (isMounted) setError(true)
            return
          }
        } catch (e) {
          if (isMounted) setError(true)
          return
        }

        try {
          const docRes = await documentService.listOperationDocuments(jobId)
          if (docRes?.data?.documents) {
            backendDocs = docRes.data.documents
          }
        } catch(e) {}

        try {
          const extRes = await reviewService.getExtractionData(jobId)
          if (extRes.success && extRes.data) {
            extractions = Array.isArray(extRes.data) ? extRes.data : [extRes.data]
          }
        } catch(e) {
          console.warn('No extractions found or error fetching extractions', e)
        }

        if (!isMounted) return

        const mergedJob = {
          ...mockUnifiedJob,
          id: backendJob.id,
          workflowType: backendJob.operationType === 'GATE_IN' ? 'Import Gate-In' : 'Export Gate-Out',
          description: backendJob.notes || backendJob.referenceNo || 'No reference',
          status: 'Needs Review',
          extractions // keeping raw extractions in state for save/approve actions
        }

        setJob(mergedJob)
        
        const mappedData = mapExtractionDataToUI(extractions, backendDocs)
        
        setDocuments(mappedData.documents)
        setSections(mappedData.sections)
        setIssues(mappedData.issues)
        setComparisons(mappedData.comparisons)
        setSummary(mappedData.summary)

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

  const handleApprove = async () => {
    try {
      // First save any draft changes
      await handleSaveDraft(false)

      const extractionIds = job.extractions.map(e => e.id)
      for (const id of extractionIds) {
        await reviewService.approveExtractionData(id)
      }
      toast.success('Structured dataset approved! Proceeding to Export.')
      navigate(`/dashboard/export/${job.id}`) // Assuming export follows review
    } catch (err) {
      toast.error('Failed to approve extractions.')
      console.error(err)
    }
  }

  const handleSaveDraft = async (showToast = true) => {
    try {
      // Group fields by extractionId
      const updates = {}
      sections.forEach(section => {
        section.fields.forEach(field => {
          if (field.extractionId && field.status === 'manually-edited') {
            if (!updates[field.extractionId]) updates[field.extractionId] = {}
            updates[field.extractionId][field.originalKey] = field.editableValue
          }
        })
      })

      const promises = Object.entries(updates).map(([extractionId, editedFields]) => {
        return reviewService.updateExtractionData(extractionId, { editedFields })
      })

      if (promises.length > 0) {
        await Promise.all(promises)
      }
      if (showToast) toast.success('Validation progress saved as draft.')
    } catch (err) {
      if (showToast) toast.error('Failed to save draft.')
      console.error(err)
    }
  }

  const handleRequestReview = async () => {
    try {
      // Reject all extractions with a generic reason
      const extractionIds = job.extractions.map(e => e.id)
      for (const id of extractionIds) {
        await reviewService.rejectExtractionData(id, 'Sent back for review')
      }
      toast.warning('Document sent back to processing queue for review.')
      navigate(`/dashboard/processing/${job.id}`)
    } catch (err) {
      toast.error('Failed to request review.')
      console.error(err)
    }
  }

  const handleExportPreview = () => {
    toast.info('Generating structured JSON/Excel preview...')
  }

  if (error) return <OperationNotFound />

  if (loading || !sections.length || !job) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103]"></div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Consolidating structured dataset...</p>
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
