'use client'

import { useState } from 'react'
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
import { useTestCases } from '@/hooks/use-test-cases'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TestCaseFormDialog } from '@/components/test-cases/test-case-form-dialog'
import { TestCaseCard } from '@/components/test-cases/test-case-card'

export default function CasosPage() {
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

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
        <Button onClick={() => setIsCreateDialogOpen(true)}>
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
              {search || priorityFilter !== 'all' || statusFilter !== 'all'
                ? 'No se encontraron casos con los filtros aplicados'
                : 'Crea tu primer caso de prueba para comenzar a organizar las pruebas'}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCases?.map((testCase) => (
          <TestCaseCard key={testCase.id} testCase={testCase} />
        ))}
      </div>

      {/* Dialog para crear caso de prueba */}
      <TestCaseFormDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  )
}
