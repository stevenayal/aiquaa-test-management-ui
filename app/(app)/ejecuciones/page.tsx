'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useProjects } from '@/hooks/use-projects'
import { toast } from 'sonner'

export default function EjecucionesPage() {
  const { data: projects } = useProjects()
  const hasProjects = projects && projects.length > 0

  const handleNewExecution = () => {
    if (!hasProjects) {
      toast.error('Debes crear un proyecto antes de crear ejecuciones')
      return
    }
    toast.info('Funcionalidad de nueva ejecución en desarrollo')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ejecuciones</h1>
          <p className="text-muted-foreground">Gestiona las corridas de pruebas</p>
        </div>
        <Button onClick={handleNewExecution} disabled={!hasProjects}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Ejecución
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
          <CardTitle>Módulo en Desarrollo</CardTitle>
          <CardDescription>
            Este módulo permite crear y gestionar ejecuciones de pruebas, asignar testers y registrar resultados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Funcionalidades incluidas: crear corridas, asignar casos, registrar resultados por paso, adjuntar evidencia, y crear defectos desde fallos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
