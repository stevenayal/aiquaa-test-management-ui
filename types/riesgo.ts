import { BaseEntity } from './common'

export type RiesgoCategory = 'Técnico' | 'Negocio' | 'Proyecto' | 'Externo'
export type RiesgoEstado = 'Identificado' | 'Evaluado' | 'Mitigado' | 'Aceptado' | 'Cerrado'
export type RiesgoEstrategia = 'Evitar' | 'Transferir' | 'Mitigar' | 'Aceptar'
export type RiesgoNivel = 'Bajo' | 'Medio' | 'Alto' | 'Crítico'
export type Probabilidad = 1 | 2 | 3 | 4 | 5
export type Impacto = 1 | 2 | 3 | 4 | 5

export interface Riesgo extends BaseEntity {
  projectId: string
  key: string // "RISK-001"
  title: string
  description: string
  category: RiesgoCategory

  // Evaluación (escala 1-5)
  probabilidad: Probabilidad // 1=Muy Baja, 5=Muy Alta
  impacto: Impacto // 1=Muy Bajo, 5=Muy Alto

  // Calculado: probabilidad * impacto
  nivelRiesgo: number
  riesgoNivel: RiesgoNivel

  // Mitigación
  mitigation?: RiskMitigation

  estado: RiesgoEstado
  owner?: string

  linkedCases: string[] // Casos de prueba relacionados
  dueDate?: string
}

export interface RiskMitigation {
  strategy: RiesgoEstrategia
  actions: string[]
  responsibleId?: string
  targetDate?: string
  status: 'Pendiente' | 'En Progreso' | 'Completada'
}

export interface RiskMatrix {
  projectId: string
  risks: Riesgo[]
  matrix: RiskMatrixCell[][]
}

export interface RiskMatrixCell {
  probabilidad: number
  impacto: number
  risks: string[] // Risk IDs
  count: number
}

export interface AIQUAARiskIntegration {
  syncedAt: string
  matrixUrl: string
  risks: Riesgo[]
}

// ===== DTOs para CRUD =====

export interface CreateRiesgoDTO {
  projectId: string
  title: string
  description: string
  category: RiesgoCategory
  probabilidad: Probabilidad
  impacto: Impacto
  owner?: string
  linkedCases?: string[]
  dueDate?: string
}

export interface UpdateRiesgoDTO extends Partial<CreateRiesgoDTO> {
  id?: string
  estado?: RiesgoEstado
  mitigation?: RiskMitigation
}

// ===== Filtros =====

export interface RiesgoFilters {
  search?: string
  projectId?: string
  category?: RiesgoCategory
  estado?: RiesgoEstado
  riesgoNivel?: RiesgoNivel
  owner?: string
  minProbabilidad?: Probabilidad
  minImpacto?: Impacto
}

// ===== Helpers =====

export function calculateRiskScore(probabilidad: Probabilidad, impacto: Impacto): number {
  return probabilidad * impacto
}

export function calculateRiskLevel(score: number): RiesgoNivel {
  if (score >= 20) return 'Crítico'
  if (score >= 12) return 'Alto'
  if (score >= 6) return 'Medio'
  return 'Bajo'
}
