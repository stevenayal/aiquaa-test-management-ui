'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { TestTube, ArrowLeft, Mail } from 'lucide-react'
import { API_BASE_URL } from '@/lib/constants'

export default function VerificarOTPPage() {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const router = useRouter()

  useEffect(() => {
    // Obtener email de sessionStorage
    const pendingEmail = sessionStorage.getItem('pending-verification-email')
    if (!pendingEmail) {
      toast.error('No hay verificación pendiente')
      router.push('/registro')
      return
    }
    setEmail(pendingEmail)
  }, [router])

  useEffect(() => {
    // Countdown para reenviar OTP
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.length !== 6) {
      toast.error('El código debe tener 6 dígitos')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Código inválido' }))
        throw new Error(error.message || 'Código inválido')
      }

      toast.success('Cuenta verificada exitosamente!')

      // Limpiar sessionStorage
      sessionStorage.removeItem('pending-verification-email')

      // Redirigir a login
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error: any) {
      toast.error(error.message || 'Error al verificar código')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setResendLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/generate-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Error al reenviar código')
      }

      toast.success('Código reenviado a tu correo')
      setCountdown(60) // Reiniciar countdown
    } catch (error: any) {
      toast.error(error.message || 'Error al reenviar código')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-4"
            onClick={() => router.push('/registro')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <Mail className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Verifica tu Correo</CardTitle>
          <CardDescription>
            Hemos enviado un código de 6 dígitos a <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Código de Verificación</Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                  setOtp(value)
                }}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
              <p className="text-xs text-muted-foreground">
                Ingresa el código de 6 dígitos enviado a tu correo
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
              {loading ? 'Verificando...' : 'Verificar Código'}
            </Button>

            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Reenviar código en {countdown}s
                </p>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                >
                  {resendLoading ? 'Reenviando...' : 'Reenviar código'}
                </Button>
              )}
            </div>

            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
              <p className="text-xs text-yellow-400">
                💡 <strong>Nota:</strong> Revisa tu carpeta de spam si no ves el correo en tu
                bandeja de entrada.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
