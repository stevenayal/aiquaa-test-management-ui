'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useProjects } from '@/hooks/use-projects'
import { toast } from 'sonner'

export default function RiesgosPage() {
  const { data: projects } = useProjects()
  const hasProjects = projects && projects.length > 0

  const handleNewRisk = () => {
    if (!hasProjects) {
      toast.error('Debes crear un proyecto antes de crear riesgos')
      return
    }
    toast.info('Funcionalidad de nuevo riesgo en desarrollo')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Riesgos</h1>
          <p className="text-muted-foreground">Gestiona riesgos con matriz de probabilidad e impacto</p>
        </div>
        <Button onClick={handleNewRisk} disabled={!hasProjects}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Riesgo
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
          <CardTitle>Matriz de Riesgos</CardTitle>
          <CardDescription>
            Visualiza riesgos en heatmap y sincroniza con AIQUAA Risk Matrix
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            CRUD de riesgos con probabilidad e impacto (1-5), visualización en heatmap y sincronización con backend AIQUAA.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
