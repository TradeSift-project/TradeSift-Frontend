import StatCard from './StatCard'
import { DASHBOARD_STATS } from '../../../constants/dashboardConstants'

const StatsGrid = ({ stats = DASHBOARD_STATS }) => {
  const currentStats = stats || DASHBOARD_STATS

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {currentStats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  )
}

export default StatsGrid
