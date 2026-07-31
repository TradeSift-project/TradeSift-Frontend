import apiClient from './apiClient'

export const documentService = {
  // Upload documents to an operation
  uploadDocuments: async (operationId, files) => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    
    const response = await apiClient.post(`/operations/${operationId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // List all documents for an operation
  listOperationDocuments: async (operationId) => {
    const response = await apiClient.get(`/operations/${operationId}/documents`)
    return response.data
  },

  // Get a single document by ID
  getDocument: async (documentId) => {
    const response = await apiClient.get(`/documents/${documentId}`)
    return response.data
  },

  // Delete a document
  deleteDocument: async (documentId) => {
    const response = await apiClient.delete(`/documents/${documentId}`)
    return response.data
  },
}
