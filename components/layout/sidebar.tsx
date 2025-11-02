'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  ClipboardList,
  TestTube,
  PlayCircle,
  Bug,
  AlertTriangle,
  CheckSquare,
  Settings,
  Upload,
  Download,
  History,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui-store'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Proyectos', href: '/proyectos', icon: FolderKanban },
  { name: 'Requisitos', href: '/requisitos', icon: FileText },
  { name: 'Planes de Prueba', href: '/planes', icon: ClipboardList },
  { name: 'Casos de Prueba', href: '/casos', icon: TestTube },
  { name: 'Ejecuciones', href: '/ejecuciones', icon: PlayCircle },
  { name: 'Defectos', href: '/defectos', icon: Bug },
  { name: 'Riesgos', href: '/riesgos', icon: AlertTriangle },
  { name: 'Checklists', href: '/checklists', icon: CheckSquare },
]

const secondaryNavigation = [
  { name: 'Importar/Exportar', href: '/importar-exportar', icon: Upload },
  { name: 'Integraciones', href: '/integraciones', icon: Settings },
  { name: 'Auditoría', href: '/auditoria', icon: History },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen } = useUIStore()

  if (!sidebarOpen) return null

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image
                src="/logo/logo.png"
                alt="AIQUAA Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-semibold">AIQUAA Test</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="mt-8 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">OTRAS OPCIONES</div>
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
