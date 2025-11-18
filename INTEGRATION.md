# Integración con API AIQUAA Test Management

## ✅ Estado de la Integración

La aplicación frontend está completamente integrada con la API REST desplegada en Railway.

## 🔗 Configuración

### URL de la API
```
https://aiquaa-test-management-api-production.up.railway.app/api
```

### Documentación Swagger
```
https://aiquaa-test-management-api-production.up.railway.app/api/docs
```

## 🔐 Autenticación

### Credenciales de Prueba
```
Email: admin@aiquaa.com
Password: Admin123
```

### Flujo Implementado

1. **Login** → `POST /api/auth/login`
   - Recibe: email, password
   - Retorna: accessToken, refreshToken, user

2. **Refresh Token** → `POST /api/auth/refresh`
   - Se ejecuta automáticamente cuando accessToken expira
   - Maneja cola de requests fallidos durante el refresh
   - Si refresh falla, redirige a login

3. **Interceptor HTTP**
   - Agrega automáticamente `Authorization: Bearer {token}` a todas las requests
   - Maneja errores 401 y ejecuta refresh automático
   - Implementa retry de requests fallidos después del refresh

## 📦 Módulos Integrados

### ✅ Proyectos
- **GET** `/api/projects` - Listar proyectos
- **POST** `/api/projects` - Crear proyecto (UI lista)
- **GET** `/api/projects/:id` - Obtener proyecto
- **PATCH** `/api/projects/:id` - Actualizar proyecto (UI lista)
- **DELETE** `/api/projects/:id` - Eliminar proyecto (UI lista)

**Hooks disponibles:**
- `useProjects()` - Lista todos los proyectos
- `useProject(id)` - Obtiene un proyecto específico
- `useCreateProject()` - Mutation para crear
- `useUpdateProject()` - Mutation para actualizar
- `useDeleteProject()` - Mutation para eliminar

### ✅ Casos de Prueba
- **GET** `/api/test-cases` - Listar casos
- **POST** `/api/test-cases` - Crear caso (UI lista)
- **GET** `/api/test-cases/:id` - Obtener caso
- **PATCH** `/api/test-cases/:id` - Actualizar caso (UI lista)
- **DELETE** `/api/test-cases/:id` - Eliminar caso (UI lista)
- **POST** `/api/test-cases/import/json` - Importar desde JSON (UI lista)

**Hooks disponibles:**
- `useTestCases(projectId?)` - Lista casos (opcionalmente por proyecto)
- `useTestCase(id)` - Obtiene un caso específico
- `useCreateTestCase()` - Mutation para crear
- `useUpdateTestCase()` - Mutation para actualizar
- `useDeleteTestCase()` - Mutation para eliminar
- `useImportTestCases()` - Mutation para importar JSON

### 🔄 Pendientes de Integración (UI completa)
- Requisitos
- Planes de Prueba
- Test Suites
- Ejecuciones
- Resultados
- Defectos
- Riesgos
- Checklists

## 🛠️ Implementación Técnica

### API Client (`lib/api-client.ts`)
```typescript
// Cliente centralizado con Axios
// Incluye:
- Request interceptor (agrega token)
- Response interceptor (maneja 401 y refresh)
- Cola de requests durante refresh
- Métodos: get, post, put, patch, delete
```

### Auth Store (`stores/auth-store.ts`)
```typescript
// Zustand store con persistencia
// Incluye:
- login(email, password)
- logout()
- setTokens(accessToken, refreshToken)
- Sincronización con cookies para middleware
```

### React Query Hooks (`hooks/`)
```typescript
// Hooks personalizados por módulo
// Incluyen:
- Queries (useProjects, useTestCases, etc.)
- Mutations (useCreateProject, useUpdateTestCase, etc.)
- Invalidación automática de cache
- Toasts de éxito/error
```

## 🔄 Refresh Token Automático

El sistema implementa un mecanismo robusto de refresh token:

1. **Request falla con 401**
   - Se verifica si ya hay un refresh en progreso
   - Si no, se inicia el proceso de refresh

2. **Durante el refresh**
   - Requests adicionales se agregan a una cola
   - No se hacen múltiples requests de refresh simultáneos

3. **Refresh exitoso**
   - Se actualizan los tokens en localStorage y cookies
   - Se procesan todos los requests en cola con el nuevo token
   - Se reintenta el request original

4. **Refresh fallido**
   - Se limpian todos los tokens
   - Se rechaza la cola de requests
   - Se redirige a login

## 📱 Estados de UI

Todas las páginas integradas manejan:

- ✅ **Loading** - Spinner mientras carga datos
- ✅ **Error** - Card con mensaje de error
- ✅ **Empty** - Card cuando no hay datos
- ✅ **Success** - Renderiza datos con estados visuales

## 🔒 Seguridad

- ✅ Tokens en localStorage (accesible solo por cliente)
- ✅ Cookies con SameSite=Lax para middleware
- ✅ Bearer token en headers HTTP
- ✅ Refresh automático sin exponer tokens
- ✅ Limpieza automática en logout

## 🚀 Deploy

La aplicación está desplegada en:
```
https://aiquaa-test-management-ui.vercel.app
```

### Variables de Entorno en Vercel

Asegúrate de configurar en Vercel Dashboard:
```
NEXT_PUBLIC_API_BASE_URL=https://aiquaa-test-management-api-production.up.railway.app/api
NEXT_PUBLIC_AUTH_ENABLED=true
```

## 📝 Próximos Pasos

### Corto Plazo (Próximos módulos)
1. ✅ Proyectos - Formularios CRUD completos
2. ✅ Casos de Prueba - Formularios CRUD completos
3. 🔄 Ejecuciones - Integrar con `/api/test-runs`
4. 🔄 Defectos - Integrar con `/api/defects`
5. 🔄 Requisitos - Integrar con `/api/requirements` + AIQUAA Req-Lint

### Medio Plazo (Features avanzadas)
1. Dashboard con datos reales de `/api/health/metrics`
2. Importar JSON AIQUAA con preview y validación
3. Exportar a CSV/XLSX desde `/api/test-cases/export/*`
4. Matriz de riesgos con heatmap visual
5. Checklists con plantillas y progreso

### Largo Plazo (Optimizaciones)
1. Optimistic updates en mutations
2. Infinite scroll en listas largas
3. WebSockets para notificaciones en tiempo real
4. PWA para uso offline
5. Analytics y métricas de uso

## 🧪 Testing

Para probar la integración:

1. **Login**
   - Ir a https://aiquaa-test-management-ui.vercel.app/login
   - Usar: `admin@aiquaa.com` / `Admin123`
   - Verificar redirección a dashboard

2. **Proyectos**
   - Navegar a /proyectos
   - Verificar que carguen proyectos de la API
   - (Próximamente) Crear/editar/eliminar

3. **Casos de Prueba**
   - Navegar a /casos
   - Verificar que carguen casos de la API
   - (Próximamente) CRUD completo

4. **Refresh Token**
   - Esperar 15 minutos sin interactuar
   - Hacer cualquier acción
   - Verificar que NO se redirige a login (refresh automático)

## 📚 Documentación de Referencia

- [Swagger UI](https://aiquaa-test-management-api-production.up.railway.app/api/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)

---

**Última actualización:** 2024-11-02
**Estado:** ✅ Integración base completa, lista para desarrollo de features
