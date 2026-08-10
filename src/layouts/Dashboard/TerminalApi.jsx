import { useParams } from 'react-router-dom'
import DashboardHeader from './components/layout/DashboardHeader'
import TerminalApiCredentials from './components/terminal/TerminalApiCredentials'
import TerminalApiIntegration from './components/terminal/TerminalApiIntegration'

const TerminalApi = () => {
  const { jobId } = useParams()

  return (
    <>
      <DashboardHeader 
        greeting="Terminal API" 
      />
      
      <div className="flex flex-col gap-8 mb-8">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Connect your terminal systems with TradeSift. Manage your integration configuration and view API payloads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <TerminalApiCredentials />
          <TerminalApiIntegration jobId={jobId} />
        </div>
      </div>
    </>
  )
}

export default TerminalApi
