'use client'

import { useState } from 'react'
import { Plus, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTestCases } from '@/hooks/use-test-cases'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CasosPage() {
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const { data: cases, isLoading, error } = useTestCases()

  let filteredCases = cases?.filter((caso) =>
    caso.title.toLowerCase().includes(search.toLowerCase())
  )

  if (priorityFilter && priorityFilter !== 'all') {
    filteredCases = filteredCases?.filter((caso) => caso.priority === priorityFilter)
  }

  if (statusFilter && statusFilter !== 'all') {
    filteredCases = filteredCases?.filter((caso) => caso.status === statusFilter)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Casos de Prueba</h1>
          <p className="text-muted-foreground">Gestiona y organiza tus casos de prueba</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Caso
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar casos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Crítica">Crítica</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Media">Media</SelectItem>
            <SelectItem value="Baja">Baja</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Listo">Listo</SelectItem>
            <SelectItem value="Borrador">Borrador</SelectItem>
            <SelectItem value="Obsoleto">Obsoleto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Error al cargar casos de prueba</CardTitle>
            <CardDescription>{(error as Error).message}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {!isLoading && !error && filteredCases && filteredCases.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No hay casos de prueba</CardTitle>
            <CardDescription>
              Crea tu primer caso de prueba para comenzar a organizar las pruebas
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {!isLoading && !error && filteredCases && filteredCases.length > 0 && (
        <div className="rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Título</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Prioridad</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caso) => (
                  <tr key={caso.id} className="cursor-pointer border-b hover:bg-muted/50">
                    <td className="px-4 py-3 font-mono text-sm">{caso.key}</td>
                    <td className="px-4 py-3 text-sm">{caso.title}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          caso.priority === 'Crítica'
                            ? 'border-red-500/20 bg-red-500/10 text-red-400'
                            : caso.priority === 'Alta'
                              ? 'border-orange-500/20 bg-orange-500/10 text-orange-400'
                              : caso.priority === 'Media'
                                ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                                : 'border-blue-500/20 bg-blue-500/10 text-blue-400'
                        }
                      >
                        {caso.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          caso.status === 'Listo'
                            ? 'border-green-500/20 bg-green-500/10 text-green-400'
                            : caso.status === 'Borrador'
                              ? 'border-gray-500/20 bg-gray-500/10 text-gray-400'
                              : 'border-red-500/20 bg-red-500/10 text-red-400'
                        }
                      >
                        {caso.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{caso.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
