import { BaseEntity, Status } from './common'

export interface Proyecto extends BaseEntity {
  key: string // Ej: "PROJ-001"
  name: string
  description?: string
  status: Status
  startDate?: string
  endDate?: string
  teamMembers: string[] // User IDs
  settings: ProyectoSettings
}

export interface ProyectoSettings {
  requireApproval: boolean
  autoAssignTesters: boolean
  enableIntegrations: boolean
  defaultPriority: 'Crítica' | 'Alta' | 'Media' | 'Baja'
}

export interface ProyectoStats {
  totalCases: number
  totalRuns: number
  totalDefects: number
  passRate: number
  coverage: number
}
