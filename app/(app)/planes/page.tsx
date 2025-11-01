'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PlanesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Planes de Prueba</h1>
          <p className="text-muted-foreground">Organiza casos en suites y planes</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Plan
        </Button>
      </div>
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
