'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, X } from 'lucide-react'

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
import { createTestCaseSchema, type TestCaseFormData } from '@/lib/validators'
import { useCreateTestCase, useUpdateTestCase } from '@/hooks/use-test-cases'
import { useProjects } from '@/hooks/use-projects'
import type { CasoPrueba } from '@/types'
import { StepEditor } from './step-editor'

interface TestCaseFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testCase?: CasoPrueba | null
  defaultProjectId?: string
}

export function TestCaseFormDialog({
  open,
  onOpenChange,
  testCase,
  defaultProjectId,
}: TestCaseFormDialogProps) {
  const createTestCase = useCreateTestCase()
  const updateTestCase = useUpdateTestCase()
  const { data: projects } = useProjects()

  const [preconditions, setPreconditions] = useState<string[]>([])
  const [preconditionInput, setPreconditionInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const isEditing = !!testCase

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<TestCaseFormData>({
    resolver: zodResolver(createTestCaseSchema),
    defaultValues: {
      projectId: defaultProjectId || '',
      title: '',
      description: '',
      priority: 'Media',
      type: 'Funcional',
      status: 'Borrador',
      preconditions: [],
      steps: [],
      expectedResult: '',
      testData: {},
      tags: [],
      linkedRequirements: [],
      estimatedDuration: undefined,
      automationStatus: 'Manual',
      automationScript: '',
    },
  })

  // Resetear formulario cuando cambia el testCase o se abre el dialog
  useEffect(() => {
    if (open) {
      if (testCase) {
        reset({
          projectId: testCase.projectId,
          title: testCase.title,
          description: testCase.description || '',
          priority: testCase.priority,
          type: testCase.type,
          status: testCase.status,
          preconditions: testCase.preconditions || [],
          steps: testCase.steps.map((s) => ({
            order: s.order,
            action: s.action,
            expectedResult: s.expectedResult,
            data: s.data,
          })),
          expectedResult: testCase.expectedResult || '',
          testData: testCase.testData || {},
          tags: testCase.tags?.map((t) => (typeof t === 'string' ? t : t.name)) || [],
          linkedRequirements: testCase.linkedRequirements || [],
          estimatedDuration: testCase.estimatedDuration,
          automationStatus: testCase.automationStatus || 'Manual',
          automationScript: testCase.automationScript || '',
        })
        setPreconditions(testCase.preconditions || [])
        setTags(testCase.tags?.map((t) => (typeof t === 'string' ? t : t.name)) || [])
      } else {
        reset({
          projectId: defaultProjectId || '',
          title: '',
          description: '',
          priority: 'Media',
          type: 'Funcional',
          status: 'Borrador',
          preconditions: [],
          steps: [],
          expectedResult: '',
          testData: {},
          tags: [],
          linkedRequirements: [],
          estimatedDuration: undefined,
          automationStatus: 'Manual',
          automationScript: '',
        })
        setPreconditions([])
        setTags([])
      }
    }
  }, [open, testCase, defaultProjectId, reset])

  const onSubmit = async (data: TestCaseFormData) => {
    try {
      const payload = {
        ...data,
        preconditions,
        tags,
      }

      if (isEditing) {
        await updateTestCase.mutateAsync({
          id: testCase.id,
          data: payload,
        })
      } else {
        await createTestCase.mutateAsync(payload)
      }

      handleClose()
    } catch (error) {
      console.error('Error al guardar caso de prueba:', error)
    }
  }

  const handleClose = () => {
    reset()
    setPreconditions([])
    setTags([])
    setPreconditionInput('')
    setTagInput('')
    onOpenChange(false)
  }

  const addPrecondition = () => {
    if (preconditionInput.trim()) {
      const newPreconditions = [...preconditions, preconditionInput.trim()]
      setPreconditions(newPreconditions)
      setValue('preconditions', newPreconditions)
      setPreconditionInput('')
    }
  }

  const removePrecondition = (index: number) => {
    const newPreconditions = preconditions.filter((_, i) => i !== index)
    setPreconditions(newPreconditions)
    setValue('preconditions', newPreconditions)
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()]
      setTags(newTags)
      setValue('tags', newTags)
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag)
    setTags(newTags)
    setValue('tags', newTags)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Caso de Prueba' : 'Nuevo Caso de Prueba'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica la información del caso de prueba'
              : 'Completa los datos para crear un nuevo caso de prueba'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="steps">Pasos</TabsTrigger>
              <TabsTrigger value="additional">Adicional</TabsTrigger>
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
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={errors.projectId ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Selecciona un proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects?.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          ))}
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
                    placeholder="Ej: Verificar inicio de sesión con credenciales válidas"
                    {...register('title')}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe el caso de prueba..."
                    rows={3}
                    {...register('description')}
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
                          <SelectItem value="Funcional">Funcional</SelectItem>
                          <SelectItem value="Regresión">Regresión</SelectItem>
                          <SelectItem value="Humo">Humo</SelectItem>
                          <SelectItem value="Integración">Integración</SelectItem>
                          <SelectItem value="E2E">E2E</SelectItem>
                          <SelectItem value="Seguridad">Seguridad</SelectItem>
                          <SelectItem value="Performance">Performance</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Borrador">Borrador</SelectItem>
                          <SelectItem value="Listo">Listo</SelectItem>
                          <SelectItem value="Obsoleto">Obsoleto</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="automationStatus">Automatización</Label>
                  <Controller
                    name="automationStatus"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Manual">Manual</SelectItem>
                          <SelectItem value="Automatable">Automatable</SelectItem>
                          <SelectItem value="Automatizado">Automatizado</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Precondiciones */}
              <div className="space-y-2">
                <Label>Precondiciones</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Agregar precondición..."
                    value={preconditionInput}
                    onChange={(e) => setPreconditionInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrecondition())}
                  />
                  <Button type="button" variant="outline" onClick={addPrecondition}>
                    Agregar
                  </Button>
                </div>
                {preconditions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {preconditions.map((precondition, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {precondition}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removePrecondition(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Etiquetas</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Agregar etiqueta..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Agregar
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* TAB: Pasos */}
            <TabsContent value="steps" className="space-y-4 mt-4">
              <Controller
                name="steps"
                control={control}
                render={({ field }) => (
                  <StepEditor
                    steps={field.value}
                    onChange={field.onChange}
                    errors={
                      errors.steps
                        ? (errors.steps as any).reduce(
                            (acc: any, err: any, idx: number) => {
                              if (err) acc[idx] = err
                              return acc
                            },
                            {}
                          )
                        : {}
                    }
                  />
                )}
              />
              {errors.steps && !Array.isArray(errors.steps) && (
                <p className="text-sm text-red-500">{(errors.steps as any).message}</p>
              )}

              <div className="space-y-2">
                <Label htmlFor="expectedResult">Resultado Esperado General</Label>
                <Textarea
                  id="expectedResult"
                  placeholder="Describe el resultado esperado general del caso..."
                  rows={3}
                  {...register('expectedResult')}
                />
              </div>
            </TabsContent>

            {/* TAB: Adicional */}
            <TabsContent value="additional" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Duración Estimada (minutos)</Label>
                <Input
                  id="estimatedDuration"
                  type="number"
                  placeholder="Ej: 30"
                  {...register('estimatedDuration', { valueAsNumber: true })}
                />
                {errors.estimatedDuration && (
                  <p className="text-sm text-red-500">{errors.estimatedDuration.message}</p>
                )}
              </div>

              {watch('automationStatus') === 'Automatizado' && (
                <div className="space-y-2">
                  <Label htmlFor="automationScript">Script de Automatización</Label>
                  <Textarea
                    id="automationScript"
                    placeholder="Código o referencia al script de automatización..."
                    rows={6}
                    className="font-mono text-sm"
                    {...register('automationScript')}
                  />
                </div>
              )}
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
