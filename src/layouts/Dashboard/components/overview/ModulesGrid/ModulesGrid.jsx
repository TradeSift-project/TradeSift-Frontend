import { MODULES as MOCK_MODULES } from '../../../constants/dashboardConstants'
import ModuleCard from './ModuleCard'

const ModulesGrid = ({ modules = MOCK_MODULES, onSoonClick }) => {
  const currentModules = modules || MOCK_MODULES
  const activeCount = currentModules.filter(m => m.status === 'active').length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.93px] text-[#686C72]">
          Modules
        </span>
        <span className="text-xs text-[#686C72]">
          {currentModules.length} modules · {activeCount} active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {currentModules.map((mod) => (
          <ModuleCard
            key={mod.name}
            icon={mod.icon}
            name={mod.name}
            description={mod.description}
            status={mod.status}
            onSoonClick={onSoonClick}
          />
        ))}
      </div>
    </div>
  )
}

export default ModulesGrid
