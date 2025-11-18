import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { Defecto, CreateDefectoDTO, UpdateDefectoDTO } from '@/types'
import { toast } from 'sonner'

export function useDefects(projectId?: string) {
  return useQuery({
    queryKey: ['defects', projectId],
    queryFn: () => {
      const url = projectId ? `/defects?projectId=${projectId}` : '/defects'
      return apiClient.get<Defecto[]>(url)
    },
  })
}

export function useDefect(id: string) {
  return useQuery({
    queryKey: ['defects', id],
    queryFn: () => apiClient.get<Defecto>(`/defects/${id}`),
    enabled: !!id,
  })
}

export function useCreateDefect() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateDefectoDTO) => apiClient.post<Defecto>('/defects', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['defects'] })
      toast.success('Defecto creado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear defecto')
    },
  })
}

export function useUpdateDefect() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDefectoDTO }) =>
      apiClient.patch<Defecto>(`/defects/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['defects'] })
      queryClient.invalidateQueries({ queryKey: ['defects', variables.id] })
      toast.success('Defecto actualizado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar defecto')
    },
  })
}

export function useDeleteDefect() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/defects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['defects'] })
      toast.success('Defecto eliminado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar defecto')
    },
  })
}
