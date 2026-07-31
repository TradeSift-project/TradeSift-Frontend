import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer } from '../../animations/variants'
import { toast } from 'sonner'
import { CheckCircle2 } from 'lucide-react'

import { getOperationById } from '../../services/operationService'
import OperationNotFound from './components/shared/OperationNotFound'
import { mockUnifiedJob } from './constants/workflowConstants'
import { TARGET_SYSTEMS, MOCK_MAPPING_DATA } from './constants/mappingConstants'

import JobContextHeader from './components/shared/JobContextHeader'
import TargetSelector from './components/mapping/TargetSelector'
import MappingSummary from './components/mapping/MappingSummary'
import MappingTable from './components/mapping/MappingTable'
import MappingActions from './components/mapping/MappingActions'

const Mapping = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState(null)
  const [error, setError] = useState(false)
  
  const [selectedSystem, setSelectedSystem] = useState(MOCK_MAPPING_DATA.targetSystem)
  const [mappings, setMappings] = useState(MOCK_MAPPING_DATA.mappings)
  const [summary, setSummary] = useState(MOCK_MAPPING_DATA.summary)

  useEffect(() => {
    let isMounted = true
    const fetchJob = async () => {
      try {
        let backendJob = null
        try {
          const res = await getOperationById(jobId)
          if (res.success) {
            backendJob = res.data
          } else {
            if (isMounted) setError(true)
            return
          }
        } catch (e) {
          if (isMounted) setError(true)
          return
        }

        if (!isMounted) return

        const mergedJob = {
          ...mockUnifiedJob,
          id: backendJob?.id || jobId || mockUnifiedJob.id,
          workflowType: backendJob?.operationType === 'GATE_IN' ? 'Import Gate-In' : 'Export Gate-Out',
          description: backendJob?.notes || backendJob?.referenceNo || 'Electronics Components',
          status: 'Approved' // Shows this has passed review
        }

        setJob(mergedJob)
      } catch (err) {
        console.error('Failed to load mapping context:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchJob()
    return () => { isMounted = false }
  }, [jobId])

  const handleSystemChange = (systemId) => {
    setSelectedSystem(systemId)
    toast.info(`Switched target system to ${TARGET_SYSTEMS.find(s => s.id === systemId)?.name}`)
  }

  const handleSave = () => {
    toast.success('Mapping configuration saved locally.')
  }

  const handleValidate = () => {
    toast.info('Validating mapping rules against target schema...')
  }

  const handleExport = () => {
    navigate(`/dashboard/export/${job.id}`)
  }

  if (error) return <OperationNotFound />

  if (loading || !job) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103]"></div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading terminal mapping schema...</p>
      </div>
    )
  }

  const isReady = summary.requiredRemaining === 0 && summary.invalid === 0

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto min-h-screen pb-6"
    >
      <div className="flex flex-col gap-2 border-b border-gray-150 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider w-fit">
            <CheckCircle2 size={14} />
            Data Approved
          </div>
          <span className="text-gray-400 text-sm">→ Final Preparation</span>
        </div>
        
        <JobContextHeader 
          job={{ ...job, workflowType: `ERP / Terminal Mapping - ${job.workflowType}` }} 
          backTo={`/dashboard/approved-data/${job.id}`} 
        />
      </div>
      
      <div className="flex flex-col gap-8">
        <TargetSelector 
          systems={TARGET_SYSTEMS} 
          selectedSystem={selectedSystem} 
          onSelect={handleSystemChange} 
        />
        
        <MappingSummary summary={summary} />
        
        <MappingTable mappings={mappings} />
      </div>

      <MappingActions 
        onBack={() => navigate(`/dashboard/approved-data/${job.id}`)}
        onSave={handleSave}
        onValidate={handleValidate}
        onExport={handleExport}
        isReady={isReady}
      />
      
    </motion.div>
  )
}

export default Mapping
