import apiClient from './apiClient'

export const processingService = {
  // =====================================================
  // BACKEND INTEGRATION REQUIRED
  // =====================================================
  // Purpose:
  // Start the AI processing pipeline for the operation's documents.
  //
  // Expected frontend data (response):
  // - status (success boolean)
  // - processingJobId (if async) or immediate result
  //
  // Backend developer:
  // Replace this placeholder with the real API.
  // =====================================================
  startProcessing: async (operationId) => {
    console.warn('BACKEND TODO: processingService.startProcessing missing endpoint')
    // return apiClient.post(`/operations/${operationId}/process`)
    
    // MOCK RESPONSE
    return { success: true, message: 'Processing started' }
  },

  // =====================================================
  // BACKEND INTEGRATION REQUIRED
  // =====================================================
  // Purpose:
  // Fetch the processing status and stages for an operation.
  //
  // Expected frontend data (response):
  // - operationStatus (Processing, Needs Review, Completed, Failed)
  // - stages array (e.g., Type Detection, OCR, Extraction) with their statuses
  // - documents array with individual processing progress
  //
  // Backend developer:
  // Replace this placeholder with the real API.
  // =====================================================
  getProcessingStatus: async (operationId) => {
    console.warn('BACKEND TODO: processingService.getProcessingStatus missing endpoint')
    // return apiClient.get(`/operations/${operationId}/processing-status`)
    
    // MOCK RESPONSE
    return {
      success: true,
      data: {
        status: 'Needs Review',
        stages: [
          { name: 'Document Detection', status: 'Completed' },
          { name: 'OCR & Extraction', status: 'Completed' },
          { name: 'Data Normalization', status: 'Completed' },
          { name: 'Business Validation', status: 'Issue Detected' }
        ]
      }
    }
  }
}
