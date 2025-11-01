'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const templates = [
  { name: 'Web Funcional', type: 'Web', items: 15 },
  { name: 'API Testing', type: 'API', items: 12 },
  { name: 'Mobile Testing', type: 'Mobile', items: 18 },
  { name: 'Security Testing', type: 'Security', items: 20 },
]

export default function ChecklistsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Checklists</h1>
          <p className="text-muted-foreground">Usa plantillas predefinidas para testing</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Checklist
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Plantillas Disponibles</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <Card key={template.name} className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <Badge className="w-fit mb-2">{template.type}</Badge>
                <CardTitle className="text-base">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{template.items} items</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
