import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { Check, X, RefreshCw, Save } from 'lucide-react'

const ReviewActions = ({ onApprove, onReject, onReprocess, onSave }) => {
  return (
    <motion.div 
      variants={fadeUp}
      className="sticky bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center gap-3 mb-4 md:mb-0 w-full md:w-auto">
        <button
          onClick={onReject}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-full hover:bg-rose-100 transition-colors"
        >
          <X size={16} />
          Reject
        </button>
        <button
          onClick={onReprocess}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
        >
          <RefreshCw size={16} />
          Reprocess
        </button>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onSave}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-6 py-2.5 text-sm font-bold text-[#F87103] bg-[#FDF6F0] border border-[#F87103]/20 rounded-full hover:bg-[#F87103]/10 transition-colors"
        >
          <Save size={16} />
          Save Changes
        </button>
        <button
          onClick={onApprove}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-6 py-2.5 text-sm font-bold text-white bg-black rounded-full hover:bg-neutral-800 transition-colors uppercase tracking-wider shadow-sm"
        >
          <Check size={16} />
          Approve Extraction
        </button>
      </div>
    </motion.div>
  )
}

export default ReviewActions
