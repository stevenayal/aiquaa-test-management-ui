import { BaseEntity } from './common'

export interface AuditoriaEvento extends BaseEntity {
  projectId?: string
  userId: string
  userName: string
  userEmail: string
  action: AuditoriaAction
  entityType: EntityType
  entityId: string
  entityKey?: string // Para mostrar en UI (TC-001, PROJ-001, etc.)
  entityName?: string
  description: string
  changes?: AuditoriaChange[]
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
}

export type AuditoriaAction =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'executed'
  | 'assigned'
  | 'approved'
  | 'rejected'
  | 'imported'
  | 'exported'
  | 'synced'
  | 'login'
  | 'logout'

export type EntityType =
  | 'proyecto'
  | 'requisito'
  | 'plan'
  | 'caso'
  | 'run'
  | 'defecto'
  | 'riesgo'
  | 'checklist'
  | 'integracion'
  | 'user'

export interface AuditoriaChange {
  field: string
  oldValue: any
  newValue: any
}

export interface AuditoriaFilters {
  startDate?: string
  endDate?: string
  userId?: string
  action?: AuditoriaAction
  entityType?: EntityType
  projectId?: string
  search?: string
}

// ===== Helpers para navegación =====

export interface AuditEventNavigation {
  event: AuditoriaEvento
  canNavigate: boolean
  route?: string // '/casos/TC-001', '/proyectos/PROJ-001', etc.
}

/**
 * Genera la ruta de navegación para un evento de auditoría
 */
export function getAuditEventRoute(event: AuditoriaEvento): string | null {
  const { entityType, entityId, entityKey } = event

  const routes: Record<EntityType, string> = {
    proyecto: '/proyectos',
    requisito: '/requisitos',
    plan: '/planes',
    caso: '/casos',
    run: '/ejecuciones',
    defecto: '/defectos',
    riesgo: '/riesgos',
    checklist: '/checklists',
    integracion: '/integraciones',
    user: '/settings/users',
  }

  const basePath = routes[entityType]
  if (!basePath) return null

  // Usar entityKey si existe, sino entityId
  const identifier = entityKey || entityId
  return `${basePath}/${identifier}`
}

/**
 * Verifica si un evento de auditoría es navegable
 */
export function canNavigateToEvent(event: AuditoriaEvento): boolean {
  // No navegar a eventos de delete o logout
  if (event.action === 'deleted' || event.action === 'logout') {
    return false
  }

  // Solo navegar si hay entityId
  return !!event.entityId
}

/**
 * Obtiene información de navegación para un evento
 */
export function getEventNavigation(event: AuditoriaEvento): AuditEventNavigation {
  const canNavigate = canNavigateToEvent(event)
  const route = canNavigate ? getAuditEventRoute(event) : undefined

  return {
    event,
    canNavigate,
    route,
  }
}

// ===== Mapeo de acciones para UI =====

export const AUDIT_ACTION_LABELS: Record<AuditoriaAction, string> = {
  created: 'Creó',
  updated: 'Actualizó',
  deleted: 'Eliminó',
  executed: 'Ejecutó',
  assigned: 'Asignó',
  approved: 'Aprobó',
  rejected: 'Rechazó',
  imported: 'Importó',
  exported: 'Exportó',
  synced: 'Sincronizó',
  login: 'Inició sesión',
  logout: 'Cerró sesión',
}

export const ENTITY_TYPE_LABELS: Record<EntityType, string> = {
  proyecto: 'Proyecto',
  requisito: 'Requisito',
  plan: 'Plan de Prueba',
  caso: 'Caso de Prueba',
  run: 'Ejecución',
  defecto: 'Defecto',
  riesgo: 'Riesgo',
  checklist: 'Checklist',
  integracion: 'Integración',
  user: 'Usuario',
}
