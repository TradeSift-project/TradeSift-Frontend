import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { Check, Edit3, Send, Save } from 'lucide-react'

const ActionBar = ({ onSaveDraft, onRequestReview, onApprove, onExportPreview }) => {
  return (
    <motion.div 
      variants={fadeUp}
      className="sticky bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6 md:py-4 flex flex-col md:flex-row items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] mt-6 dark:bg-neutral-900/95 dark:border-neutral-700"
    >
      <div className="flex items-center gap-3 w-full md:w-auto mb-4 md:mb-0">
        <button
          onClick={onSaveDraft}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm uppercase tracking-wider dark:bg-neutral-900 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          <Save size={14} />
          Save Draft
        </button>
        <button
          onClick={onRequestReview}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full hover:bg-amber-100 transition-colors shadow-sm uppercase tracking-wider"
        >
          <Edit3 size={14} />
          Request Review
        </button>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onExportPreview}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-bold text-[#F87103] bg-[#FDF6F0] border border-[#F87103]/20 rounded-full hover:bg-[#F87103]/10 transition-colors uppercase tracking-wider"
        >
          <Send size={14} />
          Export Preview
        </button>
        <button
          onClick={onApprove}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-black rounded-full hover:bg-neutral-800 transition-colors uppercase tracking-wider shadow-sm"
        >
          <Check size={14} />
          Approve Data
        </button>
      </div>
    </motion.div>
  )
}

export default ActionBar
