import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../../../../animations/variants'
import { UploadCloud, Activity, CheckCircle, AlertCircle } from 'lucide-react'

const statCards = [
  { id: 'uploaded', label: 'Uploaded', icon: UploadCloud, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'processing', label: 'Processing', icon: Activity, color: 'text-[#F87103]', bg: 'bg-orange-50' },
  { id: 'processed', label: 'Processed', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'review', label: 'Requires Review', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
]

const ProcessingSummary = ({ documents }) => {
  const stats = {
    uploaded: documents.length,
    processing: documents.filter(d => d.status === 'processing').length,
    processed: documents.filter(d => d.status === 'completed').length,
    review: documents.filter(d => d.status === 'requires_review').length,
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {statCards.map((card) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.id}
            variants={fadeUp}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
          >
            <div className={`flex items-center justify-center h-12 w-12 rounded-xl ${card.bg} ${card.color}`}>
              <Icon size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 leading-none">
                {stats[card.id]}
              </span>
              <span className="text-sm font-medium text-gray-500 mt-1">
                {card.label}
              </span>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default ProcessingSummary
