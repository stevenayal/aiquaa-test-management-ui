import { BaseEntity } from './common'

export type IntegracionTipo = 'Jira' | 'Azure DevOps' | 'Jenkins' | 'GitHub' | 'GitLab' | 'Slack' | 'Webhook'
export type IntegracionStatus = 'Activo' | 'Inactivo' | 'Error'

export interface Integracion extends BaseEntity {
  type: IntegracionTipo
  name: string
  description?: string
  status: IntegracionStatus
  configuration: IntegracionConfig

  // Metadatos de sincronización
  lastSync?: string
  lastSyncStatus?: 'Success' | 'Failed'
  lastError?: string
}

export type IntegracionConfig =
  | JiraConfig
  | AzureDevOpsConfig
  | JenkinsConfig
  | GitHubConfig
  | WebhookConfig

export interface JiraConfig {
  type: 'Jira'
  url: string
  email: string
  apiToken: string
  projectKey: string

  // Mapeo de estados
  statusMapping?: Record<string, string>

  // Sincronización automática
  autoSync: boolean
  syncInterval?: number // minutos
}

export interface AzureDevOpsConfig {
  type: 'Azure DevOps'
  organization: string
  project: string
  personalAccessToken: string

  workItemType: 'Bug' | 'Test Case' | 'Task'
}

export interface JenkinsConfig {
  type: 'Jenkins'
  url: string
  username: string
  apiToken: string
  job?: string
  triggerOnRunComplete: boolean
}

export interface GitHubConfig {
  type: 'GitHub'
  owner: string
  repo: string
  token: string
  createIssuesForDefects: boolean
}

export interface WebhookConfig {
  type: 'Webhook'
  url: string
  secret?: string
  events: WebhookEvent[]
  headers?: Record<string, string>
}

export type WebhookEvent =
  | 'case.created'
  | 'case.updated'
  | 'case.deleted'
  | 'run.started'
  | 'run.completed'
  | 'defect.created'
  | 'defect.updated'

// ===== DTOs para CRUD =====

export interface CreateIntegracionDTO {
  type: IntegracionTipo
  name: string
  description?: string
  configuration: IntegracionConfig
}

export interface UpdateIntegracionDTO extends Partial<CreateIntegracionDTO> {
  id?: string
  status?: IntegracionStatus
}

export interface TestIntegracionDTO {
  id: string
}

export interface SyncIntegracionDTO {
  id: string
  entityType?: 'casos' | 'defectos' | 'runs'
}

// ===== Filtros =====

export interface IntegracionFilters {
  search?: string
  type?: IntegracionTipo
  status?: IntegracionStatus
}
