import { BaseEntity, Status } from './common'

export type PlanStatus = 'Borrador' | 'Activo' | 'Archivado'
export type SuiteTipo = 'Estática' | 'Consulta'

export interface PlanPrueba extends BaseEntity {
  projectId: string
  key: string // "PLAN-001"
  name: string
  description?: string
  status: PlanStatus
  startDate?: string
  endDate?: string
  suites: TestSuite[]
  settings: PlanSettings

  // Estadísticas calculadas
  totalCases?: number
  estimatedDuration?: number // en minutos
}

export interface TestSuite {
  id: string
  name: string
  description?: string
  type: SuiteTipo
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
  defaultEnvironment?: string
}

export interface Parametrizacion {
  id: string
  suiteId: string
  name: string
  parameters: Record<string, string[]>
  combinations: Record<string, string>[]
}

// ===== DTOs para CRUD =====

export interface CreatePlanPruebaDTO {
  projectId: string
  name: string
  description?: string
  status?: PlanStatus
  startDate?: string
  endDate?: string
  suites?: Omit<TestSuite, 'id'>[]
  settings?: Partial<PlanSettings>
}

export interface UpdatePlanPruebaDTO extends Partial<CreatePlanPruebaDTO> {
  id?: string
}

export interface AddCasesToPlanDTO {
  planId: string
  suiteId?: string // Si no existe, crear suite "Default"
  caseIds: string[]
}

export interface RemoveCasesFromPlanDTO {
  planId: string
  suiteId: string
  caseIds: string[]
}

// ===== Filtros =====

export interface PlanPruebaFilters {
  search?: string
  projectId?: string
  status?: PlanStatus
  startDate?: string
  endDate?: string
}
