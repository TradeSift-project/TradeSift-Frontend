import { CheckCircle2, AlertCircle } from 'lucide-react'

const MappingStatusBadge = ({ status }) => {
  if (status === 'mapped') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded">
        <CheckCircle2 size={12} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Mapped</span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded">
      <AlertCircle size={12} />
      <span className="text-[10px] font-bold uppercase tracking-wider">Needs Mapping</span>
    </div>
  )
}

export default MappingStatusBadge
