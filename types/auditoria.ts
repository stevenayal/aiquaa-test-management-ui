import { BaseEntity } from './common'

export interface AuditoriaEvento extends BaseEntity {
  projectId?: string
  userId: string
  userName: string
  action: AuditoriaAction
  entityType: EntityType
  entityId: string
  entityName?: string
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
}
