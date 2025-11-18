'use client'

import { useState } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

const templates = [
  { 
    id: 'web-funcional',
    name: 'Web Funcional', 
    type: 'Web', 
    items: 15,
    description: 'Checklist para pruebas funcionales de aplicaciones web'
  },
  { 
    id: 'api-testing',
    name: 'API Testing', 
    type: 'API', 
    items: 12,
    description: 'Checklist para pruebas de APIs REST y GraphQL'
  },
  { 
    id: 'mobile-testing',
    name: 'Mobile Testing', 
    type: 'Mobile', 
    items: 18,
    description: 'Checklist para pruebas en dispositivos móviles'
  },
  { 
    id: 'security-testing',
    name: 'Security Testing', 
    type: 'Security', 
    items: 20,
    description: 'Checklist para pruebas de seguridad'
  },
]

export default function ChecklistsPage() {
  const router = useRouter()
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null)

  const handleTemplateClick = (templateId: string) => {
    setLoadingTemplate(templateId)
    // Navegar a la página de detalle de la checklist
    // Por ahora, mostrar un modal o navegar a una ruta
    router.push(`/checklists/${templateId}`)
  }

  const handleNewChecklist = () => {
    // Por ahora, mostrar un mensaje. Luego se puede implementar un modal
    alert('Funcionalidad de nueva checklist en desarrollo. Por ahora, usa las plantillas disponibles.')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Checklists</h1>
          <p className="text-muted-foreground">Usa plantillas predefinidas para testing</p>
        </div>
        <Button onClick={handleNewChecklist}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Checklist
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Plantillas Disponibles</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className="hover:border-primary transition-colors cursor-pointer"
              onClick={() => handleTemplateClick(template.id)}
            >
              <CardHeader>
                <Badge className="w-fit mb-2">{template.type}</Badge>
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription className="text-xs">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{template.items} items</p>
                  {loadingTemplate === template.id && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
