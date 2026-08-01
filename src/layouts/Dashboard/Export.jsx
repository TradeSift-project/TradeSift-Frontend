import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../animations/variants'
import { toast } from 'sonner'
import { CheckCircle2, AlertTriangle } from 'lucide-react'

import { mockUnifiedJob } from './constants/workflowConstants'
import { EXPORT_DESTINATIONS, MOCK_EXPORT_DATA } from './constants/exportConstants'
import OperationNotFound from './components/shared/OperationNotFound'
import { getOperationById } from '../../services/operationService'

import JobContextHeader from './components/shared/JobContextHeader'
import ExportReadiness from './components/export/ExportReadiness'
import ExportDestination from './components/export/ExportDestination'
import ApiExport from './components/export/ApiExport'
import ExcelExport from './components/export/ExcelExport'
import ExportPreview from './components/export/ExportPreview'
import ExportActions from './components/export/ExportActions'
import { exportService } from '../../services/exportService'

const Export = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState(null)
  
  const [selectedDestination, setSelectedDestination] = useState(EXPORT_DESTINATIONS[0].id)
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)
  const [exportError, setExportError] = useState(false)
  const [fetchError, setFetchError] = useState(false)

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
            if (isMounted) setFetchError(true)
            return
          }
        } catch (e) {
          if (isMounted) setFetchError(true)
          return
        }

        if (!isMounted) return

        const mergedJob = {
          ...mockUnifiedJob,
          id: backendJob?.id || jobId || mockUnifiedJob.id,
          workflowType: backendJob?.operationType === 'GATE_IN' ? 'Import Gate-In' : 'Export Gate-Out',
          description: backendJob?.notes || backendJob?.referenceNo || 'Electronics Components',
          status: 'Ready for Export'
        }

        setJob(mergedJob)
      } catch (err) {
        console.error('Failed to load export context:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchJob()
    return () => { isMounted = false }
  }, [jobId])

  const handleExport = async () => {
    if (!MOCK_EXPORT_DATA.isReady) {
      toast.error('Cannot export: mapping incomplete.')
      return
    }

    setIsExporting(true)
    setExportError(false)
    toast.loading('Preparing export...', { id: 'export-progress' })
    
    try {
      const res = await exportService.exportOperationData(job.id, 'EXCEL')
      
      if (res.success && res.data?.downloadUrl) {
        toast.loading('Downloading Excel...', { id: 'export-progress' })
        
        // Trigger browser download
        const a = document.createElement('a')
        a.href = res.data.downloadUrl
        a.download = res.data.filename || `TradeSift_Export_${job.id}.xlsx`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        
        // Cleanup URL
        setTimeout(() => window.URL.revokeObjectURL(res.data.downloadUrl), 1000)

        toast.success('Export complete', { id: 'export-progress' })
        setExportComplete(true)
      } else {
        throw new Error(res.message || 'Export failed')
      }
    } catch (err) {
      console.error(err)
      toast.error('Export failed: ' + (err.message || 'Unknown error'), { id: 'export-progress' })
      setExportError(true)
    } finally {
      setIsExporting(false)
    }
  }

  if (fetchError) return <OperationNotFound />

  if (loading || !job) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103]"></div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Preparing export environment...</p>
      </div>
    )
  }

  if (exportComplete) {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-2xl mx-auto text-center"
      >
        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Export Complete</h1>
        <p className="text-lg text-gray-500 mb-8 dark:text-gray-400">
          Structured data for operation <span className="font-mono text-gray-800 dark:text-gray-200">{job.id}</span> has been successfully delivered.
        </p>
        
        <div className="bg-white border border-gray-200 rounded-[24px] p-6 w-full shadow-sm mb-8 text-left dark:bg-neutral-900 dark:border-neutral-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Destination</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {EXPORT_DESTINATIONS.find(d => d.id === selectedDestination)?.name}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Fields Exported</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{MOCK_EXPORT_DATA.summary.fieldsMapped} Fields</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 rounded-full bg-black text-white font-bold text-sm hover:bg-neutral-800 transition shadow-md"
          >
            Return to Dashboard
          </button>
          <button
            onClick={() => setExportComplete(false)}
            className="px-8 py-3 rounded-full border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Export Again
          </button>
        </div>
      </motion.div>
    )
  }

  if (exportError) {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-2xl mx-auto text-center"
      >
        <div className="w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Export Failed</h1>
        <p className="text-lg text-gray-500 mb-8 dark:text-gray-400">
          The destination system could not accept the data for operation <span className="font-mono text-gray-800 dark:text-gray-200">{job.id}</span>.
        </p>
        
        <div className="bg-white border border-gray-200 rounded-[24px] p-6 w-full shadow-sm mb-8 text-left dark:bg-neutral-900 dark:border-neutral-700">
          <p className="text-sm text-gray-700 dark:text-gray-300">Please review the mapping configuration and try again. Ensure all required fields are correctly formatted.</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setExportError(false)}
            className="px-8 py-3 rounded-full bg-black text-white font-bold text-sm hover:bg-neutral-800 transition shadow-md"
          >
            Retry Export
          </button>
          <button
            onClick={() => navigate(`/dashboard/mapping/${job.id}`)}
            className="px-8 py-3 rounded-full border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Review Mapping
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto min-h-screen pb-6"
    >
      <div className="flex flex-col gap-2 border-b border-gray-150 pb-4 dark:border-neutral-800">
        <JobContextHeader 
          job={{ ...job, workflowType: `Export Data - ${job.workflowType}` }} 
          backTo={`/dashboard/mapping/${job.id}`} 
        />
      </div>
      
      <div className="flex flex-col gap-8 pointer-events-auto" style={{ opacity: isExporting ? 0.6 : 1, pointerEvents: isExporting ? 'none' : 'auto' }}>
        <ExportReadiness 
          summary={MOCK_EXPORT_DATA.summary} 
          isReady={MOCK_EXPORT_DATA.isReady} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <ExportDestination 
              destinations={EXPORT_DESTINATIONS}
              selectedDestination={selectedDestination}
              onSelect={setSelectedDestination}
            />
            
            {selectedDestination === 'api-terminal' ? (
              <ApiExport 
                endpoint={MOCK_EXPORT_DATA.apiEndpoint}
                fieldsCount={MOCK_EXPORT_DATA.summary.fieldsMapped}
              />
            ) : (
              <ExcelExport 
                filename={MOCK_EXPORT_DATA.excelFilename}
                fieldsCount={MOCK_EXPORT_DATA.summary.fieldsMapped}
              />
            )}
          </div>
          
          <div className="flex flex-col">
            <ExportPreview data={MOCK_EXPORT_DATA.previewData} />
          </div>
        </div>
      </div>

      {!isExporting && (
        <ExportActions 
          destinationId={selectedDestination}
          onBack={() => navigate(`/dashboard/mapping/${job.id}`)}
          onExport={handleExport}
          isReady={MOCK_EXPORT_DATA.isReady}
        />
      )}
    </motion.div>
  )
}

export default Export
