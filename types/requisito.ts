import { BaseEntity, Priority, Tag } from './common'

export interface Requisito extends BaseEntity {
  projectId: string
  key: string // Ej: "REQ-001"
  title: string
  description: string
  type: 'Funcional' | 'No Funcional' | 'Negocio' | 'Técnico'
  priority: Priority
  status: 'Borrador' | 'Revisión' | 'Aprobado' | 'Rechazado'
  linkedCases: string[] // Caso de prueba IDs
  tags: Tag[]
  reqLintAnalysis?: ReqLintAnalysis
}

export interface ReqLintAnalysis {
  analyzedAt: string
  score: number
  issues: ReqLintIssue[]
  suggestions: string[]
  clarity: number
  completeness: number
  testability: number
}

export interface ReqLintIssue {
  severity: 'error' | 'warning' | 'info'
  message: string
  line?: number
  suggestion?: string
}
