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
  getExtractionData: async (operationId) => {
    const res = await apiClient.get(`/operations/${operationId}/extraction`)
    return res.data
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
  updateExtractionData: async (extractionId, payload) => {
    const res = await apiClient.patch(`/extractions/${extractionId}`, payload)
    return res.data
  },

  approveExtractionData: async (extractionId) => {
    const res = await apiClient.post(`/extractions/${extractionId}/approve`)
    return res.data
  },

  rejectExtractionData: async (extractionId, reason) => {
    const res = await apiClient.post(`/extractions/${extractionId}/reject`, { reason })
    return res.data
  }
}
