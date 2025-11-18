'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useProjects } from '@/hooks/use-projects'
import { toast } from 'sonner'

export default function PlanesPage() {
  const { data: projects } = useProjects()
  const hasProjects = projects && projects.length > 0

  const handleNewPlan = () => {
    if (!hasProjects) {
      toast.error('Debes crear un proyecto antes de crear planes de prueba')
      return
    }
    toast.info('Funcionalidad de nuevo plan en desarrollo')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Planes de Prueba</h1>
          <p className="text-muted-foreground">Organiza casos en suites y planes</p>
        </div>
        <Button onClick={handleNewPlan} disabled={!hasProjects}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Plan
        </Button>
      </div>
      {!hasProjects && (
        <Card className="border-yellow-500">
          <CardHeader>
            <CardTitle>No hay proyectos disponibles</CardTitle>
            <CardDescription>
              Crea primero un proyecto para usar este módulo
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Planes</CardTitle>
          <CardDescription>
            Crea planes con suites estáticas y dinámicas, parametrizaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Organiza casos en suites estáticas o por consulta, configura parametrizaciones para data-driven testing.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
