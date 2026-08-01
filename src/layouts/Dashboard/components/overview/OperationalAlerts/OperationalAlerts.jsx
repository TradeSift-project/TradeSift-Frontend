import AlertCard from './AlertCard'
import { ATTENTION_ITEMS } from '../../../constants/dashboardConstants'

const OperationalAlerts = ({ alerts = [], onResolveItem }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 dark:border-neutral-800">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72] dark:text-gray-400">
          Operational Alerts
        </span>
        <span className="text-[10px] text-gray-400">
          {alerts.length} issues need review
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {alerts.length > 0 ? (
          alerts.map((item) => (
            <AlertCard
              key={item.id}
              title={item.title}
              action={item.action}
              type={item.type}
              onResolve={() => onResolveItem?.(item)}
            />
          ))
        ) : (
          <div className="rounded-[16px] border border-gray-100 bg-white p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:bg-neutral-900 dark:border-neutral-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">All caught up!</p>
            <p className="mt-1 text-xs text-gray-400">No operational alerts require your attention.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OperationalAlerts
