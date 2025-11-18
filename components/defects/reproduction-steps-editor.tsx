'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface ReproductionStepsEditorProps {
  steps: string[]
  onChange: (steps: string[]) => void
  errors?: string
}

export function ReproductionStepsEditor({ steps, onChange, errors }: ReproductionStepsEditorProps) {
  const addStep = () => {
    onChange([...steps, ''])
  }

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index)
    onChange(newSteps)
  }

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = value
    onChange(newSteps)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>
          Pasos para Reproducir <span className="text-red-500">*</span>
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={addStep}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Paso
        </Button>
      </div>

      {steps.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground">
          <p>Agrega al menos un paso para reproducir el defecto.</p>
        </Card>
      )}

      <div className="space-y-3">
        {steps.map((step, index) => (
          <Card key={index} className="p-4">
            <div className="flex gap-3">
              {/* Step Number */}
              <div className="flex flex-col items-center justify-start pt-2">
                <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <Textarea
                  placeholder={`Paso ${index + 1}...`}
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  rows={2}
                  className={!step && errors ? 'border-red-500' : ''}
                />
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

      {errors && <p className="text-sm text-red-500">{errors}</p>}

      {steps.length > 0 && (
        <Button type="button" variant="outline" size="sm" onClick={addStep} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Otro Paso
        </Button>
      )}
    </div>
  )
}
