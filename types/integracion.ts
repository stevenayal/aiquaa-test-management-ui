import { BaseEntity } from './common'

export interface Integracion extends BaseEntity {
  projectId: string
  type: 'Jira' | 'Azure DevOps' | 'GitHub' | 'GitLab' | 'Jenkins' | 'Webhook'
  name: string
  enabled: boolean
  configuration: IntegracionConfig
}

export type IntegracionConfig =
  | JiraConfig
  | AzureDevOpsConfig
  | CIConfig
  | WebhookConfig

export interface JiraConfig {
  type: 'Jira'
  url: string
  projectKey: string
  username: string
  apiToken: string
  syncDefects: boolean
  syncRequirements: boolean
  defaultIssueType: string
}

export interface AzureDevOpsConfig {
  type: 'Azure DevOps'
  organization: string
  project: string
  pat: string
  syncTestPlans: boolean
  syncTestCases: boolean
  syncBugs: boolean
}

export interface CIConfig {
  type: 'Jenkins' | 'GitHub' | 'GitLab'
  url: string
  token: string
  triggerOnRunComplete: boolean
  webhookUrl?: string
}

export interface WebhookConfig {
  type: 'Webhook'
  url: string
  method: 'POST' | 'PUT'
  headers: Record<string, string>
  events: WebhookEvent[]
}

export type WebhookEvent =
  | 'case.created'
  | 'case.updated'
  | 'run.started'
  | 'run.completed'
  | 'defect.created'
  | 'defect.updated'
