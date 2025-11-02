import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { CasoPrueba } from '@/types'
import { toast } from 'sonner'

interface CreateTestCaseDto {
  title: string
  description?: string
  priority: string
  type: string
  status?: string
  preconditions?: string[]
  steps?: any[]
  expectedResult?: string
  testData?: Record<string, any>
  projectId: string
}

interface UpdateTestCaseDto extends Partial<CreateTestCaseDto> {}

export function useTestCases(projectId?: string) {
  return useQuery({
    queryKey: ['test-cases', projectId],
    queryFn: () => {
      const url = projectId ? `/test-cases?projectId=${projectId}` : '/test-cases'
      return apiClient.get<CasoPrueba[]>(url)
    },
  })
}

export function useTestCase(id: string) {
  return useQuery({
    queryKey: ['test-cases', id],
    queryFn: () => apiClient.get<CasoPrueba>(`/test-cases/${id}`),
    enabled: !!id,
  })
}

export function useCreateTestCase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTestCaseDto) => apiClient.post<CasoPrueba>('/test-cases', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-cases'] })
      toast.success('Caso de prueba creado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear caso de prueba')
    },
  })
}

export function useUpdateTestCase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTestCaseDto }) =>
      apiClient.patch<CasoPrueba>(`/test-cases/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['test-cases'] })
      queryClient.invalidateQueries({ queryKey: ['test-cases', variables.id] })
      toast.success('Caso de prueba actualizado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar caso de prueba')
    },
  })
}

export function useDeleteTestCase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/test-cases/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-cases'] })
      toast.success('Caso de prueba eliminado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar caso de prueba')
    },
  })
}

export function useImportTestCases() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) => apiClient.post('/test-cases/import/json', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-cases'] })
      toast.success('Casos de prueba importados exitosamente')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al importar casos de prueba')
    },
  })
}
