export const mapDashboardSummaryToUI = (backendData) => {
  if (!backendData) return { stats: [], recentDocuments: [], alerts: [] }

  const rawStats = backendData.stats || {}
  
  const stats = [
    { 
      id: 'total_ops', 
      label: 'Total Operations', 
      value: rawStats.totalOperations || 0, 
      trend: '-', 
      isPositive: true 
    },
    { 
      id: 'pending_review', 
      label: 'Pending Review', 
      value: rawStats.pendingReview || 0, 
      trend: '-', 
      isPositive: true 
    },
    { 
      id: 'completed_exports', 
      label: 'Completed Exports', 
      value: rawStats.completedExports || 0, 
      trend: '-', 
      isPositive: true 
    },
    { 
      id: 'success_rate', 
      label: 'System Success Rate', 
      value: rawStats.successRate || 'N/A', 
      trend: '-', 
      isPositive: true 
    }
  ]

  // Recent documents are largely ready to be consumed from backend's mapped format
  const recentDocuments = (backendData.recentDocuments || []).map(doc => ({
    ...doc,
    processedAt: new Date(doc.processedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
  }))

  return {
    stats,
    recentDocuments,
    alerts: backendData.alerts || []
  }
}
