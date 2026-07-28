import { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle2, Clock, Trash2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

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

          <div className="flex flex-col gap-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-[#E5E6E8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.015)]"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100 text-[#F87103] shrink-0">
                    <FileText size={14} />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#0B0D12]">
                      <span className="truncate">{file.name}</span>
                      <span className="text-[10px] text-gray-400 font-normal shrink-0 ml-2">{file.size}</span>
                    </div>

                    {file.status === 'Uploading' && (
                      <div className="w-full bg-neutral-100 h-1 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-[#F87103] h-full transition-all duration-200"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}

                    {file.status !== 'Uploading' && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9.5px] font-bold uppercase tracking-[0.5px] font-mono text-gray-400">
                          Status:
                        </span>
                        <span
                          className={`text-[9.5px] font-bold uppercase tracking-[0.5px] ${
                            file.status === 'Extracted'
                              ? 'text-emerald-600'
                              : file.status === 'Needs Review'
                              ? 'text-amber-600'
                              : 'text-blue-500 animate-pulse'
                          }`}
                        >
                          {file.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {file.status === 'Processing' && (
                    <Clock size={16} className="text-blue-500 animate-spin" />
                  )}
                  {file.status === 'Extracted' && (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  )}
                  {file.status === 'Needs Review' && (
                    <AlertCircle size={16} className="text-amber-500" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={14} />
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
