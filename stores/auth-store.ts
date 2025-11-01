import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

// Helper para manejar cookies
const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// Simulación de autenticación
const mockLogin = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (email === 'admin@aiquaa.com' && password === 'admin123') {
    return {
      user: {
        id: '1',
        name: 'Admin AIQUAA',
        email: 'admin@aiquaa.com',
        role: 'Admin',
      },
      token: 'mock-jwt-token-' + Date.now(),
    }
  }

  throw new Error('Credenciales inválidas')
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const { user, token } = await mockLogin(email, password)
        set({ user, token, isAuthenticated: true })

        // Sincronizar con cookies para el middleware
        if (typeof window !== 'undefined') {
          const authData = JSON.stringify({ state: { user, token, isAuthenticated: true } })
          setCookie('auth-storage', authData, 7)
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })

        // Limpiar cookie
        if (typeof window !== 'undefined') {
          deleteCookie('auth-storage')
        }
      },

      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
