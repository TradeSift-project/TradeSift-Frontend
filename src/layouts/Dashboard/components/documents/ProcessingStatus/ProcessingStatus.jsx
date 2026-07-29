import { FileText } from 'lucide-react'
import ProcessingStep from './ProcessingStep'

const ProcessingStatus = ({ fileName, currentStatus, progress }) => {
  // Determine statuses for steps based on document state
  const getStepStatus = (stepName) => {
    if (currentStatus === 'Failed') {
      return 'error'
    }

    switch (stepName) {
      case 'upload':
        if (currentStatus === 'Uploading') return 'active'
        return 'completed'

      case 'ocr':
        if (currentStatus === 'Uploading') return 'pending'
        if (currentStatus === 'Processing') return 'active'
        return 'completed'

      case 'extract':
        if (currentStatus === 'Uploading' || currentStatus === 'Processing') return 'pending'
        if (currentStatus === 'Extracting') return 'active'
        return 'completed'

      case 'validate':
        if (currentStatus === 'Extracted' || currentStatus === 'Needs Review' || currentStatus === 'Verified') {
          return 'completed'
        }
        if (currentStatus === 'Validating') return 'active'
        return 'pending'

      default:
        return 'pending'
    }
  }

  return (
    <div className="flex flex-col gap-4 p-5 rounded-3xl border border-[#E5E6E8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
      
      {/* File Info Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF6F0] text-[#F87103] shrink-0 border border-[#FDF6F0]">
          <FileText size={18} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <h4 className="font-geist text-sm font-bold text-[#0B0D12] truncate">
            {fileName}
          </h4>
          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-[0.5px]">
            AI Pipeline Execution
          </span>
        </div>
      </div>

      {/* Step Progress Tally */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
        <ProcessingStep
          label="1. Ingest & Upload"
          status={getStepStatus('upload')}
          progress={progress}
        />
        <ProcessingStep
          label="2. AI OCR Parse"
          status={getStepStatus('ocr')}
        />
        <ProcessingStep
          label="3. Field Mapping"
          status={getStepStatus('extract')}
        />
        <ProcessingStep
          label="4. Cross Validate"
          status={getStepStatus('validate')}
        />
      </div>

    </div>
  )
}

export default ProcessingStatus
