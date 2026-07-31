import apiClient from './apiClient'

export const mappingService = {
  // =====================================================
  // BACKEND INTEGRATION REQUIRED
  // =====================================================
  // Purpose:
  // Post approved data to be mapped into the target ERP format.
  //
  // Expected frontend data (response):
  // - mappedFields array (source field -> destination field mapping)
  // - mappingStatus
  // - errors array (if any fields couldn't be mapped)
  //
  // Backend developer:
  // Replace this placeholder with the real API.
  // =====================================================
  getMappingData: async (operationId) => {
    console.warn('BACKEND TODO: mappingService.getMappingData missing endpoint')
    // return apiClient.get(`/operations/${operationId}/mapping`)
    
    // MOCK RESPONSE
    return {
      success: true,
      data: {
        status: 'Mapped',
        mappedFields: [
          { source: 'Gross Weight', target: 'ERP_WEIGHT', value: '12,450 KG' }
        ],
        errors: []
      }
    }
  }
}
