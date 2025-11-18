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
    queryFn: () => {
      const url = projectId ? `/dashboard?projectId=${projectId}` : '/dashboard'
      return apiClient.get<DashboardData>(url)
    },
  })
}
