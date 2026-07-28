import { TRADESHIELD_JOBS as MOCK_JOBS } from '../../../constants/dashboardConstants'
import JobCard from './JobCard'

const RecentJobsList = ({ jobs = MOCK_JOBS, onViewAll }) => {
  const currentJobs = jobs || MOCK_JOBS

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.93px] text-[#686C72]">
          Recent Jobs
        </span>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-medium text-[#F87103] hover:underline"
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {currentJobs.map((job, index) => (
          <JobCard
            key={`${job.filingId}-${index}`}
            title={job.title}
            filingId={job.filingId}
            status={job.status}
            updatedText={job.updatedText}
          />
        ))}
      </div>
    </div>
  )
}

export default RecentJobsList
