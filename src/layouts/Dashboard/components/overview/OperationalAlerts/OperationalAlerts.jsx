import AlertCard from './AlertCard'
import { ATTENTION_ITEMS } from '../../../constants/dashboardConstants'

const OperationalAlerts = ({ alerts = ATTENTION_ITEMS, onResolveItem }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
          Operational Alerts
        </span>
        <span className="text-[10px] text-gray-400">
          {alerts.length} issues need review
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {alerts.map((item) => (
          <AlertCard
            key={item.id}
            title={item.title}
            action={item.action}
            type={item.type}
            onResolve={() => onResolveItem?.(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default OperationalAlerts
