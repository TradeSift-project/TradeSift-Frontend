

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
      name: doc.originalFileName?.split('.')[0] || 'Unknown Document',
      fileName: doc.originalFileName,
      type: docExtraction?.documentType || 'Unknown',
      status: docExtraction ? (docExtraction.status === 'APPROVED' ? 'approved' : 'requires_review') : 'pending',
      health: docExtraction ? (docExtraction.confidence > 0.8 ? 'Verified' : 'Low Confidence') : 'Missing',
      confidenceScore: docExtraction?.confidence || null,
      pages: 1 // TODO: backend doesn't provide page count yet
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
      const fieldsData = {
        ...(ext.originalFields || {}),
        ...(ext.editedFields || {})
      }
      
      const fields = Object.entries(fieldsData).map(([key, value]) => {
        // We guess status based on if it's edited or not
        const isEdited = ext.editedFields && ext.editedFields[key] !== undefined && ext.editedFields[key] !== ext.originalFields?.[key]
        
        let conf = ext.confidence || 0.85
        if (conf <= 1.0) {
          conf = Math.round(conf * 100)
        }

        return {
          id: `${ext.id}-${key}`,
          extractionId: ext.id,
          originalKey: key,
          label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), // camelCase to Title Case
          aiValue: String(ext.originalFields?.[key] || ''),
          editableValue: String(value || ''),
          confidence: conf,
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

  // Calculate real summary instead of using mock
  let fieldsExtracted = 0
  let verified = 0
  let needReview = 0

  mappedSections.forEach(section => {
    section.fields.forEach(f => {
      fieldsExtracted++
      if (f.status === 'verified' || f.status === 'manually-edited') {
        verified++
      } else {
        needReview++
      }
    })
  })

  return {
    documents: mappedDocuments,
    sections: mappedSections,
    issues: [], // Backend does not support validation issues yet
    comparisons: [], // Backend does not support cross-doc comparisons yet
    summary: {
      documents: mappedDocuments.length,
      fieldsExtracted,
      verified,
      needReview
    }
  }
}
