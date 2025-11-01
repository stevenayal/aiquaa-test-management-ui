'use client'

import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { useUIStore } from '@/stores/ui-store'
import { cn } from '@/lib/utils'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn('flex min-h-screen flex-col transition-all', sidebarOpen ? 'pl-64' : 'pl-0')}
      >
        <Topbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
