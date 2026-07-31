import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer } from '../../animations/variants'

import ApprovedDataHeader from './components/approvedData/ApprovedDataHeader'
import WorkflowProgress from './components/approvedData/WorkflowProgress'
import ApprovalSummary from './components/approvedData/ApprovalSummary'
import StructuredData from './components/approvedData/StructuredData'
import ERPMappings from './components/approvedData/ERPMappings'
import ExportSection from './components/approvedData/ExportSection'

import {
  mockJobDetails,
  mockWorkflowState,
  mockApprovalSummary,
  mockStructuredDataGroups,
  mockERPMappings,
  mockUnmappedFields
} from './constants/approvedDataConstants'

const ApprovedData = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F87103]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading approved dataset...</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col w-full max-w-[1200px] mx-auto min-h-screen pb-24"
    >
      <ApprovedDataHeader jobDetails={mockJobDetails} />
      <WorkflowProgress steps={mockWorkflowState} />
      
      <div className="mt-4">
        <ApprovalSummary summary={mockApprovalSummary} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        
        {/* Left Column: The Data */}
        <div className="flex-1 min-w-0">
          <StructuredData groups={mockStructuredDataGroups} />
        </div>

        {/* Right Column: Mapping & Export */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col">
          <ERPMappings mappings={mockERPMappings} unmapped={mockUnmappedFields} />
          <ExportSection />
        </div>

      </div>
    </motion.div>
  )
}

export default ApprovedData
