import apiClient from './apiClient'

export const dashboardService = {
  // Fetch full dashboard summary metrics, recent documents, and alerts
  getDashboardSummary: async () => {
    const response = await apiClient.get('/dashboard/summary')
    return response.data
  }
}
