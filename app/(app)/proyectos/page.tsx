'use client'

import { useState } from 'react'
import { Plus, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useProjects } from '@/hooks/use-projects'

export default function ProyectosPage() {
  const [search, setSearch] = useState('')
  const { data: projects, isLoading, error } = useProjects()

  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Proyectos</h1>
          <p className="text-muted-foreground">Gestiona tus proyectos de testing</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proyecto
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar proyectos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Error al cargar proyectos</CardTitle>
            <CardDescription>{(error as Error).message}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {!isLoading && !error && filteredProjects && filteredProjects.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No hay proyectos</CardTitle>
            <CardDescription>
              Crea tu primer proyecto para comenzar a gestionar casos de prueba
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects?.map((project) => (
          <Card key={project.id} className="cursor-pointer transition-colors hover:border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{project.key}</Badge>
                <Badge
                  className={
                    project.status === 'Activo'
                      ? 'border-green-500/20 bg-green-500/10 text-green-400'
                      : 'border-gray-500/20 bg-gray-500/10 text-gray-400'
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <CardTitle className="mt-2">{project.name}</CardTitle>
              <CardDescription>{project.description || 'Sin descripción'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold">
                    {(project as any).totalCases || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Casos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {(project as any).totalRuns || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Ejecuciones</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
