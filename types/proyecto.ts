import { BaseEntity, Status, Priority } from './common'

export interface Proyecto extends BaseEntity {
  key: string // Ej: "PROJ-001"
  name: string
  description?: string
  status: Status
  startDate?: string
  endDate?: string
  teamMembers: string[] // User IDs
  settings: ProyectoSettings

  // Estadísticas agregadas (calculadas en backend)
  totalCases?: number
  totalRuns?: number
  totalDefects?: number
}

export interface ProyectoSettings {
  requireApproval: boolean
  autoAssignTesters: boolean
  enableIntegrations: boolean
  defaultPriority: Priority
  integrations?: {
    jira?: { enabled: boolean; projectKey: string }
    github?: { enabled: boolean; repo: string }
  }
}

export interface ProyectoStats {
  totalCases: number
  totalRuns: number
  totalDefects: number
  passRate: number
  coverage: number
}

// ===== DTOs para CRUD =====

export interface CreateProyectoDTO {
  name: string
  description?: string
  status?: Status
  startDate?: string
  endDate?: string
  teamMembers?: string[]
  settings?: Partial<ProyectoSettings>
}

export interface UpdateProyectoDTO extends Partial<CreateProyectoDTO> {
  id?: string
}

// ===== Filtros =====

export interface ProyectoFilters {
  search?: string
  status?: Status
  teamMember?: string
  startDate?: string
  endDate?: string
}
