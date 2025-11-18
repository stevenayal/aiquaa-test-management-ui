'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TestTube, CheckCircle, XCircle, AlertCircle, Clock, Bug, Loader2 } from 'lucide-react'
import { DashboardMetricCard } from '@/components/dashboard/dashboard-metric-card'
import { useDashboard } from '@/hooks/use-dashboard'
import { formatNumber } from '@/lib/utils'

export default function DashboardPage() {
  const router = useRouter()
  const { data, isLoading, error } = useDashboard()

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`

  const stats = data?.stats
    ? [
        {
          name: 'Casos Totales',
          value: formatNumber(data.stats.totalCases),
          change: data.trends?.casesGrowth
            ? `${data.trends.casesGrowth > 0 ? '+' : ''}${formatPercentage(data.trends.casesGrowth)} vs mes anterior`
            : undefined,
          icon: TestTube,
          color: 'text-blue-400',
          href: '/casos',
        },
        {
          name: 'Casos Ejecutados',
          value: formatNumber(data.stats.executedCases),
          change: data.trends?.executionRate
            ? `${formatPercentage(data.trends.executionRate)} tasa de ejecución`
            : undefined,
          icon: Clock,
          color: 'text-yellow-400',
          onClick: () => {
            router.push('/ejecuciones')
          },
        },
        {
          name: 'Casos Pasados',
          value: formatNumber(data.stats.passedCases),
          change: `${formatPercentage(data.stats.passRate)} tasa de éxito`,
          icon: CheckCircle,
          color: 'text-green-400',
          onClick: () => {
            router.push('/ejecuciones?resultado=Pasó')
          },
        },
        {
          name: 'Casos Fallidos',
          value: formatNumber(data.stats.failedCases),
          change: `${formatPercentage(data.stats.failRate)} tasa de fallo`,
          icon: XCircle,
          color: 'text-red-400',
          onClick: () => {
            router.push('/ejecuciones?resultado=Falló')
          },
        },
        {
          name: 'Casos Bloqueados',
          value: formatNumber(data.stats.blockedCases),
          change: `${formatPercentage(data.stats.blockedRate)} bloqueados`,
          icon: AlertCircle,
          color: 'text-orange-400',
          onClick: () => {
            router.push('/ejecuciones?resultado=Bloqueado')
          },
        },
        {
          name: 'Defectos Abiertos',
          value: formatNumber(data.stats.openDefects),
          change: `${data.stats.criticalDefects} críticos`,
          icon: Bug,
          color: 'text-red-400',
          onClick: () => {
            router.push('/defectos?status=Abierto')
          },
        },
      ]
    : []

  const recentRuns = data?.recentRuns || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completada':
        return 'text-green-400'
      case 'En Progreso':
        return 'text-blue-400'
      case 'Cancelada':
        return 'text-gray-400'
      case 'Pendiente':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  const handleRunClick = (runId: string) => {
    router.push(`/ejecuciones/${runId}`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Vista general de las pruebas y métricas del proyecto</p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Error al cargar el dashboard</CardTitle>
            <CardDescription>{(error as Error).message}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Stats Grid */}
      {!isLoading && !error && data && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <DashboardMetricCard
                key={stat.name}
                name={stat.name}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
                href={stat.href}
                onClick={stat.onClick}
              />
            ))}
          </div>

          {/* Recent Runs */}
          <Card>
            <CardHeader>
              <CardTitle>Ejecuciones Recientes</CardTitle>
              <CardDescription>Últimas corridas de pruebas ejecutadas</CardDescription>
            </CardHeader>
            <CardContent>
              {recentRuns.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No hay ejecuciones recientes
                </div>
              ) : (
                <div className="space-y-4">
                  {recentRuns.map((run) => (
                    <div
                      key={run.id}
                      className="flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-accent"
                      onClick={() => handleRunClick(run.id)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {run.key && (
                            <span className="text-xs font-mono text-muted-foreground">{run.key}</span>
                          )}
                          <p className="font-medium">{run.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-muted-foreground">{run.date}</p>
                          <span className={`text-sm font-medium ${getStatusColor(run.status)}`}>
                            {run.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <div className="text-green-400 font-bold">{run.passed}</div>
                          <div className="text-xs text-muted-foreground">Pasados</div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-400 font-bold">{run.failed}</div>
                          <div className="text-xs text-muted-foreground">Fallidos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-orange-400 font-bold">{run.blocked}</div>
                          <div className="text-xs text-muted-foreground">Bloqueados</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 font-bold">{run.total}</div>
                          <div className="text-xs text-muted-foreground">Total</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
