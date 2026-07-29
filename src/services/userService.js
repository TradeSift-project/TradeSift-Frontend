import apiClient from './apiClient'

export const getMe = async () => {
  const response = await apiClient.get('/users/me')
  return response.data // Will return the ApiResponse object: { success: true, message: '...', data: user }
}

export const logoutUser = async () => {
  const response = await apiClient.post('/auth/logout')
  return response.data
}
