export const mapProcessingStatusToUI = (backendJob, backendDocs) => {
  // Map backend status to UI status
  let uiStatus = 'Processing'
  let uiPipelineStep = 'processing'
  
  if (backendJob) {
    if (backendJob.status === 'COMPLETED') {
      uiStatus = 'Needs Review'
      uiPipelineStep = 'processing' // The pipeline is still considered processing until review is done, or maybe 'review'
    } else if (backendJob.status === 'FAILED') {
      uiStatus = 'Failed'
    } else if (backendJob.status === 'PROCESSING' || backendJob.status === 'QUEUED' || backendJob.status === 'PENDING') {
      uiStatus = 'Processing'
    }
  }

  // Create UI representation for documents
  const mappedDocs = (backendDocs || []).map(doc => {
    let docStatus = 'processing'
    let confidence = null
    let actionRequired = false

    if (backendJob && backendJob.status === 'COMPLETED') {
      docStatus = 'requires_review'
      actionRequired = true
    } else if (backendJob && backendJob.status === 'FAILED') {
      docStatus = 'failed'
    }

    return {
      id: doc.id,
      name: doc.originalFileName.split('.')[0],
      fileName: doc.originalFileName,
      uploadedAt: new Date(doc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: docStatus,
      confidence,
      actionRequired
    }
  })

  const pipeline = [
    { id: 'upload', title: 'Upload', status: 'completed' },
    { id: 'processing', title: 'AI Processing', status: backendJob?.status === 'COMPLETED' ? 'completed' : 'current' },
    { id: 'review', title: 'Human Review', status: backendJob?.status === 'COMPLETED' ? 'current' : 'pending' },
    { id: 'export', title: 'Export', status: 'pending' }
  ]

  return {
    status: uiStatus,
    uiPipelineStep,
    pipeline,
    processing: {
      documents: mappedDocs,
      issues: backendJob?.errorMessage ? [{ id: 'error', message: backendJob.errorMessage, type: 'error' }] : []
    }
  }
}
