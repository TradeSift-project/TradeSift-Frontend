import { useState, useRef } from 'react'
import { Upload, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import ProcessingStatus from '../ProcessingStatus'

const DocumentUpload = ({ onDocumentProcessed }) => {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const simulateUpload = (newFile) => {
    const fileId = `DOC-${Math.floor(100000 + Math.random() * 900000)}`
    const fileObject = {
      id: fileId,
      name: newFile.name,
      size: `${(newFile.size / 1024 / 1024).toFixed(2)} MB`,
      progress: 0,
      status: 'Uploading',
    }

    setFiles((prev) => [fileObject, ...prev])

    // Simulate progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === fileId) {
            const updatedFile = { ...f, progress: currentProgress }
            if (currentProgress >= 100) {
              clearInterval(interval)
              updatedFile.status = 'Processing'
              
              // Simulate AI extraction after 2s
              setTimeout(() => {
                const finalStatus = Math.random() > 0.4 ? 'Extracted' : 'Needs Review'

                setFiles((currentFiles) =>
                  currentFiles.map((item) => {
                    if (item.id === fileId) {
                      return {
                        ...item,
                        status: finalStatus,
                      }
                    }
                    return item
                  })
                )

                // Fire callback to parent page to update list if needed
                onDocumentProcessed?.({
                  id: fileId,
                  name: newFile.name,
                  documentName: newFile.name,
                  type: newFile.name.toLowerCase().includes('invoice')
                    ? 'Commercial Invoice'
                    : newFile.name.toLowerCase().includes('packing')
                    ? 'Packing List'
                    : 'Weighment Slip',
                  documentType: newFile.name.toLowerCase().includes('invoice')
                    ? 'Commercial Invoice'
                    : newFile.name.toLowerCase().includes('packing')
                    ? 'Packing List'
                    : 'Weighment Slip',
                  operation: 'Import',
                  workflowType: 'Import',
                  status: finalStatus,
                  uploadedAt: 'Just now',
                  confidence: '90%',
                })

                toast.success(`AI Extraction Complete for ${newFile.name}`)
              }, 2000)
            }
            return updatedFile
          }
          return f
        })
      )
    }, 200)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0]
      simulateUpload(uploadedFile)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0]
      simulateUpload(uploadedFile)
    }
  }

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    toast.info('File removed.')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Upload Drag Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-[24px] p-8 lg:p-12 text-center cursor-pointer transition ${
          dragActive
            ? 'border-[#F87103] bg-[#FDF6F0]/20'
            : 'border-[#E5E6E8] bg-white hover:border-[#F87103]/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.png,.jpg,.jpeg"
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF6F0] text-[#F87103] mb-4">
          <Upload size={24} />
        </div>

        <h3 className="font-geist text-base font-bold text-[#0B0D12]">
          Drag and drop cargo paperwork here
        </h3>
        <p className="text-xs text-[#686C72] mt-1.5 max-w-sm leading-relaxed">
          Supports Commercial Invoices, Packing Lists, Bill of Lading, and Weighment Slips (PDF, PNG, JPG up to 10MB)
        </p>

        <button
          type="button"
          className="mt-6 rounded-full bg-black px-6 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-850 uppercase tracking-wider"
        >
          Browse Files
        </button>
      </div>

      {/* Upload list UI */}
      {files.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
            Uploading & Processing
          </span>

          <div className="flex flex-col gap-4">
            {files.map((file) => (
              <div key={file.id} className="flex flex-col gap-2">
                <ProcessingStatus
                  fileName={file.name}
                  currentStatus={file.status}
                  progress={file.progress}
                />
                <div className="flex justify-end px-2">
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-[0.5px] transition"
                  >
                    <Trash2 size={12} />
                    Cancel Pipeline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentUpload
