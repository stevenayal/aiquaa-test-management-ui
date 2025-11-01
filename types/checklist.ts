import { BaseEntity } from './common'

export interface Checklist extends BaseEntity {
  projectId: string
  name: string
  description?: string
  templateType: 'Web' | 'API' | 'Mobile' | 'Security' | 'Custom'
  items: ChecklistItem[]
  progress: ChecklistProgress
  assignedTo?: string
  dueDate?: string
  status: 'Pendiente' | 'En Progreso' | 'Completada'
}

export interface ChecklistItem {
  id: string
  order: number
  text: string
  category?: string
  checked: boolean
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
  type: 'Web' | 'API' | 'Mobile' | 'Security' | 'Custom'
  description?: string
  items: Omit<ChecklistItem, 'id' | 'checked' | 'checkedBy' | 'checkedAt' | 'notes'>[]
}

// Plantillas predefinidas
export const CHECKLIST_TEMPLATES: ChecklistTemplate[] = [
  {
    id: 'web-functional',
    name: 'Pruebas Funcionales Web',
    type: 'Web',
    description: 'Checklist para pruebas funcionales de aplicaciones web',
    items: [
      { order: 1, text: 'Verificar navegación entre páginas', category: 'Navegación' },
      { order: 2, text: 'Validar formularios (campos obligatorios)', category: 'Formularios' },
      { order: 3, text: 'Probar funcionalidad de búsqueda', category: 'Búsqueda' },
      { order: 4, text: 'Verificar autenticación y autorización', category: 'Seguridad' },
      { order: 5, text: 'Probar responsive design', category: 'UI/UX' },
    ],
  },
  {
    id: 'api-testing',
    name: 'Pruebas de API',
    type: 'API',
    description: 'Checklist para pruebas de APIs REST',
    items: [
      { order: 1, text: 'Verificar códigos de respuesta HTTP', category: 'Respuestas' },
      { order: 2, text: 'Validar estructura de JSON/XML', category: 'Datos' },
      { order: 3, text: 'Probar autenticación (JWT, OAuth)', category: 'Seguridad' },
      { order: 4, text: 'Verificar manejo de errores', category: 'Errores' },
      { order: 5, text: 'Probar límites de rate limiting', category: 'Performance' },
    ],
  },
  {
    id: 'mobile-testing',
    name: 'Pruebas Mobile',
    type: 'Mobile',
    description: 'Checklist para pruebas de aplicaciones móviles',
    items: [
      { order: 1, text: 'Probar en diferentes tamaños de pantalla', category: 'UI' },
      { order: 2, text: 'Verificar funcionalidad offline', category: 'Conectividad' },
      { order: 3, text: 'Probar rotación de pantalla', category: 'Orientación' },
      { order: 4, text: 'Verificar permisos de la app', category: 'Permisos' },
      { order: 5, text: 'Probar notificaciones push', category: 'Notificaciones' },
    ],
  },
  {
    id: 'security-testing',
    name: 'Pruebas de Seguridad',
    type: 'Security',
    description: 'Checklist para pruebas de seguridad básicas',
    items: [
      { order: 1, text: 'Verificar inyección SQL', category: 'Inyección' },
      { order: 2, text: 'Probar XSS (Cross-Site Scripting)', category: 'XSS' },
      { order: 3, text: 'Verificar CSRF tokens', category: 'CSRF' },
      { order: 4, text: 'Probar autenticación y sesiones', category: 'Auth' },
      { order: 5, text: 'Verificar cifrado de datos sensibles', category: 'Cifrado' },
    ],
  },
]
