import { BaseEntity } from './common'

export type ChecklistCategory = 'Funcional' | 'API' | 'Mobile' | 'Security' | 'Performance' | 'Accessibility' | 'Custom'
export type ChecklistStatus = 'Pendiente' | 'En Progreso' | 'Completada'

export interface Checklist extends BaseEntity {
  key: string // "CHKLST-001"
  name: string
  description?: string
  category: ChecklistCategory
  isTemplate: boolean // true para plantillas reutilizables
  projectId?: string // null si es plantilla global
  items: ChecklistItem[]

  // Solo cuando se instancia (no template)
  assignedTo?: string
  dueDate?: string
  status?: ChecklistStatus
  progress?: ChecklistProgress

  // Estadísticas de uso (para templates)
  timesUsed?: number
}

export interface ChecklistItem {
  id: string
  order: number
  description: string
  category?: string
  isChecked?: boolean // Solo cuando se instancia
  checkedBy?: string
  checkedAt?: string
  notes?: string
  linkedCase?: string // ID del caso de prueba relacionado
}

export interface ChecklistProgress {
  total: number
  completed: number
  percentage: number
}

export interface ChecklistTemplate {
  id: string
  name: string
  type: ChecklistCategory
  description?: string
  items: Omit<ChecklistItem, 'id' | 'isChecked' | 'checkedBy' | 'checkedAt' | 'notes'>[]
}

// ===== Plantillas predefinidas =====

export const CHECKLIST_TEMPLATES: ChecklistTemplate[] = [
  {
    id: 'web-functional',
    name: 'Web Funcional',
    type: 'Funcional',
    description: 'Checklist para pruebas funcionales de aplicaciones web',
    items: [
      { order: 1, description: 'Verificar navegación entre páginas', category: 'Navegación' },
      { order: 2, description: 'Validar formularios (campos obligatorios)', category: 'Formularios' },
      { order: 3, description: 'Probar funcionalidad de búsqueda', category: 'Búsqueda' },
      { order: 4, description: 'Verificar autenticación y autorización', category: 'Seguridad' },
      { order: 5, description: 'Probar responsive design', category: 'UI/UX' },
    ],
  },
  {
    id: 'api-testing',
    name: 'API Testing',
    type: 'API',
    description: 'Checklist para pruebas de APIs REST',
    items: [
      { order: 1, description: 'Verificar códigos de respuesta HTTP', category: 'Respuestas' },
      { order: 2, description: 'Validar estructura de JSON/XML', category: 'Datos' },
      { order: 3, description: 'Probar autenticación (JWT, OAuth)', category: 'Seguridad' },
      { order: 4, description: 'Verificar manejo de errores', category: 'Errores' },
      { order: 5, description: 'Probar límites de rate limiting', category: 'Performance' },
    ],
  },
  {
    id: 'mobile-testing',
    name: 'Mobile Testing',
    type: 'Mobile',
    description: 'Checklist para pruebas de aplicaciones móviles',
    items: [
      { order: 1, description: 'Probar en diferentes tamaños de pantalla', category: 'UI' },
      { order: 2, description: 'Verificar funcionalidad offline', category: 'Conectividad' },
      { order: 3, description: 'Probar rotación de pantalla', category: 'Orientación' },
      { order: 4, description: 'Verificar permisos de la app', category: 'Permisos' },
      { order: 5, description: 'Probar notificaciones push', category: 'Notificaciones' },
    ],
  },
  {
    id: 'security-testing',
    name: 'Security Testing',
    type: 'Security',
    description: 'Checklist para pruebas de seguridad básicas',
    items: [
      { order: 1, description: 'Verificar inyección SQL', category: 'Inyección' },
      { order: 2, description: 'Probar XSS (Cross-Site Scripting)', category: 'XSS' },
      { order: 3, description: 'Verificar CSRF tokens', category: 'CSRF' },
      { order: 4, description: 'Probar autenticación y sesiones', category: 'Auth' },
      { order: 5, description: 'Verificar cifrado de datos sensibles', category: 'Cifrado' },
    ],
  },
]

// ===== DTOs para CRUD =====

export interface CreateChecklistDTO {
  name: string
  description?: string
  category: ChecklistCategory
  isTemplate: boolean
  projectId?: string
  items: Omit<ChecklistItem, 'id'>[]
}

export interface UpdateChecklistDTO extends Partial<CreateChecklistDTO> {
  id?: string
  status?: ChecklistStatus
  assignedTo?: string
  dueDate?: string
}

export interface InstantiateChecklistDTO {
  templateId: string
  projectId?: string
  caseId?: string // Vincular a caso específico
  assignedTo?: string
  dueDate?: string
}

export interface UpdateChecklistItemDTO {
  checklistId: string
  itemId: string
  isChecked: boolean
  notes?: string
}

// ===== Filtros =====

export interface ChecklistFilters {
  search?: string
  projectId?: string
  category?: ChecklistCategory
  status?: ChecklistStatus
  isTemplate?: boolean
  assignedTo?: string
}
