import { Download, Server } from 'lucide-react'
import ExportButton from './ExportButton'
import { toast } from 'sonner'

const ExportSection = () => {
  const handleExportExcel = () => {
    toast.success('Downloading structured Excel file...')
  }

  const handleExportERP = () => {
    toast.info('ERP API integration is not yet connected.')
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
          icon={Server}
          title="Push to ERP / API"
          description="Automatically push the structured data to the connected operational system."
          status="Ready for Integration"
          onClick={handleExportERP}
        />
      </div>
    </div>
  )
}

export default ExportSection
