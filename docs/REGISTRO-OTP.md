# Sistema de Registro con Verificación OTP

## 🎯 Descripción

El sistema de registro incluye verificación por correo electrónico mediante código OTP (One-Time Password) de 6 dígitos.

## 🔐 Flujo de Registro

### 1️⃣ Página de Login
- Usuario ve botón **"Crear cuenta nueva"**
- Click redirige a `/registro`

### 2️⃣ Formulario de Registro (`/registro`)

**Campos requeridos:**
- ✉️ **Email**: Correo electrónico válido
- 🔒 **Contraseña**: Mínimo 8 caracteres
- 🔒 **Confirmar Contraseña**: Debe coincidir
- 👤 **Rol**: Seleccionar entre:
  - `viewer` - Solo lectura
  - `tester` - Ejecutar pruebas
  - `qa_lead` - Gestionar pruebas
  - `admin` - Control total

**Validaciones:**
- ✅ Email formato válido
- ✅ Contraseñas coinciden
- ✅ Contraseña mínimo 8 caracteres
- ✅ Rol seleccionado

**Proceso:**
1. Usuario llena formulario
2. Click en "Crear cuenta"
3. Se llama a `POST /api/auth/register`
4. Si éxito, se genera OTP automáticamente
5. Se envía email con código de 6 dígitos
6. Redirección a `/verificar-otp`

### 3️⃣ Verificación OTP (`/verificar-otp`)

**Interfaz:**
- 📧 Muestra el email registrado
- 🔢 Input para código de 6 dígitos
- ⏱️ Countdown de 60 segundos para reenvío
- 🔄 Botón para reenviar código

**Funcionalidades:**
- ✅ Solo acepta números (máximo 6 dígitos)
- ✅ Botón deshabilitado hasta completar 6 dígitos
- ✅ Reenvío de código después de 60 segundos
- ✅ Validación del código contra el backend
- ✅ Redirección a login si verificación exitosa

## 📡 Endpoints Utilizados

### Registro de Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "Password123!",
  "role": "tester"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "email": "usuario@ejemplo.com",
  "role": "tester",
  "createdAt": "2024-11-02T..."
}
```

### Generar OTP
```http
POST /api/auth/generate-otp
Content-Type: application/json

{
  "email": "usuario@ejemplo.com"
}
```

**Response (200 OK):**
```json
{
  "message": "OTP enviado al correo",
  "expiresIn": "5m"
}
```

**Nota:** El OTP se envía por email y expira en 5 minutos.

### Verificar OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "message": "Email verificado exitosamente"
}
```

**Errores posibles:**
- `400` - OTP inválido o expirado
- `404` - Usuario no encontrado
- `409` - Email ya verificado

## 🎨 UI/UX

### Página de Registro
- ✨ Card centrado con logo AIQUAA
- 🔙 Botón "Volver" a login
- 📝 Formulario con validación en tiempo real
- 🎭 Selector de rol con descripciones
- 🔗 Link para "¿Ya tienes cuenta?"

### Página de Verificación OTP
- 📧 Muestra email pendiente
- 🔢 Input grande para código (mejor UX)
- ⏱️ Contador visual de reenvío
- 💡 Tip sobre revisar spam
- ✅ Auto-submit cuando se completan 6 dígitos (opcional)

## 🔒 Seguridad

### Validaciones Frontend
- ✅ Formato de email
- ✅ Longitud de contraseña
- ✅ Coincidencia de contraseñas
- ✅ Código OTP solo números

### Validaciones Backend
- ✅ Email único (no duplicados)
- ✅ Contraseña segura (requisitos del backend)
- ✅ OTP válido y no expirado
- ✅ Rate limiting en generación de OTP

### Almacenamiento Temporal
- `sessionStorage` para email pendiente de verificación
- Se limpia después de verificación exitosa
- No se almacenan contraseñas en ningún lado del frontend

## 🧪 Testing

### Flujo Completo
1. **Ir a login** → `/login`
2. **Click "Crear cuenta nueva"** → Redirige a `/registro`
3. **Llenar formulario:**
   ```
   Email: test@ejemplo.com
   Password: Test1234!
   Confirm: Test1234!
   Role: tester
   ```
4. **Submit** → Cuenta creada
5. **Email recibido** → Código OTP de 6 dígitos
6. **Verificar OTP** → `/verificar-otp`
7. **Ingresar código** → Verificación exitosa
8. **Redirección a login** → Listo para usar cuenta

### Casos de Prueba

#### ✅ Registro Exitoso
- Email válido y único
- Contraseña cumple requisitos
- Rol seleccionado
- OTP generado y enviado
- Código verificado correctamente

#### ❌ Errores Comunes
1. **Email duplicado**
   - Error: "Email ya registrado"
   - Solución: Usar otro email

2. **Contraseñas no coinciden**
   - Error frontend antes de enviar
   - Mensaje: "Las contraseñas no coinciden"

3. **OTP inválido**
   - Error: "Código inválido"
   - Solución: Reintentar o reenviar

4. **OTP expirado**
   - Error: "Código expirado"
   - Solución: Solicitar nuevo código

## 📧 Configuración de Email

El backend debe tener configurado un servicio de envío de emails (ej: SendGrid, AWS SES, Nodemailer).

**Template del Email:**
```
Asunto: Verifica tu cuenta en AIQUAA Test Management

Hola,

Tu código de verificación es: 123456

Este código expira en 5 minutos.

Si no solicitaste este código, ignora este mensaje.

Saludos,
Equipo AIQUAA
```

## 🚀 Deployment

### Variables de Entorno Necesarias (Backend)
```env
# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@aiquaa.com
SMTP_PASS=your-app-password
EMAIL_FROM=AIQUAA Test Management <noreply@aiquaa.com>

# OTP Configuration
OTP_EXPIRY_MINUTES=5
OTP_LENGTH=6
```

### Checklist Pre-Deploy
- [ ] Backend tiene configuración de email
- [ ] Endpoints de registro y OTP funcionan
- [ ] Templates de email están configurados
- [ ] Rate limiting configurado para OTP
- [ ] Logs de auditoría habilitados

## 📱 Próximas Mejoras

### Corto Plazo
- [ ] Auto-submit cuando OTP completo
- [ ] Resaltar dígitos del código
- [ ] Animaciones de transición
- [ ] Indicador de fuerza de contraseña

### Medio Plazo
- [ ] Verificación por SMS (opcional)
- [ ] Login social (Google, GitHub)
- [ ] 2FA obligatorio para admins
- [ ] Recovery codes para 2FA

### Largo Plazo
- [ ] Autenticación biométrica
- [ ] Magic links (sin contraseña)
- [ ] SSO empresarial
- [ ] Passkeys (WebAuthn)

## 🐛 Troubleshooting

### Email no llega
1. Verificar configuración SMTP del backend
2. Revisar carpeta de spam
3. Verificar que el email sea válido
4. Revisar logs del backend

### OTP siempre inválido
1. Verificar que el código no haya expirado
2. Verificar que el email coincida
3. Revisar logs del backend para ver OTP generado
4. Verificar timezone del servidor

### No puedo reenviar OTP
1. Esperar countdown de 60 segundos
2. Verificar rate limiting del backend
3. Revisar conexión a internet

---

**Última actualización:** 2024-11-02
**Estado:** ✅ Implementado y funcional
