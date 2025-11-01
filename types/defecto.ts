import { BaseEntity, Priority, Attachment } from './common'

export interface Defecto extends BaseEntity {
  projectId: string
  key: string // Generado por backend o integración externa
  title: string
  description: string
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja'
  priority: Priority
  status: 'Abierto' | 'En Progreso' | 'Resuelto' | 'Cerrado' | 'Reabierto'
  type: 'Bug' | 'Defecto' | 'Regresión' | 'Mejora'
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
  externalIssueKey?: string // Para integración con Jira, Azure DevOps, etc.
  externalIssueUrl?: string
}
