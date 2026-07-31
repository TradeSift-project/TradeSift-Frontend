import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Trash2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { createOperation } from '../../../../../services/operationService'

const DocumentUpload = ({ onDocumentProcessed, operationId }) => {
  const navigate = useNavigate()
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
    const interval = setInterval(async () => {
      currentProgress += 10
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === fileId) {
            return { ...f, progress: currentProgress }
          }
          return f
        })
      )

      if (currentProgress >= 100) {
        clearInterval(interval)
        
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'Completed', progress: 100 } : f))
        
        toast.success(`Upload complete for ${newFile.name}. Starting job...`)
        
        if (operationId) {
          navigate(`/dashboard/processing/${operationId}`)
        } else {
          try {
            const res = await createOperation({
              operationType: 'GATE_IN',
              notes: `Uploaded document: ${newFile.name}`
            })
            
            if (res.success && res.data) {
              navigate(`/dashboard/processing/${res.data.id}`)
            } else {
              toast.error('Failed to initialize job.')
            }
          } catch (err) {
            console.error(err)
            toast.error('Failed to connect to backend.')
          }
        }
      }
    }, 100)
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
        <div className="flex flex-col gap-3 mt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
            Uploading Documents
          </span>

          <div className="flex flex-col gap-3">
            {files.map((file) => (
              <div key={file.id} className="flex flex-col bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-[#FDF6F0] transition-all duration-300"
                  style={{ width: `${file.progress}%` }}
                />
                
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{file.name}</span>
                    <span className="text-xs text-gray-500">{file.size}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold ${file.progress === 100 ? 'text-green-600' : 'text-[#F87103]'}`}>
                      {file.progress}%
                    </span>
                    {file.progress < 100 && (
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    {file.progress === 100 && (
                      <CheckCircle size={16} className="text-green-500" />
                    )}
                  </div>
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
