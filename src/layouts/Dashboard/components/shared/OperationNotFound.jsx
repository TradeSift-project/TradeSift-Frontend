import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../../../animations/variants'

const OperationNotFound = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-[500px] w-full text-center"
    >
      <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
        <AlertTriangle size={36} />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Operation Not Found</h1>
      <p className="text-sm text-gray-500 mb-8 max-w-md dark:text-gray-400">
        The operation you are looking for does not exist or you do not have permission to access it.
      </p>
      
      <Link
        to="/dashboard"
        className="px-6 py-2.5 rounded-full bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition"
      >
        Return to Dashboard
      </Link>
    </motion.div>
  )
}

export default OperationNotFound
