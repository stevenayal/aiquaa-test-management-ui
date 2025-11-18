'use client'

import { useState } from 'react'
import { MoreVertical, Edit, Trash2, Clock, ListChecks } from 'lucide-react'
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
import { useDeleteTestCase } from '@/hooks/use-test-cases'
import type { CasoPrueba } from '@/types'
import { TestCaseFormDialog } from './test-case-form-dialog'

interface TestCaseCardProps {
  testCase: CasoPrueba
}

export function TestCaseCard({ testCase }: TestCaseCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const deleteTestCase = useDeleteTestCase()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
      case 'Alta':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
      case 'Media':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'Baja':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Listo':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      case 'Borrador':
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
      case 'Obsoleto':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Funcional':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
      case 'Regresión':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20'
      case 'Humo':
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
      case 'E2E':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      case 'Seguridad':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
      case 'Performance':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    }
  }

  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de eliminar el caso "${testCase.title}"?`)) {
      await deleteTestCase.mutateAsync(testCase.id)
    }
  }

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {testCase.key && (
                  <span className="text-sm font-mono text-muted-foreground">{testCase.key}</span>
                )}
                <Badge variant="outline" className={getPriorityColor(testCase.priority)}>
                  {testCase.priority}
                </Badge>
                <Badge variant="outline" className={getTypeColor(testCase.type)}>
                  {testCase.type}
                </Badge>
                <Badge variant="outline" className={getStatusColor(testCase.status)}>
                  {testCase.status}
                </Badge>
              </div>
              <CardTitle className="text-base line-clamp-2">{testCase.title}</CardTitle>
              {testCase.description && (
                <CardDescription className="line-clamp-2 mt-1">
                  {testCase.description}
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
            {/* Pasos y duración */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <ListChecks className="h-4 w-4" />
                <span>{testCase.steps.length} pasos</span>
              </div>
              {testCase.estimatedDuration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{testCase.estimatedDuration} min</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {testCase.tags && testCase.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {testCase.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {typeof tag === 'string' ? tag : tag.name}
                  </Badge>
                ))}
                {testCase.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{testCase.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Automatización */}
            {testCase.automationStatus && testCase.automationStatus !== 'Manual' && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Automatización:</span> {testCase.automationStatus}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de edición */}
      <TestCaseFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        testCase={testCase}
      />
    </>
  )
}
