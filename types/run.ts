import { BaseEntity, Attachment } from './common'

export type RunStatus = 'Pendiente' | 'En Progreso' | 'Completada' | 'Cancelada'
export type ResultStatus = 'Pasó' | 'Falló' | 'Bloqueado' | 'Omitido' | 'No Ejecutado'
export type Environment = 'Dev' | 'QA' | 'Staging' | 'Producción'

export interface Run extends BaseEntity {
  projectId: string
  planId?: string // Opcional: puede ejecutar casos sueltos
  key: string // "RUN-001"
  name: string
  description?: string
  status: RunStatus
  startDate?: string
  endDate?: string
  assignedTo: string[] // User IDs
  configuration: RunConfiguration
  progress: RunProgress
  results: CaseResult[]
}

export interface RunConfiguration {
  environment: Environment | string
  browser?: 'Chrome' | 'Firefox' | 'Safari' | 'Edge'
  platform?: string
  device?: string
  os?: string
  buildVersion?: string
  customFields?: Record<string, string>
}

export interface RunProgress {
  total: number
  executed: number
  passed: number
  failed: number
  blocked: number
  skipped: number
  notExecuted: number
  percentComplete: number
}

export interface CaseResult extends BaseEntity {
  runId: string
  caseId: string
  status: ResultStatus
  executedBy?: string
  executedAt?: string
  duration?: number // en milisegundos
  steps: StepResult[]
  comment?: string
  attachments: Attachment[]
  defects: string[] // IDs de defectos creados desde este resultado
}

export interface StepResult {
  stepId: string
  status: 'Pasó' | 'Falló' | 'Bloqueado' | 'Omitido'
  actualResult?: string
  comment?: string
  screenshot?: string
  attachments: Attachment[]
}

// ===== DTOs para CRUD =====

export interface CreateRunDTO {
  projectId: string
  planId?: string
  name: string
  description?: string
  configuration: RunConfiguration
  assignedTo?: string[]
  caseIds?: string[] // Si no hay plan, especificar casos
}

export interface UpdateRunDTO extends Partial<CreateRunDTO> {
  id?: string
  status?: RunStatus
}

export interface UpdateCaseResultDTO {
  runId: string
  caseId: string
  status: ResultStatus
  comment?: string
  steps?: StepResult[]
  duration?: number
  defects?: string[]
}

export interface BulkUpdateResultsDTO {
  runId: string
  results: {
    caseId: string
    status: ResultStatus
    comment?: string
  }[]
}

// ===== Filtros =====

export interface RunFilters {
  search?: string
  projectId?: string
  planId?: string
  status?: RunStatus
  assignedTo?: string
  startDate?: string
  endDate?: string
  environment?: string
}
