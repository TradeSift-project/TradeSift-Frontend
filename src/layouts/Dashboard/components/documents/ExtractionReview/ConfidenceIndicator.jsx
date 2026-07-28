import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react'

const ConfidenceIndicator = ({ confidence, status }) => {
  const percentage = Math.round(confidence * 100)

  if (status === 'missing' || confidence === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-rose-100 bg-rose-50 px-2 py-0.5 text-[9.5px] font-bold text-rose-600">
        <AlertCircle size={10} />
        Missing
      </span>
    )
  }

  if (percentage >= 90) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9.5px] font-bold text-emerald-600">
        <CheckCircle2 size={10} />
        {percentage}% High Match
      </span>
    )
  }

  if (percentage >= 70) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[9.5px] font-bold text-amber-600">
        <AlertTriangle size={10} />
        {percentage}% Medium
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-rose-100 bg-rose-50 px-2 py-0.5 text-[9.5px] font-bold text-rose-600">
      <AlertTriangle size={10} />
      {percentage}% Low Match
    </span>
  )
}

export default ConfidenceIndicator
