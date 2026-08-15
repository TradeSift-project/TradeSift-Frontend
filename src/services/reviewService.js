import apiClient from './apiClient'

export const reviewService = {
  // Fetch normalized extraction data for a document.
  getExtractionData: async (operationId) => {
    const res = await apiClient.get(`/operations/${operationId}/extraction`)
    return res.data
  },

  // Save human corrections to extracted fields.
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
