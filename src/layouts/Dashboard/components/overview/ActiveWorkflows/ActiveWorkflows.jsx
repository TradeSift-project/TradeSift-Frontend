import { useState, useEffect } from 'react'
import WorkflowCard from './WorkflowCard'
import { getOperations } from '../../../../../services/operationService'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const ActiveWorkflows = () => {
  const [operations, setOperations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const fetchOperations = async () => {
      try {
        const res = await getOperations({ limit: 4 })
        if (isMounted && res.success) {
          setOperations(res.data.operations)
        }
      } catch (err) {
        console.error('Failed to fetch operations:', err)
        if (isMounted) toast.error('Failed to load active workflows.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchOperations()
    
    return () => { isMounted = false }
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
            Active Gate Operations
          </span>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F87103]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
          Active Gate Operations
        </span>
        <span className="text-[10px] text-gray-400">
          {operations.length} active jobs
        </span>
      </div>

      {operations.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-100 rounded-xl text-center">
          <p className="text-sm font-semibold text-gray-600 mb-1">No active operations</p>
          <p className="text-xs text-gray-400">Upload documents to start processing.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {operations.map((op) => (
            <Link key={op.id} to={`/dashboard/processing/${op.id}`}>
              <WorkflowCard 
                id={op.id.split('-')[0]} 
                type={op.operationType === 'GATE_IN' ? 'Import Gate-In' : 'Export Gate-Out'}
                description={op.notes || op.referenceNo || 'No reference'}
                docCount={0}
                stage={op.status === 'DRAFT' ? 'Upload & AI Processing' : op.status}
                status={op.status}
                updatedAt={new Date(op.updatedAt).toLocaleDateString()}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActiveWorkflows
