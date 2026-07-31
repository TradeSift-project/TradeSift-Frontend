import apiClient from './apiClient'

export const getMe = async () => {
  const response = await apiClient.get('/users/me')
  return response.data // Will return the ApiResponse object: { success: true, message: '...', data: user }
}

export const logoutUser = async () => {
  const response = await apiClient.post('/auth/logout')
  return response.data
}

export const updateUser = async (data) => {
  console.warn('BACKEND TODO: POST/PUT /users/me endpoint missing for profile updates')
  // const response = await apiClient.patch('/users/me', data)
  // return response.data
  
  // Mock response for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: { ...data } })
    }, 1000)
  })
}
