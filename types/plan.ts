import { BaseEntity, Status } from './common'

export interface PlanPrueba extends BaseEntity {
  projectId: string
  name: string
  description?: string
  status: Status
  startDate?: string
  endDate?: string
  suites: Suite[]
  settings: PlanSettings
}

export interface Suite {
  id: string
  name: string
  description?: string
  type: 'Estática' | 'Consulta'
  parentId?: string // Para suites anidadas
  order: number
  query?: SuiteQuery
  cases: string[] // IDs de casos (solo para suites estáticas)
}

export interface SuiteQuery {
  tags?: string[]
  priority?: string[]
  assignedTo?: string[]
  customFilter?: string
}

export interface PlanSettings {
  allowParallelExecution: boolean
  notifyOnCompletion: boolean
  requireSignOff: boolean
}

export interface Parametrizacion {
  id: string
  suiteId: string
  name: string
  parameters: Record<string, string[]>
  combinations: Record<string, string>[]
}
