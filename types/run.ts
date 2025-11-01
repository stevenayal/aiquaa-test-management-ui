import { BaseEntity, Attachment } from './common'

export interface Run extends BaseEntity {
  projectId: string
  planId: string
  name: string
  description?: string
  status: 'Pendiente' | 'En Progreso' | 'Completada' | 'Cancelada'
  startDate?: string
  endDate?: string
  assignedTo: string[] // User IDs
  configuration: RunConfiguration
  progress: RunProgress
  results: CaseResult[]
}

export interface RunConfiguration {
  environment: string
  browser?: string
  platform?: string
  buildVersion?: string
  customFields?: Record<string, string>
}

export interface RunProgress {
  total: number
  passed: number
  failed: number
  blocked: number
  notRun: number
  inProgress: number
}

export interface CaseResult extends BaseEntity {
  runId: string
  caseId: string
  status: 'Pasó' | 'Falló' | 'Bloqueado' | 'Omitido' | 'No Ejecutado'
  executedBy?: string
  executedAt?: string
  duration?: number // en segundos
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
  attachments: Attachment[]
}
