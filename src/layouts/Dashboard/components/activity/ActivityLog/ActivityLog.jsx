import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Clock } from 'lucide-react'
import ActivityItem from './ActivityItem'
import { MOCK_ACTIVITIES } from '../../../constants/activityConstants'

// Framer motion variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

const ActivityLog = ({ operationId }) => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    
    const fetchActivity = async () => {
      setLoading(true)
      // Simulate API call for now. Replace with real API when available.
      // e.g. const res = await getOperationActivity(operationId)
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      if (isMounted) {
        // Filter mock activities by conceptually matching operation ID if we wanted,
        // but for mock purposes we just show the constants.
        setActivities(MOCK_ACTIVITIES)
        setLoading(false)
      }
    }

    fetchActivity()
    return () => { isMounted = false }
  }, [operationId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[24px] border border-gray-100 shadow-sm min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103] mb-4"></div>
        <p className="text-sm text-gray-500 font-semibold">Loading activity timeline...</p>
      </div>
    )
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[24px] border border-gray-100 shadow-sm text-center min-h-[300px]">
        <Clock size={40} className="text-gray-300 mb-4" />
        <h3 className="font-bold text-gray-900 mb-1">No activity yet</h3>
        <p className="text-sm text-gray-500 max-w-sm">
          Activity related to this operation will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#F87103]">
          <Activity size={20} />
        </div>
        <div>
          <h2 className="font-geist text-lg font-bold text-[#0B0D12]">Activity Log</h2>
          <p className="text-xs text-gray-500">Operation timeline and audit trail</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="flex flex-col"
      >
        {activities.map((activity, index) => (
          <motion.div key={activity.id} variants={itemVariant}>
            <ActivityItem 
              activity={activity} 
              isLast={index === activities.length - 1} 
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ActivityLog
