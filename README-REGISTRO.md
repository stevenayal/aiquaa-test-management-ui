# 🎉 Sistema de Registro con OTP - COMPLETO

## ✅ Estado Actual: IMPLEMENTADO Y DESPLEGADO

El sistema de registro con verificación OTP por email está **100% funcional** en el frontend.

## 🌐 URLs en Producción

| Página | URL | Estado |
|--------|-----|--------|
| Login | https://aiquaa-test-management-ui.vercel.app/login | ✅ Con botón de registro |
| Registro | https://aiquaa-test-management-ui.vercel.app/registro | ✅ Formulario completo |
| Verificar OTP | https://aiquaa-test-management-ui.vercel.app/verificar-otp | ✅ Input de 6 dígitos |

## 📸 Screenshots del Flujo

### 1. Login con Botón de Registro
```
┌─────────────────────────────────────┐
│     🧪 AIQUAA Test Management       │
│                                     │
│  Email: [________________]          │
│  Password: [____________]           │
│                                     │
│  [    Iniciar sesión    ]          │
│                                     │
│  ────────────── O ──────────────   │
│                                     │
│  [  Crear cuenta nueva  ] ← NUEVO  │
│                                     │
│  Credenciales de prueba:           │
│  admin@aiquaa.com / Admin123!      │
└─────────────────────────────────────┘
```

### 2. Página de Registro
```
┌─────────────────────────────────────┐
│  ← Volver    🧪 Crear Cuenta        │
│                                     │
│  Email: [________________]          │
│  Contraseña: [___________]          │
│  Confirmar: [____________]          │
│  Rol: [▼ Seleccionar rol ]          │
│       - viewer: Solo lectura       │
│       - tester: Ejecutar pruebas   │
│       - qa_lead: Gestionar         │
│       - admin: Control total       │
│                                     │
│  [    Crear cuenta    ]            │
│                                     │
│  ¿Ya tienes cuenta? Inicia sesión  │
└─────────────────────────────────────┘
```

### 3. Verificación OTP
```
┌─────────────────────────────────────┐
│  ← Volver    📧 Verifica tu Correo  │
│                                     │
│  Enviado a: user@example.com       │
│                                     │
│  Código de Verificación:           │
│  [  1  2  3  4  5  6  ]           │
│                                     │
│  [   Verificar Código   ]          │
│                                     │
│  Reenviar código en 60s            │
│                                     │
│  💡 Revisa tu carpeta de spam      │
└─────────────────────────────────────┘
```

## 🔌 Integración con API

### Endpoints Implementados en el Frontend

#### ✅ 1. Registro de Usuario
```typescript
// app/(auth)/registro/page.tsx:44
const response = await fetch(`${API_BASE_URL}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: "user@example.com",
    password: "Password123!",
    role: "tester"
  })
})
```

**Esperado del Backend:**
```json
// Response 201 Created
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "tester",
  "createdAt": "2024-11-02T..."
}
```

#### ✅ 2. Generar OTP
```typescript
// app/(auth)/registro/page.tsx:59
const otpResponse = await fetch(`${API_BASE_URL}/auth/generate-otp`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: "user@example.com" })
})
```

**Esperado del Backend:**
```json
// Response 200 OK
{
  "message": "OTP enviado al correo",
  "expiresIn": "5m"
}
```

**Lo que debe hacer el backend:**
1. Generar código aleatorio de 6 dígitos
2. Guardar en BD con `email`, `otp`, `expiresAt` (5 min)
3. Enviar email con el código
4. Retornar éxito

#### ✅ 3. Verificar OTP
```typescript
// app/(auth)/verificar-otp/page.tsx:43
const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: "user@example.com",
    otp: "123456"
  })
})
```

**Esperado del Backend:**
```json
// Response 200 OK
{
  "message": "Email verificado exitosamente"
}
```

**Lo que debe hacer el backend:**
1. Buscar OTP en BD por email
2. Validar que no haya expirado
3. Comparar código enviado vs guardado
4. Marcar usuario como verificado
5. Eliminar OTP de la BD
6. Retornar éxito

## 📂 Estructura de Archivos

```
app/(auth)/
├── login/
│   └── page.tsx              ← Actualizado con botón registro
├── registro/                  ← NUEVO
│   └── page.tsx              ← Formulario completo
└── verificar-otp/             ← NUEVO
    └── page.tsx              ← Verificación OTP

middleware.ts                  ← Actualizado: rutas públicas

docs/
└── REGISTRO-OTP.md           ← Documentación completa
```

## 🧪 Testing Local

### 1. Clonar y Correr Localmente
```bash
git clone https://github.com/stevenayal/aiquaa-test-management-ui.git
cd aiquaa-test-management-ui
npm install
npm run dev
```

### 2. Abrir en Navegador
```
http://localhost:3000/login
```

### 3. Probar Flujo de Registro

**Paso 1:** Click en "Crear cuenta nueva"
```
→ Redirige a /registro
```

**Paso 2:** Llenar formulario
```
Email: test@ejemplo.com
Password: Test1234!
Confirmar: Test1234!
Rol: tester
```

**Paso 3:** Submit
```
→ Si backend NO está configurado:
  ❌ Error: "Failed to fetch" o "Network Error"

→ Si backend SÍ está configurado:
  ✅ Cuenta creada
  ✅ OTP generado y enviado por email
  ✅ Redirige a /verificar-otp
```

**Paso 4:** Verificar OTP
```
→ Revisar email
→ Copiar código de 6 dígitos
→ Ingresar en el formulario
→ Click "Verificar Código"

→ Si código es válido:
  ✅ Cuenta verificada
  ✅ Redirige a /login
  ✅ Puede iniciar sesión
```

## 🔧 Configuración Backend Necesaria

### Modelo de Base de Datos

```typescript
// User model
interface User {
  id: string
  email: string
  password: string  // hashed
  role: 'admin' | 'qa_lead' | 'tester' | 'viewer'
  isVerified: boolean  // ← IMPORTANTE
  createdAt: Date
}

// OTP model
interface OTP {
  id: string
  email: string
  code: string      // 6 digits
  expiresAt: Date   // 5 minutes from creation
  createdAt: Date
}
```

### Ejemplo de Implementación (NestJS)

```typescript
// auth.service.ts
async generateOTP(email: string) {
  // 1. Generar código de 6 dígitos
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // 2. Guardar en BD con expiración
  await this.otpRepository.create({
    email,
    code: otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  });

  // 3. Enviar email
  await this.emailService.sendOTP(email, otp);

  return { message: 'OTP enviado al correo', expiresIn: '5m' };
}

async verifyOTP(email: string, otp: string) {
  // 1. Buscar OTP
  const otpRecord = await this.otpRepository.findOne({
    where: { email, code: otp }
  });

  if (!otpRecord) {
    throw new BadRequestException('Código inválido');
  }

  // 2. Verificar expiración
  if (otpRecord.expiresAt < new Date()) {
    throw new BadRequestException('Código expirado');
  }

  // 3. Marcar usuario como verificado
  await this.userRepository.update(
    { email },
    { isVerified: true }
  );

  // 4. Eliminar OTP
  await this.otpRepository.delete({ email });

  return { message: 'Email verificado exitosamente' };
}
```

### Servicio de Email (Nodemailer)

```typescript
// email.service.ts
import nodemailer from 'nodemailer';

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOTP(email: string, otp: string) {
    await this.transporter.sendMail({
      from: '"AIQUAA Test" <noreply@aiquaa.com>',
      to: email,
      subject: 'Código de Verificación - AIQUAA',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Verifica tu cuenta</h2>
          <p>Tu código de verificación es:</p>
          <h1 style="background: #f4f4f4; padding: 20px; text-align: center; letter-spacing: 5px;">
            ${otp}
          </h1>
          <p>Este código expira en 5 minutos.</p>
          <p>Si no solicitaste este código, ignora este mensaje.</p>
          <hr>
          <p style="color: #888; font-size: 12px;">AIQUAA Test Management</p>
        </div>
      `,
    });
  }
}
```

### Variables de Entorno Backend

```env
# .env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@aiquaa.com
SMTP_PASS=your-app-password

# Para Gmail, necesitas generar una "App Password":
# 1. Google Account → Security
# 2. 2-Step Verification → App passwords
# 3. Generar password para "Mail"
```

## ✅ Checklist de Implementación Backend

### Paso 1: Crear Endpoints
- [ ] `POST /api/auth/register` (ya existe ✅)
- [ ] `POST /api/auth/generate-otp` (nuevo)
- [ ] `POST /api/auth/verify-otp` (nuevo)

### Paso 2: Configurar Email
- [ ] Instalar `nodemailer` o servicio de email
- [ ] Configurar SMTP (Gmail, SendGrid, AWS SES, etc.)
- [ ] Crear template de email para OTP
- [ ] Probar envío de emails

### Paso 3: Base de Datos
- [ ] Crear tabla/modelo `OTP`
- [ ] Agregar campo `isVerified` a tabla `User`
- [ ] Crear índice en `email` para OTP

### Paso 4: Testing
- [ ] Probar registro completo
- [ ] Probar generación de OTP
- [ ] Probar verificación de OTP
- [ ] Probar expiración de OTP (5 min)
- [ ] Probar reenvío de OTP

### Paso 5: Seguridad
- [ ] Rate limiting en generación de OTP (máx 3/hora)
- [ ] Hash de OTP en BD (opcional pero recomendado)
- [ ] Validar formato de email
- [ ] Sanitizar inputs
- [ ] Agregar logs de auditoría

## 🚀 Deploy

### Frontend (Ya Desplegado ✅)
```
https://aiquaa-test-management-ui.vercel.app
```

### Backend (Railway)
```
https://aiquaa-test-management-api-production.up.railway.app
```

**Variables de entorno necesarias en Railway:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@aiquaa.com
SMTP_PASS=xxx
```

## 📊 Flujo Visual Completo

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│  /login                     │
│  Click "Crear cuenta nueva" │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  /registro                          │
│  - Llenar email, password, rol      │
│  - Submit formulario                │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  POST /api/auth/register            │
│  ✅ Usuario creado (isVerified=false)│
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  POST /api/auth/generate-otp        │
│  - Genera código 6 dígitos          │
│  - Guarda en BD con expiración      │
│  - Envía email                      │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  📧 Email recibido                  │
│  Código: 123456                     │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  /verificar-otp                     │
│  - Mostrar email                    │
│  - Input de 6 dígitos               │
│  - Ingresar código                  │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  POST /api/auth/verify-otp          │
│  - Validar código                   │
│  - Verificar no expirado            │
│  - Marcar isVerified=true           │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  ✅ Cuenta verificada               │
│  Redirige a /login                  │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  Login con email verificado         │
│  ✅ Acceso completo a la app        │
└─────────────────────────────────────┘
```

## 🎯 Próximos Pasos

1. **Backend:** Implementar endpoints de OTP (ver ejemplos arriba)
2. **Email:** Configurar servicio SMTP
3. **Testing:** Probar flujo completo end-to-end
4. **Producción:** Deploy de backend con variables de entorno

## 📞 Soporte

Si tienes dudas sobre la implementación del backend:
- Revisa `docs/REGISTRO-OTP.md` para más detalles
- Consulta ejemplos de código arriba
- Prueba primero en desarrollo local

---

**Estado:** ✅ Frontend 100% listo y desplegado
**Pendiente:** Backend necesita implementar endpoints de OTP
**Última actualización:** 2024-11-02
