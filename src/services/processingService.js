import apiClient from './apiClient'

export const processingService = {
  // Start the AI processing pipeline for the operation's documents.
  startProcessing: async (operationId) => {
    const res = await apiClient.post(`/operations/${operationId}/process`)
    return res.data
  },

  // Fetch the processing status and stages for an operation.
  getProcessingStatus: async (operationId) => {
    const res = await apiClient.get(`/operations/${operationId}/processing-status`)
    return res.data
  }
}
