import { useState, useEffect } from 'react'
import { AlertTriangle, AlertCircle, Save, ArrowLeft, Database, CheckCircle } from 'lucide-react'
import { reviewService } from '../../../../../services/reviewService'
import { MOCK_EXTRACTIONS, MOCK_CROSS_DOC_ISSUES } from '../../../constants/documentExtractionConstants'
import DocumentPreview from '../DocumentPreview'
import ExtractionSection from './ExtractionSection'
import ExtractionSummary from './ExtractionSummary'
import ValidationIssues from '../ValidationIssues'
import StructuredDataPreview from '../StructuredDataPreview'
import { toast } from 'sonner'

const ExtractionReview = ({ documentId = 'DOC-001', onBack, onSave }) => {
  const docData = MOCK_EXTRACTIONS[documentId] || MOCK_EXTRACTIONS['DOC-001']
  const [sections, setSections] = useState([])
  const [validationResult, setValidationResult] = useState(null)
  const [crossDocIssues, setCrossDocIssues] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    
    const fetchExtractionData = async () => {
      try {
        setLoading(true)
        // Note: the backend will eventually return sections and cross-doc issues directly.
        // For now we still fall back to mock constants while calling the placeholder service.
        const res = await reviewService.getExtractionData(documentId)
        
        if (isMounted) {
          if (docData && docData.sections) {
            setSections(JSON.parse(JSON.stringify(docData.sections)))
          }
          const issues = MOCK_CROSS_DOC_ISSUES[documentId] || []
          setCrossDocIssues(JSON.parse(JSON.stringify(issues)))
          setValidationResult(null)
        }
      } catch (err) {
        console.error('Failed to fetch extraction data:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchExtractionData()

    return () => { isMounted = false }
  }, [documentId])

  const handleConfirmAll = () => {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        fields: sec.fields.map((f) => {
          if (!f.value || f.value.trim() === '') {
            return f // Don't verify empty fields
          }
          return {
            ...f,
            status: 'verified',
            confidence: 1.0,
            message: '',
          }
        })
      }))
    )
    setCrossDocIssues([])
    toast.success('All populated fields confirmed!')
  }

  const handleResolveIssue = (issue) => {
    setCrossDocIssues((prev) => prev.filter((i) => i.id !== issue.id))
    toast.success(`Resolved discrepancy: ${issue.type}`)
  }

  const handleFieldChange = (sectionId, fieldId, value) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            fields: sec.fields.map((f) => {
              if (f.id === fieldId) {
                const updated = { ...f, value }
                // Clear warning statuses if value is filled
                if (updated.status === 'missing' && value.trim() !== '') {
                  updated.status = 'needs-review'
                  updated.confidence = 0.70
                  updated.message = 'Manual correction - review recommended'
                } else if (value.trim() !== '') {
                  updated.status = 'verified'
                  updated.confidence = 1.0
                  updated.message = ''
                }
                return updated
              }
              return f
            })
          }
        }
        return sec
      })
    )
  }

  // Calculate statistics dynamically
  let totalFields = 0
  let needReviewFields = 0
  let confidenceSum = 0

  sections.forEach((sec) => {
    sec.fields.forEach((f) => {
      totalFields++
      confidenceSum += f.confidence
      if (f.status === 'needs-review' || f.status === 'missing') {
        needReviewFields++
      }
    })
  })

  const avgConfidence = totalFields > 0 ? Math.round((confidenceSum / totalFields) * 100) : 100

  const handleValidate = () => {
    let missingCount = 0
    let reviewCount = 0

    sections.forEach((sec) => {
      sec.fields.forEach((f) => {
        if (!f.value || f.value.trim() === '') {
          missingCount++
        } else if (f.status === 'needs-review' || f.status === 'missing' || f.status === 'mismatch') {
          reviewCount++
        }
      })
    })

    if (missingCount > 0) {
      const msg = `${missingCount} required fields are empty. Please fill them before validating.`
      setValidationResult({ success: false, message: msg })
      toast.error(msg)
    } else if (reviewCount > 0) {
      const msg = `Validation passed with ${reviewCount} warnings requiring review.`
      setValidationResult({ success: true, warning: true, message: msg })
      toast.warning(msg)
    } else {
      const msg = 'All fields verified. Document validated successfully!'
      setValidationResult({ success: true, warning: false, message: msg })
      toast.success(msg)
    }
  }

  const handleSaveAndMap = () => {
    handleValidate()
    // Open structured data preview modal before exit
    setShowPreview(true)
  }

  if (loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103]"></div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading document extraction data...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-gray-150 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 transition dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <ArrowLeft size={14} className="text-[#0B0D12] dark:text-white" />
          </button>
          <div className="flex flex-col">
            <h2 className="font-geist text-base font-bold text-[#0B0D12] flex items-center gap-2 dark:text-white">
              Review Extraction: <span className="text-gray-500 font-normal dark:text-gray-400">{docData.fileName}</span>
            </h2>
            <p className="text-[10px] text-gray-400">
              Verify values mapped to ERP destination fields
            </p>
          </div>
        </div>

        {/* Action Button Panel */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleConfirmAll}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-neutral-50 dark:bg-neutral-900 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Confirm All
          </button>
          <button
            type="button"
            onClick={handleValidate}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-[#0B0D12] transition hover:bg-neutral-50 dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Validate Document
          </button>
          <button
            type="button"
            onClick={handleSaveAndMap}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition hover:bg-neutral-850 uppercase tracking-wider"
          >
            <Save size={12} />
            Save & Map
          </button>
        </div>
      </div>

      {/* Extraction stats summary block */}
      <ExtractionSummary
        total={totalFields}
        reviewCount={needReviewFields}
        averageConfidence={avgConfidence}
      />

      {/* Validation alert banner */}
      {validationResult && (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl border ${
            validationResult.success
              ? validationResult.warning
                ? 'bg-amber-50/50 border-amber-100 text-amber-800'
                : 'bg-emerald-50/50 border-emerald-100 text-emerald-800'
              : 'bg-rose-50/50 border-rose-100 text-rose-800'
          }`}
        >
          {validationResult.success ? (
            <ShieldCheck size={16} className="shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
          )}
          <div className="flex flex-col gap-0.5 text-xs">
            <span className="font-bold">
              {validationResult.success ? 'Validation Clean' : 'Validation Error'}
            </span>
            <p className="opacity-80">{validationResult.message}</p>
          </div>
        </div>
      )}

      {/* Two Column Layout: Left Preview, Right Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Column: PDF preview panel */}
        <DocumentPreview docName={docData.fileName} type={docData.documentType} />

        {/* Right Column: Editable fields forms */}
        <div className="flex flex-col gap-6 rounded-[24px] border border-[#E5E6E8] bg-white p-5 shadow-sm max-h-[570px] overflow-y-auto dark:bg-neutral-900 dark:border-neutral-800">
          
          {/* Cross-Document Validation Issues Alerts */}
          {crossDocIssues.length > 0 && (
            <div className="pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <ValidationIssues
                issues={crossDocIssues}
                onResolveIssue={handleResolveIssue}
              />
            </div>
          )}

          {sections.map((section) => (
            <ExtractionSection
              key={section.id}
              section={section}
              onFieldChange={handleFieldChange}
            />
          ))}

          {/* ERP Integration Preparations */}
          <div className="border-t border-neutral-100 pt-5 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 dark:border-neutral-800">
            <div className="flex items-center gap-2 text-[10.5px] text-gray-400">
              <Database size={12} className="text-[#F87103]" />
              <span>Target Destination: Operational ERP System</span>
            </div>
            <button
              type="button"
              disabled
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-gray-100 border border-neutral-200 px-5 py-2 text-xs font-bold text-gray-400 cursor-not-allowed uppercase tracking-wider dark:bg-neutral-800 dark:border-neutral-700"
            >
              Map to ERP (Coming Soon)
            </button>
          </div>

        </div>

      </div>

      {/* Structured Operational Data Preview Modal */}
      <StructuredDataPreview
        isOpen={showPreview}
        onClose={() => {
          setShowPreview(false)
          onSave?.(sections)
          onBack?.()
        }}
        documentName={docData.fileName}
        documentType={docData.documentType}
        fields={sections.flatMap((s) => s.fields)}
        onExport={(format) => {
          toast.success(`Successfully exported document schema as ${format.toUpperCase()}!`)
        }}
      />

    </div>
  )
}

const ShieldCheck = ({ size, className }) => (
  <svg width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

export default ExtractionReview
