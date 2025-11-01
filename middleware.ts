import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rutas públicas
  const publicPaths = ['/login']
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  // Obtener token de las cookies o headers (simulado)
  const authStorage = request.cookies.get('auth-storage')?.value

  // Si está en ruta pública y tiene token, redirigir a dashboard
  if (isPublicPath && authStorage) {
    try {
      const { state } = JSON.parse(authStorage)
      if (state?.token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (error) {
      // Invalid JSON, continue
    }
  }

  // Si no está en ruta pública y no tiene token, redirigir a login
  if (!isPublicPath && pathname !== '/' && !authStorage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
}
