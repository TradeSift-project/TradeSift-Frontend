import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import DataGroup from './DataGroup'

const StructuredData = ({ groups }) => {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-2 mt-8">
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold text-gray-900">Approved Structured Data</h2>
        <p className="text-sm text-gray-500 mt-1">Final normalized values prepared for operational consumption.</p>
      </div>

      <div className="flex flex-col">
        {groups.map((group) => (
          <DataGroup key={group.id} group={group} />
        ))}
      </div>
    </motion.div>
  )
}

export default StructuredData
