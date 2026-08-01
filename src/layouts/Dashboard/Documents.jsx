import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DocumentsHeader from './components/documents/DocumentsHeader'
import DocumentsStats from './components/documents/DocumentsStats'
import DocumentsToolbar from './components/documents/DocumentsToolbar'
import DocumentsTable from './components/documents/DocumentsTable'
import DocumentEmptyState from './components/documents/DocumentEmptyState'
import { X, Cpu, RefreshCw, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { documentService } from '../../services/documentService'
import { mapDocumentsToUI } from '../../services/documentMapper'

const Documents = () => {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [opFilter, setOpFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [reviewFilter, setReviewFilter] = useState('All')
  
  const [detailDoc, setDetailDoc] = useState(null)

  const handleDelete = async (id) => {
    try {
      await documentService.deleteDocument(id)
      setDocuments((prev) => prev.filter((d) => d.id !== id))
      setDetailDoc(null)
      toast.success('Document deleted successfully.')
    } catch(err) {
      console.error(err)
      toast.error('Failed to delete document.')
    }
  }

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await documentService.getAllUserDocuments()
      if (res.success) {
        // Handle mapping backend docs to UI docs
        const mappedDocs = mapDocumentsToUI(res.data.documents || [])
        setDocuments(mappedDocs)
      } else {
        throw new Error(res.message || 'Failed to fetch documents')
      }
    } catch(err) {
      console.error(err)
      setError('Unable to load document history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleResetFilters = () => {
    setSearch('')
    setTypeFilter('All')
    setOpFilter('All')
    setStatusFilter('All')
    setReviewFilter('All')
  }

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const name = doc.name || doc.documentName || ''
    const id = doc.id || ''
    const containerNumber = doc.containerNumber || ''
    const billOfLading = doc.billOfLading || ''
    const reference = doc.reference || ''

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      id.toLowerCase().includes(search.toLowerCase()) ||
      containerNumber.toLowerCase().includes(search.toLowerCase()) ||
      billOfLading.toLowerCase().includes(search.toLowerCase()) ||
      reference.toLowerCase().includes(search.toLowerCase())

    const type = doc.type || doc.documentType || ''
    const operation = doc.operation || doc.workflowType || ''
    const pStatus = doc.processingStatus || ''
    const rStatus = doc.reviewStatus || ''

    const matchesType = typeFilter === 'All' || type === typeFilter
    const matchesOp = opFilter === 'All' || operation === opFilter
    const matchesStatus = statusFilter === 'All' || pStatus === statusFilter
    const matchesReview = reviewFilter === 'All' || rStatus === reviewFilter

    return matchesSearch && matchesType && matchesOp && matchesStatus && matchesReview
  })

  // Compute stats based on the real documents array (unfiltered, so it reflects total history)
  const computedStats = [
    { label: 'Total Documents', value: documents.length, status: 'info' },
    { label: 'Processing', value: documents.filter(d => d.processingStatus === 'Processing').length, status: 'primary' },
    { label: 'Needs Review', value: documents.filter(d => d.processingStatus === 'Requires Review').length, status: 'warning' },
    { label: 'Processed', value: documents.filter(d => d.processingStatus === 'Completed').length, status: 'success' },
  ]

  return (
    <div className="flex flex-col gap-6 relative min-h-screen">
      
      {/* Header */}
      <DocumentsHeader />

      {/* Stats */}
      <DocumentsStats stats={computedStats} />

      {/* Toolbar */}
      <DocumentsToolbar
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        opFilter={opFilter}
        onOpFilterChange={setOpFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        reviewFilter={reviewFilter}
        onReviewFilterChange={setReviewFilter}
      />

      {/* Table / Empty State / Error / Loading */}
      {loading ? (
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm flex flex-col items-center justify-center p-12 min-h-[400px] text-gray-400 dark:bg-neutral-900 dark:border-neutral-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103] mb-4"></div>
          <p className="text-sm">Loading document history...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm flex flex-col items-center justify-center p-12 min-h-[400px] text-center dark:bg-neutral-900 dark:border-neutral-800">
          <AlertCircle size={40} className="text-red-400 mb-4" />
          <h3 className="font-bold text-gray-900 mb-1 dark:text-white">Unable to load documents</h3>
          <p className="text-sm text-gray-500 mb-6 dark:text-gray-400">{error}</p>
          <button
            onClick={fetchDocuments}
            className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      ) : filteredDocuments.length > 0 ? (
        <DocumentsTable
          documents={filteredDocuments}
          onReview={(id) => {
            // Find the doc so we can navigate to its operation workspace or review directly
            const doc = filteredDocuments.find(d => d.id === id)
            if (doc && doc.operationId) {
               // Since it's history, we might want to navigate to the review page of the operation
               navigate(`/dashboard/review/${doc.operationId}`)
            }
          }}
          onViewDetails={setDetailDoc}
          onDelete={handleDelete}
        />
      ) : (
        <DocumentEmptyState onReset={handleResetFilters} />
      )}

      {/* Document Details Drawer Panel */}
      {detailDoc && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-white border-l border-neutral-200 shadow-2xl z-40 p-6 flex flex-col justify-between transition-transform duration-300 dark:bg-neutral-900 dark:border-neutral-700">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#F87103]" />
                <h3 className="font-geist text-base font-bold text-gray-900 dark:text-white">Document Information</h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailDoc(null)}
                className="p-1 rounded-full hover:bg-neutral-50 text-gray-400 hover:text-gray-600 transition dark:hover:bg-neutral-800"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span>File Name:</span>
                <span className="text-[#0b0d12] truncate max-w-[220px]">{detailDoc.name}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span>Document Type:</span>
                <span className="text-[#0b0d12]">{detailDoc.type}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span>Operation Flow:</span>
                <span className="text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">{detailDoc.operation}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span>Reference ID:</span>
                <span className="text-[#0b0d12] font-mono">{detailDoc.reference}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span>Upload Time:</span>
                <span className="text-[#0b0d12] font-normal">{detailDoc.uploadedAt}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span>Processing Status:</span>
                <span className="text-[#0b0d12] font-normal">{detailDoc.processingStatus}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span>Review Status:</span>
                <span className="text-[#0b0d12] font-normal">{detailDoc.reviewStatus}</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#686C72] dark:text-gray-400">Associated Cargo Details</span>
                <div className="space-y-3 mt-3">
                  <div className="flex justify-between">
                    <span>Container ID:</span>
                    <span className="text-[#0b0d12] font-mono">{detailDoc.containerNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BL Reference:</span>
                    <span className="text-[#0b0d12] font-mono">{detailDoc.billOfLading || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipper Name:</span>
                    <span className="text-[#0b0d12]">{detailDoc.shipper || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consignee:</span>
                    <span className="text-[#0b0d12]">{detailDoc.consignee || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gross Weight:</span>
                    <span className="text-[#0b0d12]">{detailDoc.weight || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between dark:border-neutral-800">
                <span>AI Confidence Score:</span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={12} />
                  {detailDoc.confidence || '95%'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => {
                // For real data, we route to the Operation's Review page since Documents don't have individual review screens in global scope
                const id = detailDoc.operationId
                setDetailDoc(null)
                if (id) {
                  navigate(`/dashboard/review/${id}`)
                }
              }}
              className="flex-1 rounded-full bg-black py-2.5 text-xs font-bold text-white transition hover:bg-neutral-850 uppercase tracking-wider text-center"
            >
              Review Fields
            </button>
            <button
              type="button"
              onClick={() => setDetailDoc(null)}
              className="flex-1 rounded-full border border-neutral-200 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-neutral-50 uppercase tracking-wider text-center dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Documents
