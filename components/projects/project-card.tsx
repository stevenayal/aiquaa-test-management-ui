'use client'

import { useState } from 'react'
import { MoreVertical, Edit, Trash2, Calendar, Users } from 'lucide-react'
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
import { useDeleteProject } from '@/hooks/use-projects'
import type { Proyecto } from '@/types'
import { ProjectFormDialog } from './project-form-dialog'

interface ProjectCardProps {
  project: Proyecto
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const deleteProject = useDeleteProject()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      case 'Inactivo':
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
      case 'Archivado':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    }
  }

  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de eliminar el proyecto "${project.name}"?`)) {
      await deleteProject.mutateAsync(project.id)
    }
  }

  const formatDate = (date?: string) => {
    if (!date) return 'N/A'
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
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant="outline" className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              {project.key && (
                <p className="text-sm text-muted-foreground font-mono">{project.key}</p>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
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

          {project.description && (
            <CardDescription className="line-clamp-2">{project.description}</CardDescription>
          )}
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {/* Fechas */}
            {(project.startDate || project.endDate) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </span>
              </div>
            )}

            {/* Team Members */}
            {project.teamMembers && project.teamMembers.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{project.teamMembers.length} miembros</span>
              </div>
            )}

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold">{project.totalCases || 0}</div>
                <div className="text-xs text-muted-foreground">Casos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{project.totalRuns || 0}</div>
                <div className="text-xs text-muted-foreground">Ejecuciones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{project.totalDefects || 0}</div>
                <div className="text-xs text-muted-foreground">Defectos</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de edición */}
      <ProjectFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        project={project}
      />
    </>
  )
}
