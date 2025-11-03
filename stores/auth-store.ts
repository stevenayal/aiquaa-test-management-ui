import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/types'
import { API_BASE_URL } from '@/lib/constants'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  setTokens: (accessToken: string, refreshToken: string) => void
}

// Helper para manejar cookies
const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// Login mock para credenciales de prueba
const mockLogin = async (
  email: string,
  password: string
): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (email === 'admin@aiquaa.com' && password === 'Admin123!') {
    return {
      user: {
        id: 'mock-user-1',
        name: 'Admin AIQUAA',
        email: 'admin@aiquaa.com',
        role: 'Admin',
      },
      accessToken: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    }
  }

  throw new Error('Credenciales inválidas')
}

// Autenticación real con la API
const apiLogin = async (
  email: string,
  password: string
): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }))
    throw new Error(error.message || 'Credenciales inválidas')
  }

  const data = await response.json()

  // Mapear la respuesta de la API al formato del User
  return {
    user: {
      id: data.user.id,
      name: data.user.email.split('@')[0], // Usar email como nombre por ahora
      email: data.user.email,
      role: data.user.role === 'admin' ? 'Admin' : data.user.role === 'qa_lead' ? 'Tester' : 'Viewer',
    },
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const { user, accessToken, refreshToken } = await apiLogin(email, password)
        set({ user, token: accessToken, refreshToken, isAuthenticated: true })

        // Sincronizar con cookies para el middleware
        if (typeof window !== 'undefined') {
          const authData = JSON.stringify({
            state: { user, token: accessToken, refreshToken, isAuthenticated: true },
          })
          setCookie('auth-storage', authData, 7)
        }
      },

      logout: () => {
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false })

        // Limpiar cookie
        if (typeof window !== 'undefined') {
          deleteCookie('auth-storage')
          localStorage.removeItem('auth-storage')
        }
      },

      setUser: (user: User) => {
        set({ user })
      },

      setTokens: (accessToken: string, refreshToken: string) => {
        set({ token: accessToken, refreshToken })

        // Actualizar cookies
        if (typeof window !== 'undefined') {
          const { user, isAuthenticated } = get()
          const authData = JSON.stringify({
            state: { user, token: accessToken, refreshToken, isAuthenticated },
          })
          setCookie('auth-storage', authData, 7)
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
