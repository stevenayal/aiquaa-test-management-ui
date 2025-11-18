import { BaseEntity, Priority, Tag, Attachment } from './common'

export type CasoTipo = 'Funcional' | 'Regresión' | 'Humo' | 'Integración' | 'E2E' | 'Seguridad' | 'Performance'
export type CasoStatus = 'Borrador' | 'Listo' | 'Obsoleto'
export type AutomationStatus = 'Manual' | 'Automatable' | 'Automatizado'

export interface CasoPrueba extends BaseEntity {
  projectId: string
  key: string // Ej: "TC-001"
  title: string
  description?: string
  priority: Priority
  type: CasoTipo
  status: CasoStatus
  preconditions: string[]
  steps: Paso[]
  expectedResult?: string
  testData: Record<string, any>
  tags: Tag[]
  linkedRequirements: string[] // Requisito IDs
  attachments: Attachment[]
  estimatedDuration?: number // en minutos
  automationStatus: AutomationStatus
  automationScript?: string
}

export interface Paso {
  id: string
  order: number
  action: string
  expectedResult: string
  data?: Record<string, any>
}

// ===== DTOs para CRUD =====

export interface CreateCasoPruebaDTO {
  projectId: string
  title: string
  description?: string
  priority: Priority
  type: CasoTipo
  status?: CasoStatus
  preconditions?: string[]
  steps: Omit<Paso, 'id'>[]
  expectedResult?: string
  testData?: Record<string, any>
  tags?: string[]
  linkedRequirements?: string[]
  estimatedDuration?: number
  automationStatus?: AutomationStatus
  automationScript?: string
}

export interface UpdateCasoPruebaDTO extends Partial<CreateCasoPruebaDTO> {
  id?: string
}

// ===== Filtros =====

export interface CasoPruebaFilters {
  search?: string
  projectId?: string
  priority?: Priority
  type?: CasoTipo
  status?: CasoStatus
  automationStatus?: AutomationStatus
  tags?: string[]
  linkedRequirements?: string[]
}

// ===== Formato AIQUAA para importación =====

export interface AIQUAAImportFormat {
  id_work_item: string
  datos_jira: {
    key: string
    summary: string
    description?: string
    issue_type?: string
    status?: string
    priority?: string
  }
  casos_prueba: AIQUAACasoPrueba[]
}

export interface AIQUAACasoPrueba {
  id_caso_prueba: string
  titulo: string
  descripcion?: string
  pasos: string[]
  precondiciones?: string[]
  datos_prueba?: Record<string, any>
  prioridad: 'Alta' | 'Media' | 'Baja'
  tipo?: string
  resultado_esperado?: string
}

export interface ImportCasosDTO {
  projectId: string
  format: 'aiquaa' | 'json'
  data: AIQUAAImportFormat | CasoPrueba[]
}
