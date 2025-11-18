import { BaseEntity } from './common'

export type UserRole = 'Admin' | 'Tester' | 'Developer' | 'Viewer'
export type ThemePreference = 'light' | 'dark' | 'auto'
export type Language = 'es' | 'en'

export interface UserProfile extends BaseEntity {
  email: string
  firstName?: string
  lastName?: string
  name: string // firstName + lastName o email
  avatar?: string
  role: UserRole

  // Información adicional
  jobTitle?: string
  department?: string
  phone?: string
  timezone?: string

  // Preferencias
  preferences: UserPreferences

  // Metadatos
  emailVerified: boolean
  isActive: boolean
  lastLogin?: string
  loginCount?: number
}

export interface UserPreferences {
  theme: ThemePreference
  language: Language
  notifications: NotificationPreferences
  defaultProject?: string
  itemsPerPage?: number
}

export interface NotificationPreferences {
  email: boolean
  inApp: boolean
  testRunComplete: boolean
  defectAssigned: boolean
  mentionedInComment: boolean
  weeklyReport: boolean
}

// ===== DTOs para CRUD =====

export interface UpdateUserProfileDTO {
  firstName?: string
  lastName?: string
  jobTitle?: string
  department?: string
  phone?: string
  timezone?: string
  avatar?: string
}

export interface UpdateUserPreferencesDTO {
  theme?: ThemePreference
  language?: Language
  notifications?: Partial<NotificationPreferences>
  defaultProject?: string
  itemsPerPage?: number
}

export interface ChangePasswordDTO {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ChangeEmailDTO {
  newEmail: string
  password: string
}

// ===== Filtros y búsqueda =====

export interface UserFilters {
  search?: string
  role?: UserRole
  isActive?: boolean
  department?: string
}

// ===== Defaults =====

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  theme: 'dark',
  language: 'es',
  notifications: {
    email: true,
    inApp: true,
    testRunComplete: true,
    defectAssigned: true,
    mentionedInComment: true,
    weeklyReport: false,
  },
  itemsPerPage: 20,
}

// ===== Helpers =====

export function getUserFullName(user: Partial<UserProfile>): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`
  }
  if (user.name) {
    return user.name
  }
  return user.email || 'Usuario'
}

export function getUserInitials(user: Partial<UserProfile>): string {
  const fullName = getUserFullName(user)
  const parts = fullName.split(' ')

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return fullName.substring(0, 2).toUpperCase()
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  Admin: 'Administrador',
  Tester: 'Tester',
  Developer: 'Desarrollador',
  Viewer: 'Visualizador',
}

export const USER_ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  Admin: [
    'projects.create',
    'projects.edit',
    'projects.delete',
    'cases.create',
    'cases.edit',
    'cases.delete',
    'runs.create',
    'runs.execute',
    'defects.create',
    'defects.edit',
    'defects.delete',
    'settings.manage',
    'users.manage',
    'integrations.manage',
  ],
  Tester: [
    'projects.view',
    'cases.create',
    'cases.edit',
    'runs.create',
    'runs.execute',
    'defects.create',
    'defects.edit',
  ],
  Developer: [
    'projects.view',
    'cases.view',
    'runs.view',
    'defects.view',
    'defects.edit',
  ],
  Viewer: [
    'projects.view',
    'cases.view',
    'runs.view',
    'defects.view',
  ],
}

export function hasPermission(user: UserProfile, permission: string): boolean {
  const permissions = USER_ROLE_PERMISSIONS[user.role] || []
  return permissions.includes(permission)
}
