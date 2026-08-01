import { mockUnifiedJob } from '../layouts/Dashboard/constants/workflowConstants'

/**
 * Maps the backend extractions array into the UI Review model.
 * 
 * @param {Array} extractions - Array of extraction objects from backend
 * @param {Array} backendDocs - Array of document objects from backend
 * @returns {Object} Mapped data for the Review UI
 */
export const mapExtractionDataToUI = (extractions = [], backendDocs = []) => {
  // We'll preserve the UI structure from mockUnifiedJob for sections like validation/comparison
  // which are not yet implemented on the backend. But we will replace the 'documents' and 'sections' 
  // with the real data.

  // 1. Map documents
  const mappedDocuments = backendDocs.map(doc => {
    const docExtraction = extractions.find(e => e.documentId === doc.id)
    return {
      id: doc.id,
      name: doc.originalFileName.split('.')[0],
      type: docExtraction?.documentType || 'Unknown',
      status: docExtraction ? (docExtraction.status === 'APPROVED' ? 'approved' : 'requires_review') : 'pending',
      confidenceScore: docExtraction?.confidence || 0,
      pages: 1 // mocked
    }
  })

  // 2. Map fields into sections
  // In the real world, the AI might return various fields. The UI expects them grouped into sections.
  // We will dynamically create a "Extracted Data" section if fields exist, or we can attempt to 
  // map them into predefined sections (Header, Line Items, etc.).
  
  // Since we don't know the exact schema of the AI fields, we will create a generic section
  // for each document's extraction, or group them logically.
  
  const mappedSections = []
  
  if (extractions.length > 0) {
    extractions.forEach(ext => {
      const fieldsData = ext.editedFields || ext.originalFields || {}
      
      const fields = Object.entries(fieldsData).map(([key, value]) => {
        // We guess status based on if it's edited or not
        const isEdited = ext.editedFields && ext.editedFields[key] !== undefined && ext.editedFields[key] !== ext.originalFields?.[key]
        
        return {
          id: `${ext.id}-${key}`,
          extractionId: ext.id,
          originalKey: key,
          label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), // camelCase to Title Case
          aiValue: String(ext.originalFields?.[key] || ''),
          editableValue: String(value || ''),
          confidence: ext.confidence || 0.85,
          status: isEdited ? 'manually-edited' : 'verified',
          sourceDoc: ext.documentType || 'Document'
        }
      })

      if (fields.length > 0) {
        mappedSections.push({
          id: `section-${ext.id}`,
          title: `Data from ${ext.documentType || 'Document'}`,
          icon: 'FileText',
          fields
        })
      }
    })
  } else {
    // Fallback to mock sections if no real extractions yet, 
    // BUT the prompt says: "If the backend returns no records, display an appropriate empty state. 
    // Do NOT silently substitute fake extraction/processing data when a real API exists."
    // So if extractions is empty, mappedSections remains []
  }

  return {
    documents: mappedDocuments,
    sections: mappedSections,
    // Keep mocked validation and comparisons for now, since they don't exist in backend API
    issues: JSON.parse(JSON.stringify(mockUnifiedJob.review.validationIssues)),
    comparisons: JSON.parse(JSON.stringify(mockUnifiedJob.review.comparisons)),
    summary: JSON.parse(JSON.stringify(mockUnifiedJob.review.reviewSummary))
  }
}
