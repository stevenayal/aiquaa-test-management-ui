import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
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
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const { user, token } = await mockLogin(email, password)
        set({ user, token, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
