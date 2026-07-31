import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, PackageOpen } from 'lucide-react'
import { createOperation } from '../../services/operationService'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const NewOperationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    operationType: 'GATE_IN',
    referenceNo: '',
    notes: ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setLoading(true)
    try {
      const payload = {
        operationType: formData.operationType,
      }
      
      if (formData.referenceNo.trim()) {
        payload.referenceNo = formData.referenceNo.trim()
      }
      if (formData.notes.trim()) {
        payload.notes = formData.notes.trim()
      }

      const res = await createOperation(payload)
      
      if (res.success && res.data) {
        toast.success('Operation created successfully')
        onClose()
        navigate(`/dashboard/operations/${res.data.id}`)
      } else {
        throw new Error(res.error?.message || 'Failed to create operation')
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Error communicating with backend')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D12]/40 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF6F0] text-[#F87103]">
                <PackageOpen size={20} />
              </div>
              <div>
                <h3 className="font-geist text-lg font-bold text-[#0B0D12]">New Operation</h3>
                <p className="text-xs text-gray-500">Create a parent workflow container</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition"
              disabled={loading}
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
                Operation Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, operationType: 'GATE_IN' })}
                  className={`p-3 rounded-xl border text-sm font-semibold transition ${
                    formData.operationType === 'GATE_IN' 
                      ? 'border-[#F87103] bg-[#FDF6F0] text-[#F87103]' 
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Import Gate-In
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, operationType: 'GATE_OUT' })}
                  className={`p-3 rounded-xl border text-sm font-semibold transition ${
                    formData.operationType === 'GATE_OUT' 
                      ? 'border-[#F87103] bg-[#FDF6F0] text-[#F87103]' 
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Export Gate-Out
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="referenceNo" className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
                Reference Number (Optional)
              </label>
              <input 
                id="referenceNo"
                type="text"
                placeholder="e.g. IMP-2026-00124"
                value={formData.referenceNo}
                onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#F87103] focus:outline-none focus:ring-1 focus:ring-[#F87103] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes" className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
                Notes (Optional)
              </label>
              <textarea 
                id="notes"
                placeholder="Optional operational notes..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#F87103] focus:outline-none focus:ring-1 focus:ring-[#F87103] transition resize-none custom-scrollbar"
              />
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-50 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-sm font-bold shadow-md hover:bg-neutral-800 transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Operation'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default NewOperationModal
