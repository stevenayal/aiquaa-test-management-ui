'use client'

import { useState } from 'react'
import { MoreVertical, Edit, Trash2, ListChecks, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useDeleteDefect } from '@/hooks/use-defects'
import type { Defecto } from '@/types'
import { DefectFormDialog } from './defect-form-dialog'

interface DefectCardProps {
  defect: Defecto
}

export function DefectCard({ defect }: DefectCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const deleteDefect = useDeleteDefect()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Crítica':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20'
      case 'Alta':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20'
      case 'Media':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20'
      case 'Baja':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20'
      case 'Alta':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20'
      case 'Media':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20'
      case 'Baja':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Abierto':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20'
      case 'En Progreso':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20'
      case 'Resuelto':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20'
      case 'Cerrado':
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20'
      case 'Reabierto':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Bug':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20'
      case 'Defecto':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20'
      case 'Regresión':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20'
      case 'Mejora':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20'
    }
  }

  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de eliminar el defecto "${defect.title}"?`)) {
      await deleteDefect.mutateAsync(defect.id)
    }
  }

  const formatDate = (date?: string) => {
    if (!date) return null
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {defect.key && (
                  <span className="text-sm font-mono text-muted-foreground">{defect.key}</span>
                )}
                <Badge variant="outline" className={getSeverityColor(defect.severity)}>
                  {defect.severity}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(defect.priority)}>
                  {defect.priority}
                </Badge>
                <Badge variant="outline" className={getStatusColor(defect.status)}>
                  {defect.status}
                </Badge>
                <Badge variant="outline" className={getTypeColor(defect.type)}>
                  {defect.type}
                </Badge>
              </div>
              <CardTitle className="text-base line-clamp-2">{defect.title}</CardTitle>
              {defect.description && (
                <CardDescription className="line-clamp-2 mt-1">
                  {defect.description}
                </CardDescription>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {/* Pasos de reproducción */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <ListChecks className="h-4 w-4" />
                <span>{defect.stepsToReproduce.length} pasos</span>
              </div>
              {defect.reproducible !== undefined && (
                <span className={defect.reproducible ? 'text-green-500' : 'text-orange-500'}>
                  {defect.reproducible ? 'Reproducible' : 'No reproducible'}
                </span>
              )}
            </div>

            {/* Ambiente y build */}
            {(defect.foundInEnvironment || defect.foundInBuild) && (
              <div className="flex flex-wrap gap-2 text-xs">
                {defect.foundInEnvironment && (
                  <Badge variant="secondary">Ambiente: {defect.foundInEnvironment}</Badge>
                )}
                {defect.foundInBuild && (
                  <Badge variant="secondary">Build: {defect.foundInBuild}</Badge>
                )}
              </div>
            )}

            {/* Casos vinculados */}
            {defect.linkedCases && defect.linkedCases.length > 0 && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Casos vinculados:</span> {defect.linkedCases.length}
              </div>
            )}

            {/* Link externo */}
            {defect.externalIssueKey && (
              <div className="flex items-center gap-1 text-xs text-blue-500">
                <ExternalLink className="h-3 w-3" />
                <span>{defect.externalIssueKey}</span>
              </div>
            )}

            {/* Fechas */}
            {defect.reportedDate && (
              <div className="text-xs text-muted-foreground">
                Reportado: {formatDate(defect.reportedDate)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de edición */}
      <DefectFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        defect={defect}
      />
    </>
  )
}
