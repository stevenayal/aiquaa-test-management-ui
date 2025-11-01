'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const integrations = [
  { name: 'Jira', type: 'Issue Tracking', enabled: false },
  { name: 'Azure DevOps', type: 'ALM', enabled: false },
  { name: 'Jenkins', type: 'CI/CD', enabled: false },
  { name: 'GitHub', type: 'SCM', enabled: false },
  { name: 'Webhook Custom', type: 'Webhook', enabled: false },
]

export default function IntegracionesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integraciones</h1>
          <p className="text-muted-foreground">Configura integraciones con herramientas externas</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Integración
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{integration.name}</CardTitle>
                <Badge variant={integration.enabled ? 'default' : 'outline'}>
                  {integration.enabled ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
              <CardDescription>{integration.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
