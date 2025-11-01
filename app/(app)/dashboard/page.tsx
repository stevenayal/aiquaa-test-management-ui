'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TestTube, CheckCircle, XCircle, AlertCircle, Clock, Bug } from 'lucide-react'

const stats = [
  {
    name: 'Casos Totales',
    value: '2,543',
    change: '+12% vs mes anterior',
    icon: TestTube,
    color: 'text-blue-400',
  },
  {
    name: 'Casos Ejecutados',
    value: '1,842',
    change: 'Última semana',
    icon: Clock,
    color: 'text-yellow-400',
  },
  {
    name: 'Casos Pasados',
    value: '1,654',
    change: '89.8% tasa de éxito',
    icon: CheckCircle,
    color: 'text-green-400',
  },
  {
    name: 'Casos Fallidos',
    value: '143',
    change: '7.8% tasa de fallo',
    icon: XCircle,
    color: 'text-red-400',
  },
  {
    name: 'Casos Bloqueados',
    value: '45',
    change: '2.4% bloqueados',
    icon: AlertCircle,
    color: 'text-orange-400',
  },
  {
    name: 'Defectos Abiertos',
    value: '87',
    change: '23 críticos',
    icon: Bug,
    color: 'text-red-400',
  },
]

const recentRuns = [
  {
    id: '1',
    name: 'Sprint 23 - Regression',
    status: 'Completada',
    passed: 145,
    failed: 12,
    blocked: 3,
    total: 160,
    date: '2024-11-01',
  },
  {
    id: '2',
    name: 'Sprint 23 - Smoke Tests',
    status: 'En Progreso',
    passed: 67,
    failed: 3,
    blocked: 0,
    total: 85,
    date: '2024-11-01',
  },
  {
    id: '3',
    name: 'API Integration Tests',
    status: 'Completada',
    passed: 234,
    failed: 8,
    blocked: 2,
    total: 244,
    date: '2024-10-31',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Vista general de las pruebas y métricas del proyecto</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ejecuciones Recientes</CardTitle>
          <CardDescription>Últimas corridas de pruebas ejecutadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRuns.map((run) => (
              <div key={run.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">{run.name}</p>
                  <p className="text-sm text-muted-foreground">{run.date}</p>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-green-400">{run.passed}</div>
                    <div className="text-xs text-muted-foreground">Pasados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400">{run.failed}</div>
                    <div className="text-xs text-muted-foreground">Fallidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400">{run.blocked}</div>
                    <div className="text-xs text-muted-foreground">Bloqueados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400">{run.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
