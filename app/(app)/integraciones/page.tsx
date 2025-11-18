'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface Integration {
  id: string
  name: string
  type: string
  enabled: boolean
  config?: Record<string, any>
}

const integrations: Integration[] = [
  { id: 'jira', name: 'Jira', type: 'Issue Tracking', enabled: false },
  { id: 'azure-devops', name: 'Azure DevOps', type: 'ALM', enabled: false },
  { id: 'jenkins', name: 'Jenkins', type: 'CI/CD', enabled: false },
  { id: 'github', name: 'GitHub', type: 'SCM', enabled: false },
  { id: 'webhook', name: 'Webhook Custom', type: 'Webhook', enabled: false },
]

export default function IntegracionesPage() {
  const [integrationsState, setIntegrationsState] = useState<Integration[]>(integrations)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [config, setConfig] = useState<Record<string, string>>({})

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration)
    setConfig(integration.config || {})
    setIsConfigDialogOpen(true)
  }

  const handleSaveConfig = () => {
    if (!selectedIntegration) return

    // Validar campos según el tipo de integración
    if (selectedIntegration.id === 'jira') {
      if (!config.url || !config.email || !config.apiToken || !config.projectKey) {
        toast.error('Por favor completa todos los campos requeridos')
        return
      }
    } else if (selectedIntegration.id === 'webhook') {
      if (!config.url) {
        toast.error('Por favor ingresa la URL del webhook')
        return
      }
    }

    // Guardar configuración (por ahora en localStorage, luego en backend)
    const updatedIntegrations = integrationsState.map((int) =>
      int.id === selectedIntegration.id
        ? { ...int, enabled: true, config }
        : int
    )
    setIntegrationsState(updatedIntegrations)

    // Guardar en localStorage como mock
    localStorage.setItem(`integration-${selectedIntegration.id}`, JSON.stringify(config))

    toast.success(`Configuración de ${selectedIntegration.name} guardada exitosamente`)
    setIsConfigDialogOpen(false)
    setSelectedIntegration(null)
    setConfig({})
  }

  const handleNewIntegration = () => {
    toast.info('Funcionalidad de nueva integración personalizada en desarrollo')
  }

  const renderConfigForm = () => {
    if (!selectedIntegration) return null

    switch (selectedIntegration.id) {
      case 'jira':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL de Jira *</Label>
              <Input
                id="url"
                placeholder="https://tu-empresa.atlassian.net"
                value={config.url || ''}
                onChange={(e) => setConfig({ ...config, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu-email@ejemplo.com"
                value={config.email || ''}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiToken">API Token *</Label>
              <Input
                id="apiToken"
                type="password"
                placeholder="Tu API token de Jira"
                value={config.apiToken || ''}
                onChange={(e) => setConfig({ ...config, apiToken: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectKey">Clave del Proyecto *</Label>
              <Input
                id="projectKey"
                placeholder="PROJ"
                value={config.projectKey || ''}
                onChange={(e) => setConfig({ ...config, projectKey: e.target.value })}
              />
            </div>
          </div>
        )
      case 'webhook':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL del Webhook *</Label>
              <Input
                id="url"
                placeholder="https://ejemplo.com/webhook"
                value={config.url || ''}
                onChange={(e) => setConfig({ ...config, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret">Secret (opcional)</Label>
              <Input
                id="secret"
                type="password"
                placeholder="Secret para validar el webhook"
                value={config.secret || ''}
                onChange={(e) => setConfig({ ...config, secret: e.target.value })}
              />
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              La configuración para {selectedIntegration.name} estará disponible próximamente.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integraciones</h1>
          <p className="text-muted-foreground">Configura integraciones con herramientas externas</p>
        </div>
        <Button onClick={handleNewIntegration}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Integración
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrationsState.map((integration) => (
          <Card key={integration.id}>
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
              <Button variant="outline" size="sm" onClick={() => handleConfigure(integration)}>
                {integration.enabled ? 'Editar Configuración' : 'Configurar'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de Configuración */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Configurar {selectedIntegration?.name}
            </DialogTitle>
            <DialogDescription>
              Completa los datos para configurar la integración
            </DialogDescription>
          </DialogHeader>
          {renderConfigForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveConfig}>
              Guardar Configuración
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
