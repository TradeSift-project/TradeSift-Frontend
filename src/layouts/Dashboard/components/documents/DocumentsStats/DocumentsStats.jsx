import DocumentStatCard from './DocumentStatCard'
import { DOCUMENT_STATS } from '../../../constants/documentConstants'

const DocumentsStats = ({ stats = DOCUMENT_STATS }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <DocumentStatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}

export default DocumentsStats
