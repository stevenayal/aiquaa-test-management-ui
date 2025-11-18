'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth-store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema, type ChangePasswordFormData } from '@/lib/validators'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function AccountPage() {
  const { user } = useAuthStore()
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmitPassword = async (data: ChangePasswordFormData) => {
    setIsChangingPassword(true)
    try {
      // TODO: Llamar al endpoint de cambio de contraseña cuando esté disponible
      // await apiClient.post('/auth/change-password', data)
      
      // Mock por ahora
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success('Contraseña actualizada exitosamente')
      reset()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error al cambiar la contraseña')
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mi Cuenta</h1>
        <p className="text-muted-foreground">Gestiona la configuración de tu cuenta</p>
      </div>

      {/* Información de la cuenta */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la Cuenta</CardTitle>
          <CardDescription>Datos generales de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email || ''} disabled />
          </div>
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input value={user?.name || ''} disabled />
          </div>
        </CardContent>
      </Card>

      {/* Cambio de contraseña */}
      <Card>
        <CardHeader>
          <CardTitle>Cambiar Contraseña</CardTitle>
          <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                Contraseña Actual <span className="text-red-500">*</span>
              </Label>
              <Input
                id="currentPassword"
                type="password"
                {...register('currentPassword')}
                className={errors.currentPassword ? 'border-red-500' : ''}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">
                Nueva Contraseña <span className="text-red-500">*</span>
              </Label>
              <Input
                id="newPassword"
                type="password"
                {...register('newPassword')}
                className={errors.newPassword ? 'border-red-500' : ''}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirmar Nueva Contraseña <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cambiar Contraseña
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

