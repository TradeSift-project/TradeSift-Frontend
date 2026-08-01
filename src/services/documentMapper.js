export const mapDocumentsToUI = (backendDocuments) => {
  if (!Array.isArray(backendDocuments)) return []

  return backendDocuments.map(doc => {
    // Map Operation Type
    let opTypeStr = 'Unknown'
    if (doc.operation?.operationType === 'GATE_IN') {
      opTypeStr = 'Import Gate-In'
    } else if (doc.operation?.operationType === 'GATE_OUT') {
      opTypeStr = 'Export Gate-Out'
    }

    // Since we don't have Extraction mapping yet in the Global Documents list,
    // we use defaults or derived properties for some UI fields
    const uiProcessingStatus = doc.operation?.status === 'COMPLETED' ? 'Completed' : 
                               doc.operation?.status === 'PROCESSING' ? 'Processing' : 
                               doc.operation?.status === 'REVIEW' ? 'Requires Review' :
                               doc.operation?.status === 'DRAFT' ? 'Pending' : 'Pending'
                               
    const uiReviewStatus = doc.operation?.status === 'COMPLETED' ? 'Verified' : 'Pending'

    return {
      id: doc.id,
      name: doc.originalFileName,
      type: 'Unknown', // Need extraction data for this, default to Unknown for now
      operation: opTypeStr,
      reference: doc.operation?.referenceNo || doc.operation?.id,
      uploadedAt: new Date(doc.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      processingStatus: uiProcessingStatus,
      reviewStatus: uiReviewStatus,
      // Cargo Details not available without Extraction
      containerNumber: null,
      billOfLading: null,
      shipper: null,
      consignee: null,
      weight: null,
      confidence: null,
      operationId: doc.operationId // Keep a reference to the operation id
    }
  })
}
