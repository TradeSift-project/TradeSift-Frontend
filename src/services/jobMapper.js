import { WORKFLOW_PIPELINE } from '../layouts/Dashboard/constants/workflowConstants'

// Maps a backend operation to the job shape used by JobContextHeader / WorkflowProgress
export const mapOperationToJob = (operation, status) => ({
  id: operation.id,
  workflowType: operation.operationType === 'GATE_IN' ? 'Import Gate-In' : 'Export Gate-Out',
  description: operation.notes || operation.referenceNo || 'No reference',
  documentsCount: operation.documents?.length ?? 0,
  status: status ?? operation.status,
  pipeline: WORKFLOW_PIPELINE,
})
