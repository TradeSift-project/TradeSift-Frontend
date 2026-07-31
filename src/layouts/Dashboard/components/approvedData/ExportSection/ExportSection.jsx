import { Download, Server, Settings2 } from 'lucide-react'
import ExportButton from './ExportButton'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { exportService } from '../../../../../services/exportService'

const ExportSection = () => {
  const navigate = useNavigate()
  const { jobId } = useParams()

  const [isExporting, setIsExporting] = useState(false)

  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      const res = await exportService.exportOperationData(jobId, 'EXCEL')
      if (res.success) {
        toast.success(res.data.message || 'Export generated successfully!')
        if (res.data.downloadUrl && res.data.downloadUrl !== '#') {
          window.open(res.data.downloadUrl, '_blank')
        }
      }
    } catch (err) {
      toast.error('Failed to export data')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportERP = () => {
    navigate(`/dashboard/mapping/${jobId}`)
  }

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Export Options</h2>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">Export the approved dataset or push directly to operational systems.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ExportButton 
          icon={Download}
          title={isExporting ? "Generating..." : "Export to Excel"}
          description="Download the fully mapped dataset as a formatted Excel spreadsheet."
          primary={true}
          onClick={handleExportExcel}
          disabled={isExporting}
        />
        <ExportButton 
          icon={Settings2}
          title="Configure Terminal Mapping"
          description="Map standard fields to terminal-specific operational formats."
          status="Mapping Required"
          onClick={handleExportERP}
        />
      </div>
    </div>
  )
}

export default ExportSection
