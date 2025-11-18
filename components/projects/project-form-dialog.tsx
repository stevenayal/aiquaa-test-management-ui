'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createProjectSchema, type ProjectFormData } from '@/lib/validators'
import { useCreateProject, useUpdateProject } from '@/hooks/use-projects'
import type { Proyecto } from '@/types'

interface ProjectFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Proyecto | null
}

export function ProjectFormDialog({ open, onOpenChange, project }: ProjectFormDialogProps) {
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()

  const isEditing = !!project

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'Activo',
      startDate: '',
      endDate: '',
    },
  })

  // Resetear formulario cuando cambia el proyecto o se abre el dialog
  useEffect(() => {
    if (open) {
      if (project) {
        reset({
          name: project.name,
          description: project.description || '',
          status: project.status,
          startDate: project.startDate || '',
          endDate: project.endDate || '',
        })
      } else {
        // Asegurar que el formulario esté completamente vacío al crear nuevo proyecto
        reset({
          name: '',
          description: '',
          status: 'Activo',
          startDate: '',
          endDate: '',
        })
      }
    } else {
      // Limpiar el formulario cuando se cierra el modal
      reset({
        name: '',
        description: '',
        status: 'Activo',
        startDate: '',
        endDate: '',
      })
    }
  }, [open, project, reset])

  const onSubmit = async (data: ProjectFormData) => {
    try {
      // Preparar payload según lo que espera el backend
      // El backend solo espera: name, description, status, key (opcional)
      const payload: {
        name: string
        description?: string
        status?: string
        key?: string
      } = {
        name: data.name.trim(),
      }

      // Solo incluir campos que tienen valor
      if (data.description?.trim()) {
        payload.description = data.description.trim()
      }

      if (data.status) {
        payload.status = data.status
      }

      // No incluir startDate, endDate, teamMembers ya que el backend no los acepta aún

      if (isEditing) {
        await updateProject.mutateAsync({
          id: project.id,
          data: payload,
        })
      } else {
        await createProject.mutateAsync(payload)
      }

      handleClose()
    } catch (error: any) {
      // El error ya se maneja en los hooks con toast
      // Pero también podemos mostrar errores de validación específicos
      if (error?.response?.data?.errors) {
        const validationErrors = error.response.data.errors
        // Mostrar errores de validación en los campos correspondientes
        Object.keys(validationErrors).forEach((field) => {
          const fieldError = validationErrors[field]
          if (Array.isArray(fieldError)) {
            // Si hay múltiples errores, tomar el primero
            const errorMessage = fieldError[0]
            if (field === 'name') {
              // setError ya está manejado por react-hook-form
            }
          }
        })
      }
      console.error('Error al guardar proyecto:', error)
    }
  }

  const handleClose = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleClose()
      }
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica la información del proyecto'
              : 'Completa los datos para crear un nuevo proyecto'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Nombre del Proyecto <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Ej: Sistema de Ventas"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
              autoFocus
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe el proyecto..."
              rows={3}
              {...register('description')}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={watch('status')} onValueChange={(value: any) => setValue('status', value)}>
              <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
                <SelectItem value="Archivado">Archivado</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de Inicio</Label>
              <Input id="startDate" type="date" {...register('startDate')} />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha de Fin</Label>
              <Input id="endDate" type="date" {...register('endDate')} />
              {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
