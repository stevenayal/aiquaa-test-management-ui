import { BaseEntity } from './common'

export interface Riesgo extends BaseEntity {
  projectId: string
  title: string
  description: string
  category: 'Técnico' | 'Negocio' | 'Operacional' | 'Externo'
  probabilidad: 1 | 2 | 3 | 4 | 5 // 1=Muy Baja, 5=Muy Alta
  impacto: 1 | 2 | 3 | 4 | 5 // 1=Muy Bajo, 5=Muy Alto
  nivelRiesgo: number // probabilidad * impacto
  estado: 'Identificado' | 'Mitigado' | 'Aceptado' | 'Cerrado'
  estrategia: 'Mitigar' | 'Aceptar' | 'Transferir' | 'Evitar'
  owner: string
  mitigationPlan?: string
  linkedCases: string[] // Casos de prueba relacionados
  dueDate?: string
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
