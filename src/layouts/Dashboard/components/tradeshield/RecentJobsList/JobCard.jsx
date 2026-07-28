import { Link } from 'react-router-dom'
import { Folder, MoreHorizontal } from 'lucide-react'
import JobCardStatusBadge, { STATUS_STYLES } from './JobCardStatusBadge'

const JobCard = ({ title, filingId, status = 'completed', updatedText }) => {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.completed

  return (
    <Link
      to={`/dashboard/tradeshield/${filingId}`}
      className="flex flex-col gap-2.5 rounded-[18px] border border-[#E5E6E8] bg-white p-[18px] transition hover:border-[#F87103]/40"
    >
      <div className="flex items-start gap-2">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.badgeBg}`}>
          <Folder size={20} strokeWidth={1.6} className={style.text} />
        </div>

        <div className="flex flex-1 items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-geist text-base font-semibold text-[#0B0D12]">{title}</h3>
            <p className="font-geist text-xs text-[#686C72]">{filingId}</p>
          </div>
          <button
            type="button"
            aria-label="More options"
            onClick={(event) => event.preventDefault()}
            className="shrink-0 rounded-full p-1.5 text-[#686C72] transition hover:bg-neutral-50"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#E5E6E8] pt-3">
        <JobCardStatusBadge status={status} />
        <span className="font-geist text-xs text-[#686C72]">{updatedText}</span>
      </div>
    </Link>
  )
}

export default JobCard
