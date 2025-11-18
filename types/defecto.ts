import { BaseEntity, Priority, Attachment } from './common'

export type DefectoSeverity = 'Crítica' | 'Alta' | 'Media' | 'Baja'
export type DefectoStatus = 'Abierto' | 'En Progreso' | 'Resuelto' | 'Cerrado' | 'Reabierto'
export type DefectoTipo = 'Bug' | 'Defecto' | 'Regresión' | 'Mejora'
export type ExternalSystem = 'Jira' | 'Azure DevOps' | 'GitHub'

export interface Defecto extends BaseEntity {
  projectId: string
  key: string // Generado por backend o integración externa
  title: string
  description: string
  severity: DefectoSeverity
  priority: Priority
  status: DefectoStatus
  type: DefectoTipo
  linkedCases: string[] // Caso IDs
  linkedRuns: string[] // Run IDs
  foundInEnvironment?: string
  foundInBuild?: string
  assignedTo?: string
  reportedBy: string
  reproducible: boolean
  stepsToReproduce: string[]
  actualBehavior?: string
  expectedBehavior?: string
  attachments: Attachment[]
  resolution?: string
  resolvedAt?: string
  resolvedBy?: string

  // Integración externa
  externalIssueKey?: string // Para integración con Jira, Azure DevOps, etc.
  externalIssueUrl?: string
  externalSystem?: ExternalSystem

  // Fechas de seguimiento
  reportedDate: string
  closedDate?: string
}

// ===== DTOs para CRUD =====

export interface CreateDefectoDTO {
  projectId: string
  title: string
  description: string
  severity: DefectoSeverity
  priority: Priority
  type: DefectoTipo

  linkedCases?: string[]
  linkedRuns?: string[]

  foundInEnvironment?: string
  foundInBuild?: string

  reproducible?: boolean
  stepsToReproduce: string[]
  actualBehavior?: string
  expectedBehavior?: string

  assignedTo?: string
}

export interface UpdateDefectoDTO extends Partial<CreateDefectoDTO> {
  id?: string
  status?: DefectoStatus
  resolution?: string
  resolvedBy?: string
}

// ===== Filtros =====

export interface DefectoFilters {
  search?: string
  projectId?: string
  status?: DefectoStatus
  severity?: DefectoSeverity
  priority?: Priority
  type?: DefectoTipo
  assignedTo?: string
  reportedBy?: string
  linkedCase?: string
  linkedRun?: string
  reproducible?: boolean
}
