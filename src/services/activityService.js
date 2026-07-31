import apiClient from './apiClient'
import { MOCK_ACTIVITIES } from '../layouts/Dashboard/constants/activityConstants'

export const activityService = {
  // =====================================================
  // BACKEND INTEGRATION REQUIRED
  // =====================================================
  // Purpose:
  // Fetch chronological event logs for a specific operation.
  //
  // Expected frontend data (response):
  // - activities array containing:
  //   - type (OPERATION, DOCUMENT, PROCESSING, AI, VALIDATION, REVIEW, EXPORT)
  //   - title
  //   - description
  //   - timestamp
  //   - actor (name, role)
  //   - metadata (optional details array, documentId)
  //
  // Backend developer:
  // Replace this placeholder with the real API.
  // =====================================================
  getOperationActivity: async (operationId) => {
    console.warn('BACKEND TODO: activityService.getOperationActivity missing endpoint')
    // return apiClient.get(`/operations/${operationId}/activity`)
    
    // MOCK RESPONSE
    return {
      success: true,
      data: MOCK_ACTIVITIES // Use the existing isolated mock constants for now
    }
  }
}
