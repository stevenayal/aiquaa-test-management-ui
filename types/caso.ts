import { BaseEntity, Priority, Tag, Attachment } from './common'

export interface CasoPrueba extends BaseEntity {
  projectId: string
  key: string // Ej: "TC-001"
  title: string
  description?: string
  priority: Priority
  type: 'Funcional' | 'Regresión' | 'Humo' | 'Integración' | 'E2E' | 'Seguridad' | 'Performance'
  status: 'Borrador' | 'Listo' | 'Obsoleto'
  preconditions: string[]
  steps: Paso[]
  expectedResult?: string
  testData: Record<string, any>
  tags: Tag[]
  linkedRequirements: string[] // Requisito IDs
  attachments: Attachment[]
  estimatedDuration?: number // en minutos
  automationStatus: 'Manual' | 'Automatable' | 'Automatizado'
  automationScript?: string
}

export interface Paso {
  id: string
  order: number
  action: string
  expectedResult: string
  data?: Record<string, any>
}

// Formato AIQUAA para importación
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
