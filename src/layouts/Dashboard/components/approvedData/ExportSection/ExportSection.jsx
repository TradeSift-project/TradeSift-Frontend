import { Download, Server, Settings2 } from 'lucide-react'
import ExportButton from './ExportButton'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'

const ExportSection = () => {
  const navigate = useNavigate()
  const { jobId } = useParams()

  const handleExportExcel = () => {
    toast.success('Downloading structured Excel file...')
  }

  const handleExportERP = () => {
    navigate(`/dashboard/mapping/${jobId}`)
  }

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold text-gray-900">Export Options</h2>
        <p className="text-sm text-gray-500 mt-1">Export the approved dataset or push directly to operational systems.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ExportButton 
          icon={Download}
          title="Export to Excel"
          description="Download the fully mapped dataset as a formatted Excel spreadsheet."
          primary={true}
          onClick={handleExportExcel}
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
