export type Priority = 'Crítica' | 'Alta' | 'Media' | 'Baja'

export type Status = 'Activo' | 'Inactivo' | 'Archivado'

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy?: string
}

export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface Attachment {
  id: string
  fileName: string
  fileUrl: string
  fileSize: number
  mimeType: string
  uploadedAt: string
  uploadedBy: string
}

export interface Tag {
  id: string
  name: string
  color: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'Admin' | 'Tester' | 'Developer' | 'Viewer'
}
