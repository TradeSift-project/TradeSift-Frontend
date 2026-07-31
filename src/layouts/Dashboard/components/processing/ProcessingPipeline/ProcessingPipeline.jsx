import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { Check, CircleDot, Circle, AlertCircle, XCircle } from 'lucide-react'

const ProcessingPipeline = ({ stages }) => {
  return (
    <motion.div variants={fadeUp} className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm overflow-x-auto">
      <div className="flex items-center min-w-max">
        {stages.map((stage, idx) => {
          const isLast = idx === stages.length - 1
          const isCompleted = stage.status === 'completed'
          const isProcessing = stage.status === 'processing'
          const isPending = stage.status === 'pending'
          const isReview = stage.status === 'requires_review'
          const isFailed = stage.status === 'failed'

          let Icon = Circle
          let iconColor = 'text-gray-300'
          let bgColor = 'bg-white'
          let borderColor = 'border-gray-200'

          if (isCompleted) {
            Icon = Check
            iconColor = 'text-white'
            bgColor = 'bg-[#10B981]' // emerald-500
            borderColor = 'border-[#10B981]'
          } else if (isProcessing) {
            Icon = CircleDot
            iconColor = 'text-[#F87103]'
            bgColor = 'bg-white'
            borderColor = 'border-[#F87103]'
          } else if (isReview) {
            Icon = AlertCircle
            iconColor = 'text-rose-500'
            bgColor = 'bg-white'
            borderColor = 'border-rose-500'
          } else if (isFailed) {
            Icon = XCircle
            iconColor = 'text-white'
            bgColor = 'bg-rose-500'
            borderColor = 'border-rose-500'
          }

          return (
            <div key={stage.id} className="flex items-center">
              <div className="flex flex-col items-center relative group">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full border-2 ${bgColor} ${borderColor} z-10 transition-colors duration-300`}>
                  <Icon size={18} className={iconColor} />
                  {isProcessing && (
                    <span className="absolute inset-0 rounded-full border-2 border-[#F87103] animate-ping opacity-25"></span>
                  )}
                </div>
                <div className="absolute top-12 whitespace-nowrap text-center">
                  <span className={`text-[11px] font-semibold ${isCompleted || isProcessing ? 'text-gray-900' : 'text-gray-400'}`}>
                    {stage.label}
                  </span>
                </div>
              </div>
              
              {!isLast && (
                <div className="w-16 sm:w-24 md:w-32 h-[2px] mx-2 flex-shrink-0 relative">
                  <div className={`absolute inset-0 rounded ${isCompleted ? 'bg-[#10B981]' : 'bg-gray-100'} transition-colors duration-300`}></div>
                  {isProcessing && (
                    <div className="absolute inset-0 bg-[#F87103] w-1/2 animate-pulse rounded"></div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {/* Spacer to prevent text cutoff due to absolute positioning */}
      <div className="h-10"></div>
    </motion.div>
  )
}

export default ProcessingPipeline
