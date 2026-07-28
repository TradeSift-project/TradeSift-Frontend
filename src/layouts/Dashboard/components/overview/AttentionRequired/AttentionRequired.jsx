import AttentionItem from './AttentionItem'
import { ATTENTION_ITEMS } from '../../../constants/dashboardConstants'

const AttentionRequired = ({ items = ATTENTION_ITEMS, onResolveItem }) => {
  const currentItems = items || ATTENTION_ITEMS

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.93px] text-[#686C72]">
          Action Items Required
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {currentItems.map((item) => (
          <AttentionItem
            key={item.id}
            {...item}
            onResolve={() => onResolveItem?.(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default AttentionRequired
