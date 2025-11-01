'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function RequisitosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Requisitos</h1>
          <p className="text-muted-foreground">Gestiona requisitos y vincúlalos con casos de prueba</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Requisito
        </Button>
      </div>
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
