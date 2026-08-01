import apiClient from './apiClient'

export const exportService = {
  // Trigger export of the mapped/approved operation data (e.g., to ERP or Excel).
  exportOperationData: async (operationId, exportType = 'EXCEL') => {
    try {
      if (exportType === 'EXCEL') {
        // Request the Excel file as a blob
        const response = await apiClient.post(`/operations/${operationId}/export`, {}, {
          responseType: 'blob'
        })
        
        // Extract filename from Content-Disposition header if available
        let filename = `TradeSift_Export_${operationId}.xlsx`
        const disposition = response.headers['content-disposition']
        if (disposition && disposition.indexOf('filename=') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
          const matches = filenameRegex.exec(disposition)
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '')
          }
        }
        
        // Create object URL for the blob
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const downloadUrl = window.URL.createObjectURL(blob)
        
        return {
          success: true,
          data: {
            status: 'Completed',
            message: 'Export generated successfully',
            downloadUrl,
            filename
          }
        }
      } else {
        // Future ERP export logic
        throw new Error('Unsupported export type')
      }
    } catch (error) {
      console.error('Export failed:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to export operation data'
      }
    }
  }
}
