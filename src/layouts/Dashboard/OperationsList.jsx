import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Search, Plus, FileText, ArrowDownRight, ArrowUpRight, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'
import { getOperations } from '../../services/operationService'
import NewOperationModal from '../../components/modal/NewOperationModal'

const OperationsList = () => {
  const navigate = useNavigate()
  const [operations, setOperations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [showNewOpModal, setShowNewOpModal] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchOperations = async () => {
      try {
        setLoading(true)
        const res = await getOperations()
        if (isMounted && res.success) {
          const fetchedData = res.data?.items || res.data
          setOperations(Array.isArray(fetchedData) ? fetchedData : [])
        }
      } catch (err) {
        console.error(err)
        if (isMounted) setError('Failed to load operations. Please try again.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchOperations()
    return () => { isMounted = false }
  }, [])

  const filteredOperations = operations.filter(op => {
    if (statusFilter !== 'ALL' && op.status !== statusFilter) return false
    if (search) {
      const s = search.toLowerCase()
      if (!op.referenceNo?.toLowerCase().includes(s) && !op.id.toLowerCase().includes(s)) {
        return false
      }
    }
    return true
  })

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12 pt-4"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B0D12] tracking-tight">Operations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all your terminal workflows and document sets.</p>
        </div>
        
        <button
          onClick={() => setShowNewOpModal(true)}
          className="flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-850 shadow-md whitespace-nowrap"
        >
          <Plus size={16} />
          New Operation
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search by reference or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50/50 border border-transparent focus:bg-white focus:border-[#F87103] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
          {['ALL', 'DRAFT', 'PROCESSING', 'REVIEW', 'COMPLETED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                statusFilter === status 
                  ? 'bg-[#FDF6F0] text-[#F87103]' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        {loading ? (
          <div className="flex flex-1 flex-col items-center justify-center p-12 text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103] mb-4"></div>
            <p className="text-sm">Loading operations...</p>
          </div>
        ) : error ? (
          <div className="flex flex-1 flex-col items-center justify-center p-12 text-center">
            <AlertCircle size={40} className="text-red-400 mb-4" />
            <h3 className="font-bold text-gray-900 mb-1">Unable to load operations</h3>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        ) : filteredOperations.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-12 text-center">
            <Package size={40} className="text-gray-300 mb-4" />
            <h3 className="font-bold text-gray-900 mb-1">No operations found</h3>
            <p className="text-sm text-gray-500 max-w-sm">
              {search || statusFilter !== 'ALL' 
                ? 'Try adjusting your search or filters to find what you are looking for.' 
                : 'Get started by creating your first operation.'}
            </p>
            {(!search && statusFilter === 'ALL') && (
              <button
                onClick={() => setShowNewOpModal(true)}
                className="mt-6 flex items-center gap-2 rounded-full border border-gray-200 px-6 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Create Operation
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold">Operation Details</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Documents</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOperations.map((op) => {
                  const isImport = op.operationType === 'GATE_IN'
                  
                  // Operation Status formatting
                  let statusColor = 'bg-gray-100 text-gray-600'
                  if (op.status === 'PROCESSING') statusColor = 'bg-blue-50 text-blue-600'
                  if (op.status === 'REVIEW') statusColor = 'bg-orange-50 text-orange-600'
                  if (op.status === 'COMPLETED') statusColor = 'bg-green-50 text-green-600'
                  if (op.status === 'CANCELLED') statusColor = 'bg-red-50 text-red-600'

                  return (
                    <tr 
                      key={op.id} 
                      onClick={() => navigate(`/dashboard/operations/${op.id}`)}
                      className="hover:bg-gray-50/50 transition cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">
                            {op.referenceNo || 'Untitled Operation'}
                          </span>
                          <span className="text-xs text-gray-400 font-mono mt-0.5">
                            {op.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          isImport ? 'bg-blue-50/50 text-blue-700' : 'bg-purple-50/50 text-purple-700'
                        }`}>
                          {isImport ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                          {isImport ? 'Import Gate-In' : 'Export Gate-Out'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FileText size={16} className="text-gray-400" />
                          <span className="font-semibold">{op.documents?.length || 0}</span>
                          <span className="text-xs text-gray-400">/ 20</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
                          {op.status || 'DRAFT'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-500 whitespace-nowrap">
                        {op.updatedAt ? new Date(op.updatedAt).toLocaleDateString() : 'Just now'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <NewOperationModal isOpen={showNewOpModal} onClose={() => setShowNewOpModal(false)} />
    </motion.div>
  )
}

export default OperationsList
