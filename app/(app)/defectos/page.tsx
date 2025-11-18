'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Plus, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDefects } from '@/hooks/use-defects'
import { DefectFormDialog } from '@/components/defects/defect-form-dialog'
import { DefectCard } from '@/components/defects/defect-card'

export default function DefectosPage() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Handle URL query parameters
  useEffect(() => {
    const statusParam = searchParams.get('status')
    const severityParam = searchParams.get('severity')

    if (statusParam) {
      setStatusFilter(statusParam)
    }
    if (severityParam) {
      setSeverityFilter(severityParam)
    }
  }, [searchParams])

  const { data: defects, isLoading, error } = useDefects()

  let filteredDefects = defects?.filter((defect) =>
    defect.title.toLowerCase().includes(search.toLowerCase())
  )

  if (severityFilter && severityFilter !== 'all') {
    filteredDefects = filteredDefects?.filter((defect) => defect.severity === severityFilter)
  }

  if (statusFilter && statusFilter !== 'all') {
    filteredDefects = filteredDefects?.filter((defect) => defect.status === statusFilter)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Defectos</h1>
          <p className="text-muted-foreground">Registra y gestiona defectos encontrados</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Defecto
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar defectos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Severidad" />
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
            <SelectItem value="Abierto">Abierto</SelectItem>
            <SelectItem value="En Progreso">En Progreso</SelectItem>
            <SelectItem value="Resuelto">Resuelto</SelectItem>
            <SelectItem value="Cerrado">Cerrado</SelectItem>
            <SelectItem value="Reabierto">Reabierto</SelectItem>
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
            <CardTitle>Error al cargar defectos</CardTitle>
            <CardDescription>{(error as Error).message}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {!isLoading && !error && filteredDefects && filteredDefects.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No hay defectos</CardTitle>
            <CardDescription>
              {search || severityFilter !== 'all' || statusFilter !== 'all'
                ? 'No se encontraron defectos con los filtros aplicados'
                : 'Registra tu primer defecto para comenzar el seguimiento'}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDefects?.map((defect) => (
          <DefectCard key={defect.id} defect={defect} />
        ))}
      </div>

      {/* Dialog para crear defecto */}
      <DefectFormDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  )
}
