'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockEvents = [
  {
    id: '1',
    action: 'created',
    entity: 'caso',
    entityName: 'TC-045: Verificar pago con PayPal',
    user: 'Admin AIQUAA',
    timestamp: '2024-11-01 10:23:15',
  },
  {
    id: '2',
    action: 'executed',
    entity: 'run',
    entityName: 'Sprint 23 - Regression',
    user: 'Tester 1',
    timestamp: '2024-11-01 09:45:32',
  },
  {
    id: '3',
    action: 'updated',
    entity: 'defecto',
    entityName: 'BUG-123: Error en login',
    user: 'Developer 1',
    timestamp: '2024-11-01 08:12:44',
  },
]

export default function AuditoriaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Auditoría</h1>
        <p className="text-muted-foreground">Historial de eventos y cambios en el sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eventos Recientes</CardTitle>
          <CardDescription>Registro de acciones realizadas en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge>{event.action}</Badge>
                    <Badge variant="outline">{event.entity}</Badge>
                  </div>
                  <p className="font-medium">{event.entityName}</p>
                  <p className="text-sm text-muted-foreground">
                    por {event.user} • {event.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
