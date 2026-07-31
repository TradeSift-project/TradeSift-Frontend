import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Package, FileText, ArrowDownRight, ArrowUpRight, UploadCloud, Play, AlertCircle } from 'lucide-react'
import { getOperationById } from '../../services/operationService'
import { documentService } from '../../services/documentService'
import DocumentsTable from './components/documents/DocumentsTable'
import ActivityLog from './components/activity/ActivityLog/ActivityLog'
import { toast } from 'sonner'

const OperationWorkspace = () => {
  const { operationId } = useParams()
  const navigate = useNavigate()
  
  const [operation, setOperation] = useState(null)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        setLoading(true)
        const [opRes, docRes] = await Promise.all([
          getOperationById(operationId),
          documentService.listOperationDocuments(operationId).catch(() => ({ success: true, data: [] }))
        ])

        if (isMounted) {
          if (opRes.success) {
            setOperation(opRes.data)
            if (docRes.success) {
              const rawDocs = docRes.data?.documents || docRes.data || []
              const mappedDocs = rawDocs.map(d => ({
                id: d.id,
                name: d.originalFileName,
                type: d.mimeType?.includes('pdf') ? 'PDF Document' : 'Image Document',
                operation: opRes.data.operationType === 'GATE_IN' ? 'Import' : 'Export',
                operationId: d.operationId,
                reference: opRes.data.referenceNo,
                uploadedAt: new Date(d.createdAt).toLocaleDateString(),
                processingStatus: d.uploadStatus === 'COMPLETED' ? 'Completed' : (d.uploadStatus === 'FAILED' ? 'Failed' : 'Processing'),
                reviewStatus: 'Pending',
                confidence: null
              }))
              setDocuments(mappedDocs)
            }
          } else {
            setError('Failed to load operation details.')
          }
        }
      } catch (err) {
        console.error(err)
        if (isMounted) setError('Error connecting to backend.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [operationId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103] mb-4"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading operation workspace...</p>
      </div>
    )
  }

  if (error || !operation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Operation Not Found</h2>
        <p className="text-sm text-gray-500 mb-6 dark:text-gray-400">{error || 'The requested operation does not exist.'}</p>
        <button
          onClick={() => navigate('/dashboard/operations')}
          className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-bold hover:bg-neutral-800 transition"
        >
          Back to Operations
        </button>
      </div>
    )
  }

  const isImport = operation.operationType === 'GATE_IN'
  const maxDocuments = 20
  const docCount = documents.length
  
  // Operation Status formatting
  let statusColor = 'bg-gray-100 text-gray-600 border-gray-200'
  if (operation.status === 'PROCESSING') statusColor = 'bg-blue-50 text-blue-700 border-blue-200'
  if (operation.status === 'REVIEW') statusColor = 'bg-orange-50 text-orange-700 border-orange-200'
  if (operation.status === 'COMPLETED') statusColor = 'bg-green-50 text-green-700 border-green-200'
  if (operation.status === 'CANCELLED') statusColor = 'bg-red-50 text-red-700 border-red-200'

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12 pt-4">
      {/* Header Breadcrumb */}
      <div className="flex flex-col gap-1">
        <button 
          onClick={() => navigate('/dashboard/operations')}
          className="text-xs font-bold text-gray-400 hover:text-gray-700 transition uppercase tracking-wider text-left w-fit"
        >
          ← Back to Operations
        </button>
        <h1 className="text-2xl font-bold text-[#0B0D12] dark:text-white">Operation Workspace</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm w-fit dark:bg-neutral-900 dark:border-neutral-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
            activeTab === 'overview'
              ? 'bg-[#FDF6F0] text-[#F87103] shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
            activeTab === 'activity'
              ? 'bg-[#FDF6F0] text-[#F87103] shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          Activity Log
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Operation Summary Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row dark:bg-neutral-900 dark:border-neutral-800">
        {/* Left Side: Summary */}
        <div className="p-8 flex-1 border-b md:border-b-0 md:border-r border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3 mb-6">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold ${
              isImport ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
            }`}>
              {isImport ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
              {isImport ? 'Import Gate-In' : 'Export Gate-Out'}
            </div>
            <div className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${statusColor}`}>
              Status: {operation.status || 'DRAFT'}
            </div>
          </div>
          
          <div className="flex flex-col gap-1 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">Reference Number</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">{operation.referenceNo || 'No reference provided'}</span>
            <span className="text-xs text-gray-400 font-mono mt-1">ID: {operation.id}</span>
          </div>
          
          {operation.notes && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">Notes</span>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50/50 p-3 rounded-xl border border-gray-100 dark:bg-neutral-800/30 dark:text-gray-300 dark:border-neutral-800">
                {operation.notes}
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Actions & Stats */}
        <div className="p-8 w-full md:w-80 flex flex-col justify-center bg-gray-50/30">
          <div className="flex flex-col items-center text-center gap-2 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-[#F87103]">
              <FileText size={28} />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {docCount} <span className="text-lg text-gray-400">/ {maxDocuments}</span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.93px] text-[#686C72] mt-1 dark:text-gray-400">Documents Uploaded</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                if (docCount >= maxDocuments) {
                  toast.error(`Maximum ${maxDocuments} documents reached.`)
                  return
                }
                navigate(`/dashboard/upload/${operation.id}`)
              }}
              disabled={docCount >= maxDocuments}
              className="flex items-center justify-center gap-2 w-full rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-850 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UploadCloud size={16} />
              Add Documents
            </button>

            {docCount > 0 && operation.status === 'DRAFT' && (
              <button
                onClick={() => navigate(`/dashboard/processing/${operation.id}`)}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-[#F87103] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#e06602] shadow-md"
              >
                <Play size={16} />
                Open Processing
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0B0D12] dark:text-white">Operation Documents</h2>
        </div>
        
        {docCount > 0 ? (
          <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <DocumentsTable 
              documents={documents}
              onReview={(id) => navigate(`/dashboard/documents/${id}/review`)}
              onViewDetails={() => toast.info('View details coming soon')}
              onDelete={async (id) => {
                if (window.confirm('Are you sure you want to delete this document?')) {
                  try {
                    await documentService.deleteDocument(id)
                    setDocuments(prev => prev.filter(d => d.id !== id))
                    toast.success('Document deleted successfully.')
                  } catch (err) {
                    toast.error('Failed to delete document.')
                    console.error(err)
                  }
                }
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white rounded-[24px] border border-gray-100 p-12 text-center shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <Package size={40} className="text-gray-300 mb-4" />
            <h3 className="font-bold text-gray-900 mb-1 dark:text-white">No documents yet</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm dark:text-gray-400">
              Upload commercial invoices, packing lists, and weighment slips to begin AI extraction for this operation.
            </p>
            <button
              onClick={() => navigate(`/dashboard/upload/${operation.id}`)}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 shadow-sm dark:bg-neutral-900 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <UploadCloud size={16} />
              Upload First Document
            </button>
          </div>
        )}
      </div>
        </>
      ) : (
        <ActivityLog operationId={operation.id} />
      )}

    </div>
  )
}

export default OperationWorkspace
