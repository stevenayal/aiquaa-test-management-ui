'use client'

import { useState } from 'react'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface Step {
  order: number
  action: string
  expectedResult: string
  data?: Record<string, any>
}

interface StepEditorProps {
  steps: Step[]
  onChange: (steps: Step[]) => void
  errors?: Record<number, { action?: string; expectedResult?: string }>
}

export function StepEditor({ steps, onChange, errors = {} }: StepEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const addStep = () => {
    const newStep: Step = {
      order: steps.length + 1,
      action: '',
      expectedResult: '',
    }
    onChange([...steps, newStep])
  }

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index)
    // Reordenar los order
    const reorderedSteps = newSteps.map((step, i) => ({
      ...step,
      order: i + 1,
    }))
    onChange(reorderedSteps)
  }

  const updateStep = (index: number, field: keyof Step, value: any) => {
    const newSteps = [...steps]
    newSteps[index] = {
      ...newSteps[index],
      [field]: value,
    }
    onChange(newSteps)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()

    if (draggedIndex === null || draggedIndex === index) return

    const newSteps = [...steps]
    const draggedStep = newSteps[draggedIndex]

    // Remove dragged item
    newSteps.splice(draggedIndex, 1)

    // Insert at new position
    newSteps.splice(index, 0, draggedStep)

    // Update order numbers
    const reorderedSteps = newSteps.map((step, i) => ({
      ...step,
      order: i + 1,
    }))

    onChange(reorderedSteps)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>
          Pasos del Caso de Prueba <span className="text-red-500">*</span>
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={addStep}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Paso
        </Button>
      </div>

      {steps.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground">
          <p>No hay pasos definidos. Agrega al menos un paso para el caso de prueba.</p>
        </Card>
      )}

      <div className="space-y-3">
        {steps.map((step, index) => (
          <Card
            key={index}
            className={`p-4 transition-all ${
              draggedIndex === index ? 'opacity-50 scale-95' : ''
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-3">
              {/* Drag Handle */}
              <div className="flex flex-col items-center justify-start pt-2">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab active:cursor-grabbing" />
                <span className="text-sm font-bold text-muted-foreground mt-1">
                  {step.order}
                </span>
              </div>

              {/* Step Content */}
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor={`step-${index}-action`}>Acción</Label>
                  <Textarea
                    id={`step-${index}-action`}
                    placeholder="Describe la acción a realizar..."
                    value={step.action}
                    onChange={(e) => updateStep(index, 'action', e.target.value)}
                    rows={2}
                    className={errors[index]?.action ? 'border-red-500' : ''}
                  />
                  {errors[index]?.action && (
                    <p className="text-sm text-red-500">{errors[index].action}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`step-${index}-expected`}>Resultado Esperado</Label>
                  <Textarea
                    id={`step-${index}-expected`}
                    placeholder="Describe el resultado esperado..."
                    value={step.expectedResult}
                    onChange={(e) => updateStep(index, 'expectedResult', e.target.value)}
                    rows={2}
                    className={errors[index]?.expectedResult ? 'border-red-500' : ''}
                  />
                  {errors[index]?.expectedResult && (
                    <p className="text-sm text-red-500">{errors[index].expectedResult}</p>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <div className="flex items-start pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStep(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {steps.length > 0 && (
        <Button type="button" variant="outline" size="sm" onClick={addStep} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Otro Paso
        </Button>
      )}
    </div>
  )
}
