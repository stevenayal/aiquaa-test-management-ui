'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface DashboardMetricCardProps {
  name: string
  value: string | number
  change?: string
  icon: LucideIcon
  color: string
  href?: string
  onClick?: () => void
}

export function DashboardMetricCard({
  name,
  value,
  change,
  icon: Icon,
  color,
  href,
  onClick,
}: DashboardMetricCardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      router.push(href)
    }
  }

  const isClickable = !!(href || onClick)

  return (
    <Card
      className={`${
        isClickable
          ? 'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105'
          : ''
      }`}
      onClick={isClickable ? handleClick : undefined}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-muted-foreground">{change}</p>}
      </CardContent>
    </Card>
  )
}
