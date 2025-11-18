'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search, X } from 'lucide-react'

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
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createDefectSchema, type DefectFormData } from '@/lib/validators'
import { useCreateDefect, useUpdateDefect } from '@/hooks/use-defects'
import { useProjects } from '@/hooks/use-projects'
import { useTestCases } from '@/hooks/use-test-cases'
import type { Defecto } from '@/types'
import { ReproductionStepsEditor } from './reproduction-steps-editor'

interface DefectFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defect?: Defecto | null
  defaultProjectId?: string
  defaultLinkedCase?: string
}

export function DefectFormDialog({
  open,
  onOpenChange,
  defect,
  defaultProjectId,
  defaultLinkedCase,
}: DefectFormDialogProps) {
  const createDefect = useCreateDefect()
  const updateDefect = useUpdateDefect()
  const { data: projects } = useProjects()
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProjectId || '')
  const { data: testCases } = useTestCases(selectedProjectId)

  const [linkedCases, setLinkedCases] = useState<string[]>([])
  const [caseSearch, setCaseSearch] = useState('')

  const isEditing = !!defect

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<DefectFormData>({
    resolver: zodResolver(createDefectSchema),
    defaultValues: {
      projectId: defaultProjectId || '',
      title: '',
      description: '',
      severity: 'Media',
      priority: 'Media',
      type: 'Bug',
      linkedCases: [],
      linkedRuns: [],
      foundInEnvironment: '',
      foundInBuild: '',
      reproducible: true,
      stepsToReproduce: [],
      actualBehavior: '',
      expectedBehavior: '',
      assignedTo: '',
    },
  })

  // Resetear formulario cuando cambia el defect o se abre el dialog
  useEffect(() => {
    if (open) {
      if (defect) {
        reset({
          projectId: defect.projectId,
          title: defect.title,
          description: defect.description,
          severity: defect.severity,
          priority: defect.priority,
          type: defect.type,
          linkedCases: defect.linkedCases || [],
          linkedRuns: defect.linkedRuns || [],
          foundInEnvironment: defect.foundInEnvironment || '',
          foundInBuild: defect.foundInBuild || '',
          reproducible: defect.reproducible,
          stepsToReproduce: defect.stepsToReproduce || [],
          actualBehavior: defect.actualBehavior || '',
          expectedBehavior: defect.expectedBehavior || '',
          assignedTo: defect.assignedTo || '',
        })
        setLinkedCases(defect.linkedCases || [])
        setSelectedProjectId(defect.projectId)
      } else {
        const initialLinkedCases = defaultLinkedCase ? [defaultLinkedCase] : []
        reset({
          projectId: defaultProjectId || '',
          title: '',
          description: '',
          severity: 'Media',
          priority: 'Media',
          type: 'Bug',
          linkedCases: initialLinkedCases,
          linkedRuns: [],
          foundInEnvironment: '',
          foundInBuild: '',
          reproducible: true,
          stepsToReproduce: [],
          actualBehavior: '',
          expectedBehavior: '',
          assignedTo: '',
        })
        setLinkedCases(initialLinkedCases)
        setSelectedProjectId(defaultProjectId || '')
      }
    }
  }, [open, defect, defaultProjectId, defaultLinkedCase, reset])

  const onSubmit = async (data: DefectFormData) => {
    try {
      const payload = {
        ...data,
        linkedCases,
      }

      if (isEditing) {
        await updateDefect.mutateAsync({
          id: defect.id,
          data: payload,
        })
      } else {
        await createDefect.mutateAsync(payload)
      }

      handleClose()
    } catch (error) {
      console.error('Error al guardar defecto:', error)
    }
  }

  const handleClose = () => {
    reset()
    setLinkedCases([])
    setCaseSearch('')
    onOpenChange(false)
  }

  const addLinkedCase = (caseId: string) => {
    if (!linkedCases.includes(caseId)) {
      const newLinkedCases = [...linkedCases, caseId]
      setLinkedCases(newLinkedCases)
      setValue('linkedCases', newLinkedCases)
    }
  }

  const removeLinkedCase = (caseId: string) => {
    const newLinkedCases = linkedCases.filter((id) => id !== caseId)
    setLinkedCases(newLinkedCases)
    setValue('linkedCases', newLinkedCases)
  }

  const filteredTestCases = testCases?.filter(
    (tc) =>
      tc.title.toLowerCase().includes(caseSearch.toLowerCase()) ||
      tc.key?.toLowerCase().includes(caseSearch.toLowerCase())
  )

  const linkedTestCases = testCases?.filter((tc) => linkedCases.includes(tc.id))

  // Verificar si hay proyectos disponibles
  const hasProjects = projects && projects.length > 0

  // Si no hay proyectos, mostrar mensaje en lugar del modal
  if (open && !hasProjects && !isEditing) {
    return (
      <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose()
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>No hay proyectos disponibles</DialogTitle>
            <DialogDescription>
              Debes crear un proyecto antes de crear defectos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleClose()
      }
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Defecto' : 'Nuevo Defecto'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica la información del defecto'
              : 'Completa los datos para registrar un nuevo defecto'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="reproduction">Reproducción</TabsTrigger>
              <TabsTrigger value="links">Vínculos</TabsTrigger>
            </TabsList>

            {/* TAB: General */}
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="projectId">
                    Proyecto <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="projectId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedProjectId(value)
                        }}
                      >
                        <SelectTrigger className={errors.projectId ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Selecciona un proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects && projects.length > 0 ? (
                            projects.map((project) => (
                              <SelectItem key={project.id} value={project.id}>
                                {project.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="" disabled>
                              No hay proyectos disponibles
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.projectId && (
                    <p className="text-sm text-red-500">{errors.projectId.message}</p>
                  )}
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="title">
                    Título <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Ej: Error al guardar formulario de registro"
                    {...register('title')}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">
                    Descripción <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe detalladamente el defecto..."
                    rows={4}
                    {...register('description')}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">
                    Severidad <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="severity"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Crítica">Crítica</SelectItem>
                          <SelectItem value="Alta">Alta</SelectItem>
                          <SelectItem value="Media">Media</SelectItem>
                          <SelectItem value="Baja">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">
                    Prioridad <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Crítica">Crítica</SelectItem>
                          <SelectItem value="Alta">Alta</SelectItem>
                          <SelectItem value="Media">Media</SelectItem>
                          <SelectItem value="Baja">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">
                    Tipo <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bug">Bug</SelectItem>
                          <SelectItem value="Defecto">Defecto</SelectItem>
                          <SelectItem value="Regresión">Regresión</SelectItem>
                          <SelectItem value="Mejora">Mejora</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Reproducible</Label>
                  <Controller
                    name="reproducible"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center gap-4 h-10">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                            className="w-4 h-4"
                          />
                          <span>Sí</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                            className="w-4 h-4"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foundInEnvironment">Ambiente</Label>
                  <Input
                    id="foundInEnvironment"
                    placeholder="Ej: Producción, QA, Dev"
                    {...register('foundInEnvironment')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foundInBuild">Build/Versión</Label>
                  <Input
                    id="foundInBuild"
                    placeholder="Ej: v2.3.1"
                    {...register('foundInBuild')}
                  />
                </div>
              </div>
            </TabsContent>

            {/* TAB: Reproducción */}
            <TabsContent value="reproduction" className="space-y-4 mt-4">
              <Controller
                name="stepsToReproduce"
                control={control}
                render={({ field }) => (
                  <ReproductionStepsEditor
                    steps={field.value}
                    onChange={field.onChange}
                    errors={errors.stepsToReproduce?.message}
                  />
                )}
              />

              <div className="space-y-2">
                <Label htmlFor="actualBehavior">Comportamiento Actual</Label>
                <Textarea
                  id="actualBehavior"
                  placeholder="¿Qué está pasando actualmente?"
                  rows={3}
                  {...register('actualBehavior')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedBehavior">Comportamiento Esperado</Label>
                <Textarea
                  id="expectedBehavior"
                  placeholder="¿Qué debería pasar?"
                  rows={3}
                  {...register('expectedBehavior')}
                />
              </div>
            </TabsContent>

            {/* TAB: Vínculos */}
            <TabsContent value="links" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Casos de Prueba Relacionados</Label>
                <div className="space-y-3">
                  {/* Search cases */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar casos de prueba..."
                      value={caseSearch}
                      onChange={(e) => setCaseSearch(e.target.value)}
                      className="pl-10"
                      disabled={!selectedProjectId}
                    />
                  </div>

                  {/* Linked cases */}
                  {linkedTestCases && linkedTestCases.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Casos vinculados:</p>
                      <div className="flex flex-wrap gap-2">
                        {linkedTestCases.map((tc) => (
                          <Badge key={tc.id} variant="secondary" className="gap-1">
                            {tc.key}: {tc.title.substring(0, 40)}...
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeLinkedCase(tc.id)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Available cases */}
                  {caseSearch && filteredTestCases && filteredTestCases.length > 0 && (
                    <div className="border rounded-lg max-h-48 overflow-y-auto">
                      {filteredTestCases.slice(0, 5).map((tc) => (
                        <div
                          key={tc.id}
                          className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                          onClick={() => {
                            addLinkedCase(tc.id)
                            setCaseSearch('')
                          }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{tc.key}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {tc.title}
                              </p>
                            </div>
                            <Badge variant="outline" className="shrink-0">
                              {tc.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">Asignado a (User ID)</Label>
                <Input
                  id="assignedTo"
                  placeholder="ID del usuario asignado"
                  {...register('assignedTo')}
                />
                <p className="text-xs text-muted-foreground">
                  Por ahora ingresa el ID del usuario. Próximamente selector de usuarios.
                </p>
              </div>
            </TabsContent>
          </Tabs>

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
