import JobStatusBadge from './JobStatusBadge'
import JobProgress from './JobProgress'
import JobNextStep from './JobNextStep'

const DEFAULT_JOB = {
  title: 'Import — Electronics Components',
  filingId: 'TS-784512',
  updatedText: 'Updated 2 mins ago',
  status: 'In Progress',
  progress: 45,
  nextStep: 'HS Code Intelligence',
}

const RecentJobCard = ({ job = DEFAULT_JOB, onResume }) => {
  const currentJob = job || DEFAULT_JOB

  return (
    <div
      className="flex flex-col rounded-[20px] border border-[#E5E6E8] bg-white p-6 shadow-[0_1px_2px_0_rgba(17,22,31,0.03)]"
      style={{
        background:
          'linear-gradient(155deg, rgba(248, 113, 3, 0.40) -42.31%, rgba(255, 196, 147, 0.40) -17.58%, rgba(255, 255, 255, 0.40) 41.29%), #FFF',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.93px] text-[#686C72]">
          Recent Job
        </span>
        <JobStatusBadge status={currentJob.status} />
      </div>

      <div className="mt-3 flex flex-col gap-0.5">
        <h2 className="font-geist text-xl font-semibold tracking-[-0.3px] text-[#0B0D12]">
          {currentJob.title}
        </h2>
        <p className="font-geist text-xs text-[#686C72]">
          Filing ID · {currentJob.filingId} · {currentJob.updatedText}
        </p>
      </div>

      <div className="mt-5">
        <JobProgress progress={currentJob.progress} />
      </div>

      <div className="mt-5">
        <JobNextStep nextStep={currentJob.nextStep} onResume={onResume} />
      </div>
    </div>
  )
}

export default RecentJobCard
