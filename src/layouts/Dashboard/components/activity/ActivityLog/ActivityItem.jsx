import { useNavigate } from 'react-router-dom'
import ActivityIcon from './ActivityIcon'

const ActivityItem = ({ activity, isLast }) => {
  const navigate = useNavigate()

  // Format date helper: "10:42 AM" or "31 Jul 2026 · 10:42 AM"
  const formatDate = (dateString) => {
    const d = new Date(dateString)
    const isToday = new Date().toDateString() === d.toDateString()
    
    const timeOpts = { hour: 'numeric', minute: '2-digit', hour12: true }
    const timeStr = d.toLocaleTimeString('en-US', timeOpts)
    
    if (isToday) {
      return timeStr
    }
    
    const dateOpts = { day: 'numeric', month: 'short', year: 'numeric' }
    const dateStr = d.toLocaleDateString('en-GB', dateOpts)
    
    return `${dateStr} · ${timeStr}`
  }

  return (
    <div className="relative flex gap-4 w-full">
      {/* Timeline track */}
      {!isLast && (
        <div className="absolute left-4 top-8 bottom-[-16px] w-[2px] bg-gray-100 -ml-[1px]"></div>
      )}

      {/* Icon */}
      <div className="relative z-10 shrink-0">
        <ActivityIcon type={activity.type} />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex flex-col gap-1 w-full max-w-xl">
          <div className="flex items-start justify-between gap-4">
            <span className="text-sm font-bold text-gray-900">{activity.title}</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {activity.description}
          </p>

          {/* Details / Expanded info */}
          {activity.metadata?.details && Array.isArray(activity.metadata.details) && (
            <div className="mt-3 bg-red-50/50 rounded-xl border border-red-100 p-3 space-y-2">
              {activity.metadata.details.map((detail, idx) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {detail.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Document Link */}
          {activity.metadata?.documentId && activity.metadata?.documentName && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => navigate(`/dashboard/documents/${activity.metadata.documentId}/review`)}
                className="text-sm font-bold text-blue-600 hover:text-blue-700 transition"
              >
                [View Document]
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] font-bold text-gray-400">
              {formatDate(activity.timestamp)}
            </span>
            
            {activity.actor && (
              <>
                <span className="text-[10px] text-gray-300">•</span>
                <span className="text-[11px] font-semibold text-gray-500">
                  {activity.actor.name}
                </span>
                {activity.actor.role && (
                  <span className="text-[11px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                    {activity.actor.role}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityItem
