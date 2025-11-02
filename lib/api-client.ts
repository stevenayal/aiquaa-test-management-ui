import axios, { type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from './constants'

class APIClient {
  private client: AxiosInstance
  private isRefreshing = false
  private failedQueue: Array<{
    resolve: (value?: any) => void
    reject: (reason?: any) => void
  }> = []

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor para agregar token
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const authStorage = localStorage.getItem('auth-storage')
          if (authStorage) {
            try {
              const { state } = JSON.parse(authStorage)
              if (state?.token) {
                config.headers.Authorization = `Bearer ${state.token}`
              }
            } catch (error) {
              console.error('Error parsing auth storage:', error)
            }
          }
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor para manejo de errores y refresh token
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        // Si el error es 401 y no es un retry
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Si ya estamos refrescando, agregar a la cola
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject })
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                return this.client(originalRequest)
              })
              .catch((err) => Promise.reject(err))
          }

          originalRequest._retry = true
          this.isRefreshing = true

          try {
            const refreshToken = this.getRefreshToken()

            if (!refreshToken) {
              throw new Error('No refresh token available')
            }

            // Intentar refresh
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            })

            const { accessToken, refreshToken: newRefreshToken } = response.data

            // Actualizar tokens en localStorage
            this.updateTokens(accessToken, newRefreshToken)

            // Procesar cola de requests fallidos
            this.processQueue(null, accessToken)

            // Reintentar request original
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return this.client(originalRequest)
          } catch (refreshError) {
            // Refresh falló, limpiar y redirigir a login
            this.processQueue(refreshError, null)
            this.clearAuth()
            if (typeof window !== 'undefined') {
              window.location.href = '/login'
            }
            return Promise.reject(refreshError)
          } finally {
            this.isRefreshing = false
          }
        }

        return Promise.reject(error)
      }
    )
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null

    try {
      const authStorage = localStorage.getItem('auth-storage')
      if (authStorage) {
        const { state } = JSON.parse(authStorage)
        return state?.refreshToken || null
      }
    } catch (error) {
      console.error('Error getting refresh token:', error)
    }
    return null
  }

  private updateTokens(accessToken: string, refreshToken: string) {
    if (typeof window === 'undefined') return

    try {
      const authStorage = localStorage.getItem('auth-storage')
      if (authStorage) {
        const parsed = JSON.parse(authStorage)
        parsed.state.token = accessToken
        parsed.state.refreshToken = refreshToken
        localStorage.setItem('auth-storage', JSON.stringify(parsed))

        // También actualizar cookie
        const expires = new Date(Date.now() + 7 * 864e5).toUTCString()
        document.cookie = `auth-storage=${encodeURIComponent(JSON.stringify(parsed))}; expires=${expires}; path=/; SameSite=Lax`
      }
    } catch (error) {
      console.error('Error updating tokens:', error)
    }
  }

  private clearAuth() {
    if (typeof window === 'undefined') return

    localStorage.removeItem('auth-storage')
    document.cookie = 'auth-storage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }

  private processQueue(error: any, token: string | null) {
    this.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error)
      } else {
        promise.resolve(token)
      }
    })

    this.failedQueue = []
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }
}

export const apiClient = new APIClient()
