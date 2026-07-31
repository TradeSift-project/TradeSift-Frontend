import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { FileText, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const statusConfig = {
  completed: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    icon: <CheckCircle2 size={14} className="text-emerald-500" />,
    label: 'Completed'
  },
  processing: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    icon: <Loader2 size={14} className="text-orange-500 animate-spin" />,
    label: 'Processing'
  },
  extraction: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    icon: <Loader2 size={14} className="text-orange-500 animate-spin" />,
    label: 'Extracting Fields'
  },
  requires_review: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    icon: <AlertTriangle size={14} className="text-rose-500" />,
    label: 'Requires Review'
  },
  failed: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: <AlertTriangle size={14} className="text-red-500" />,
    label: 'Failed'
  }
}

const ProcessingDocumentCard = ({ document }) => {
  const config = statusConfig[document.status] || statusConfig.processing
  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200">
          <FileText size={18} className="text-gray-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{document.name}</span>
          <span className="text-xs text-gray-500">{document.fileName} • Uploaded {document.uploadedAt}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0">
        <div className="flex flex-col md:items-end">
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Status</span>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
            {config.icon}
            {config.label}
          </div>
        </div>

        {document.confidence && (
          <div className="flex flex-col md:items-end w-20">
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Confidence</span>
            <span className={`text-sm font-bold ${document.confidence < 80 ? 'text-rose-500' : 'text-emerald-500'}`}>
              {document.confidence}%
            </span>
          </div>
        )}

        <div className="w-28 flex justify-end">
          {document.actionRequired ? (
            <button 
              onClick={() => navigate(`/dashboard/review/${document.id}`)}
              className="text-xs font-bold px-4 py-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              Review
            </button>
          ) : (
            <button className="text-xs font-bold px-4 py-2 bg-gray-100 text-gray-400 rounded-full cursor-not-allowed">
              Review
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const ProcessingDocuments = ({ documents }) => {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider ml-1">Documents in Pipeline</h3>
      <div className="flex flex-col gap-3 bg-white rounded-[24px] border border-gray-200 p-2 shadow-sm">
        {documents.map(doc => (
          <ProcessingDocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </motion.div>
  )
}

export default ProcessingDocuments
