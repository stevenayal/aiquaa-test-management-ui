'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockProjects = [
  {
    id: '1',
    key: 'ECOM',
    name: 'E-Commerce Platform',
    description: 'Plataforma de comercio electrónico',
    status: 'Activo',
    totalCases: 543,
    totalRuns: 89,
    passRate: 92.5,
  },
  {
    id: '2',
    key: 'MOBILE',
    name: 'Mobile Banking App',
    description: 'Aplicación móvil de banca',
    status: 'Activo',
    totalCases: 342,
    totalRuns: 67,
    passRate: 89.3,
  },
  {
    id: '3',
    key: 'API',
    name: 'Payment Gateway API',
    description: 'API de procesamiento de pagos',
    status: 'Activo',
    totalCases: 234,
    totalRuns: 125,
    passRate: 95.8,
  },
]

export default function ProyectosPage() {
  const [search, setSearch] = useState('')

  const filteredProjects = mockProjects.filter((project) =>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{project.key}</Badge>
                <Badge
                  className={
                    project.status === 'Activo'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <CardTitle className="mt-2">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold">{project.totalCases}</div>
                  <div className="text-xs text-muted-foreground">Casos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{project.totalRuns}</div>
                  <div className="text-xs text-muted-foreground">Ejecuciones</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{project.passRate}%</div>
                  <div className="text-xs text-muted-foreground">Éxito</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
