'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useProjects } from '@/hooks/use-projects'
import { toast } from 'sonner'

export default function RequisitosPage() {
  const { data: projects } = useProjects()
  const hasProjects = projects && projects.length > 0

  const handleNewRequirement = () => {
    if (!hasProjects) {
      toast.error('Debes crear un proyecto antes de crear requisitos')
      return
    }
    toast.info('Funcionalidad de nuevo requisito en desarrollo')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Requisitos</h1>
          <p className="text-muted-foreground">Gestiona requisitos y vincúlalos con casos de prueba</p>
        </div>
        <Button onClick={handleNewRequirement} disabled={!hasProjects}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Requisito
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
          <CardTitle>Integración con AIQUAA Req-Lint</CardTitle>
          <CardDescription>
            Analiza la calidad de tus requisitos con la herramienta AIQUAA Req-Lint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Este módulo incluye integración con AIQUAA Req-Lint para analizar claridad, completitud y testabilidad de requisitos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
