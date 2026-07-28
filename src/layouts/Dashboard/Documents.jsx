import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DocumentsHeader from './components/documents/DocumentsHeader'
import DocumentsStats from './components/documents/DocumentsStats'
import DocumentsToolbar from './components/documents/DocumentsToolbar'
import DocumentsTable from './components/documents/DocumentsTable'
import DocumentEmptyState from './components/documents/DocumentEmptyState'
import DocumentUpload from './components/documents/DocumentUpload'
import { MOCK_DOCUMENTS } from './constants/documentConstants'
import { X, Cpu, RefreshCw, FileText, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

const Documents = () => {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [opFilter, setOpFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  
  const [detailDoc, setDetailDoc] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const handleDocumentProcessed = (newDoc) => {
    setDocuments((prev) => [newDoc, ...prev])
  }

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
    toast.success('Document deleted successfully.')
  }

  const handleSaveFields = (updatedFields) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === selectedDocId) {
          return {
            ...doc,
            status: 'Verified',
          }
        }
        return doc
      })
    )
    setSelectedDocId(null)
  }

  const handleResetFilters = () => {
    setSearch('')
    setTypeFilter('All')
    setOpFilter('All')
    setStatusFilter('All')
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
    const status = doc.status || ''

    const matchesType = typeFilter === 'All' || type === typeFilter
    const matchesOp = opFilter === 'All' || operation === opFilter
    const matchesStatus = statusFilter === 'All' || status === statusFilter

    return matchesSearch && matchesType && matchesOp && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6 relative min-h-screen">
      
      {/* Header */}
      <DocumentsHeader onUploadClick={() => setShowUploadModal(true)} />

      {/* Stats */}
      <DocumentsStats />

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
      />

      {/* Table / Empty State */}
      {filteredDocuments.length > 0 ? (
        <DocumentsTable
          documents={filteredDocuments}
          onReview={(id) => navigate(`/dashboard/documents/${id}/review`)}
          onViewDetails={setDetailDoc}
          onDelete={handleDelete}
        />
      ) : (
        <DocumentEmptyState onReset={handleResetFilters} />
      )}

      {/* File Upload Modal Overlay */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] border border-neutral-150 p-6 w-full max-w-xl shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-50 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={16} />
            </button>

            <div className="mb-6">
              <h3 className="font-geist text-lg font-bold text-[#0B0D12]">
                Upload Cargo Paperwork
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Upload shipping invoices, packing lists, and weighment slips to begin AI parsing.
              </p>
            </div>

            <DocumentUpload
              onDocumentProcessed={(newDoc) => {
                handleDocumentProcessed(newDoc)
                setShowUploadModal(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Document Details Drawer Panel */}
      {detailDoc && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-white border-l border-neutral-200 shadow-2xl z-40 p-6 flex flex-col justify-between transition-transform duration-300">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#F87103]" />
                <h3 className="font-geist text-base font-bold text-gray-900">Document Information</h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailDoc(null)}
                className="p-1 rounded-full hover:bg-neutral-50 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-gray-500">
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
              
              <div className="pt-4 mt-4 border-t border-neutral-100">
                <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#686C72]">Associated Cargo Details</span>
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

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <span>AI Confidence Score:</span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={12} />
                  {detailDoc.confidence || '95%'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                const id = detailDoc.id
                setDetailDoc(null)
                navigate(`/dashboard/documents/${id}/review`)
              }}
              className="flex-1 rounded-full bg-black py-2.5 text-xs font-bold text-white transition hover:bg-neutral-850 uppercase tracking-wider text-center"
            >
              Review Fields
            </button>
            <button
              type="button"
              onClick={() => setDetailDoc(null)}
              className="flex-1 rounded-full border border-neutral-200 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-neutral-50 uppercase tracking-wider text-center"
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
