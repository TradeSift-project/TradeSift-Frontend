import { useParams, useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import DocumentUpload from './components/documents/DocumentUpload'
import JobContextHeader from './components/shared/JobContextHeader'
import { getOperationById } from '../../services/operationService'
import { useEffect, useState } from 'react'

const UploadOperation = () => {
  const { operationId } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchJob = async () => {
      try {
        const res = await getOperationById(operationId)
        if (res.success && isMounted) {
          setJob({
            id: res.data.id,
            workflowType: res.data.operationType === 'GATE_IN' ? 'Import Gate-In' : 'Export Gate-Out',
            description: res.data.notes || res.data.referenceNo || 'No reference',
            status: res.data.status
          })
        }
      } catch (err) {
        console.error('Failed to fetch operation:', err)
      }
    }
    fetchJob()
    return () => { isMounted = false }
  }, [operationId])

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12 pt-4">
      {job && (
        <div className="mb-4">
          <JobContextHeader job={job} backTo={`/dashboard/operations/${operationId}`} />
        </div>
      )}
      
      <div className="bg-white rounded-[32px] border border-neutral-150 p-8 shadow-sm">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF6F0] text-[#F87103] shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="font-geist text-xl font-bold text-[#0B0D12]">
              Upload Cargo Documents
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Upload documents for this operation to begin AI extraction.
            </p>
          </div>
        </div>
        
        <DocumentUpload operationId={operationId} />
      </div>
    </div>
  )
}

export default UploadOperation
