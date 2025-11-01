'use client'

import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
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

const mockCases = [
  {
    id: '1',
    key: 'TC-001',
    title: 'Verificar inicio de sesión con credenciales válidas',
    priority: 'Alta',
    status: 'Listo',
    type: 'Funcional',
    lastRun: '2024-11-01',
    result: 'Pasó',
  },
  {
    id: '2',
    key: 'TC-002',
    title: 'Validar carrito de compras con múltiples productos',
    priority: 'Crítica',
    status: 'Listo',
    type: 'E2E',
    lastRun: '2024-11-01',
    result: 'Pasó',
  },
  {
    id: '3',
    key: 'TC-003',
    title: 'Verificar procesamiento de pago con tarjeta',
    priority: 'Crítica',
    status: 'Listo',
    type: 'Integración',
    lastRun: '2024-10-31',
    result: 'Falló',
  },
  {
    id: '4',
    key: 'TC-004',
    title: 'Probar búsqueda de productos por categoría',
    priority: 'Media',
    status: 'Listo',
    type: 'Funcional',
    lastRun: '2024-10-31',
    result: 'Pasó',
  },
  {
    id: '5',
    key: 'TC-005',
    title: 'Validar recuperación de contraseña',
    priority: 'Alta',
    status: 'Borrador',
    type: 'Funcional',
    lastRun: null,
    result: null,
  },
]

export default function CasosPage() {
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')

  let filteredCases = mockCases.filter((caso) =>
    caso.title.toLowerCase().includes(search.toLowerCase())
  )

  if (priorityFilter) {
    filteredCases = filteredCases.filter((caso) => caso.priority === priorityFilter)
  }

  if (statusFilter) {
    filteredCases = filteredCases.filter((caso) => caso.status === statusFilter)
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
                <th className="px-4 py-3 text-left text-sm font-medium">Último Resultado</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caso) => (
                <tr key={caso.id} className="border-b hover:bg-muted/50 cursor-pointer">
                  <td className="px-4 py-3 text-sm font-mono">{caso.key}</td>
                  <td className="px-4 py-3 text-sm">{caso.title}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        caso.priority === 'Crítica'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : caso.priority === 'Alta'
                            ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            : caso.priority === 'Media'
                              ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                              : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }
                    >
                      {caso.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        caso.status === 'Listo'
                          ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : caso.status === 'Borrador'
                            ? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }
                    >
                      {caso.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">{caso.type}</td>
                  <td className="px-4 py-3">
                    {caso.result ? (
                      <Badge
                        className={
                          caso.result === 'Pasó'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }
                      >
                        {caso.result}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">No ejecutado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
