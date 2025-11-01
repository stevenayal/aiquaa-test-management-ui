'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DefectosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Defectos</h1>
          <p className="text-muted-foreground">Registra y gestiona defectos encontrados</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Defecto
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Defectos</CardTitle>
          <CardDescription>
            CRUD completo de defectos con estados, severidad y vinculación a casos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Registra defectos, asigna severidad y prioridad, vincula a casos y runs, y sincroniza con herramientas externas como Jira.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
