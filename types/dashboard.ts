export interface DashboardStats {
  totalCases: number
  executedCases: number
  passedCases: number
  failedCases: number
  blockedCases: number
  openDefects: number
  criticalDefects: number
  passRate: number
  failRate: number
  blockedRate: number
}

export interface RecentRun {
  id: string
  key: string
  name: string
  status: string
  passed: number
  failed: number
  blocked: number
  total: number
  date: string
  projectId?: string
}

export interface DashboardData {
  stats: DashboardStats
  recentRuns: RecentRun[]
  trends?: {
    casesGrowth: number // Percentage change vs previous period
    executionRate: number
    defectRate: number
  }
}
