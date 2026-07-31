import apiClient from './apiClient'

export const reviewService = {
  // =====================================================
  // BACKEND INTEGRATION REQUIRED
  // =====================================================
  // Purpose:
  // Fetch normalized extraction data and cross-document validation issues for a document.
  //
  // Expected frontend data (response):
  // - fields array (name, value, confidence, coordinates)
  // - validationIssues array (field, message, comparedToDocument)
  // - reviewStatus
  //
  // Backend developer:
  // Replace this placeholder with the real API.
  // =====================================================
  getExtractionData: async (documentId) => {
    console.warn('BACKEND TODO: reviewService.getExtractionData missing endpoint')
    // return apiClient.get(`/documents/${documentId}/extraction`)
    
    // MOCK RESPONSE
    return {
      success: true,
      data: {
        fields: [
          { name: 'Gross Weight', value: '12,450 KG', confidence: 0.94, status: 'Needs Review' },
          { name: 'Shipper', value: 'Global Logistics LLC', confidence: 0.99, status: 'Approved' }
        ],
        validationIssues: [
          { field: 'Gross Weight', message: 'Weight mismatch compared to Packing List (12,800 KG)' }
        ]
      }
    }
  },

  // =====================================================
  // BACKEND INTEGRATION REQUIRED
  // =====================================================
  // Purpose:
  // Save human corrections to extracted fields and approve the document data.
  //
  // Expected frontend data (request payload):
  // - updated fields array
  // - approval status
  //
  // Expected frontend data (response):
  // - success boolean
  //
  // Backend developer:
  // Replace this placeholder with the real API.
  // =====================================================
  updateExtractionData: async (documentId, payload) => {
    console.warn('BACKEND TODO: reviewService.updateExtractionData missing endpoint')
    // return apiClient.patch(`/documents/${documentId}/extraction`, payload)
    
    // MOCK RESPONSE
    return { success: true, message: 'Data updated and approved successfully' }
  }
}
