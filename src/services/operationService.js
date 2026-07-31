import apiClient from './apiClient'

export const createOperation = async (payload) => {
  const response = await apiClient.post('/operations', payload)
  return response.data
}

export const getOperations = async (params = {}) => {
  const response = await apiClient.get('/operations', { params })
  return response.data
}

export const getOperationById = async (id) => {
  const response = await apiClient.get(`/operations/${id}`)
  return response.data
}

export const updateOperation = async (id, payload) => {
  const response = await apiClient.patch(`/operations/${id}`, payload)
  return response.data
}

export const deleteOperation = async (id) => {
  const response = await apiClient.delete(`/operations/${id}`)
  return response.data
}
