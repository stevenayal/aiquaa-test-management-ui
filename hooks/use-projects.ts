import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { Proyecto, PaginatedResponse } from '@/types'
import { toast } from 'sonner'

interface CreateProjectDto {
  name: string
  description?: string
  status?: string
  key?: string
}

interface UpdateProjectDto extends Partial<CreateProjectDto> {}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.get<Proyecto[]>('/projects'),
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => apiClient.get<Proyecto>(`/projects/${id}`),
    enabled: !!id,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProjectDto) => apiClient.post<Proyecto>('/projects', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Proyecto creado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear proyecto')
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
      apiClient.patch<Proyecto>(`/projects/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects', variables.id] })
      toast.success('Proyecto actualizado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar proyecto')
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Proyecto eliminado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar proyecto')
    },
  })
}
