import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { DashboardData, DashboardStats, RecentRun } from '@/types'

export function useDashboardStats(projectId?: string) {
  return useQuery({
    queryKey: ['dashboard', 'stats', projectId],
    queryFn: () => {
      const url = projectId ? `/dashboard/stats?projectId=${projectId}` : '/dashboard/stats'
      return apiClient.get<DashboardStats>(url)
    },
  })
}

export function useRecentRuns(limit: number = 5, projectId?: string) {
  return useQuery({
    queryKey: ['dashboard', 'recent-runs', limit, projectId],
    queryFn: () => {
      const params = new URLSearchParams()
      if (projectId) params.append('projectId', projectId)
      params.append('limit', limit.toString())
      const url = `/dashboard/recent-runs?${params.toString()}`
      return apiClient.get<RecentRun[]>(url)
    },
  })
}

export function useDashboard(projectId?: string) {
  return useQuery({
    queryKey: ['dashboard', projectId],
    queryFn: async () => {
      try {
        const url = projectId ? `/dashboard?projectId=${projectId}` : '/dashboard'
        return await apiClient.get<DashboardData>(url)
      } catch (error: any) {
        // Si el endpoint no existe (404), retornar datos mock para desarrollo
        if (error?.response?.status === 404) {
          console.warn('Dashboard endpoint not found, using mock data')
          return {
            stats: {
              totalCases: 0,
              executedCases: 0,
              passedCases: 0,
              failedCases: 0,
              blockedCases: 0,
              openDefects: 0,
              criticalDefects: 0,
              passRate: 0,
              failRate: 0,
              blockedRate: 0,
            },
            recentRuns: [],
            trends: {
              casesGrowth: 0,
              executionRate: 0,
              defectRate: 0,
            },
          } as DashboardData
        }
        throw error
      }
    },
    retry: (failureCount: number, error: any) => {
      // No reintentar si es 404
      if (error?.response?.status === 404) {
        return false
      }
      return failureCount < 2
    },
  })
}
