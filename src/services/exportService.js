import apiClient from './apiClient'

export const exportService = {
  // =====================================================
  // BACKEND INTEGRATION REQUIRED
  // =====================================================
  // Purpose:
  // Trigger export of the mapped/approved operation data (e.g., to ERP or Excel).
  //
  // Expected frontend data (response):
  // - status (Success/Failed)
  // - downloadUrl (if it's an Excel/file export)
  // - message
  //
  // Backend developer:
  // Replace this placeholder with the real API.
  // =====================================================
  exportOperationData: async (operationId, exportType = 'EXCEL') => {
    console.warn('BACKEND TODO: exportService.exportOperationData missing endpoint')
    // return apiClient.post(`/operations/${operationId}/export`, { type: exportType })
    
    // MOCK RESPONSE
    return {
      success: true,
      data: {
        status: 'Completed',
        message: 'Export generated successfully',
        downloadUrl: '#'
      }
    }
  }
}
