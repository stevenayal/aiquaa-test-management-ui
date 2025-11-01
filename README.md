# AIQUAA Test Management

Sistema de gestión de pruebas de software inspirado en Azure Test Plans, con integración de utilidades AIQUAA.

## Stack Tecnológico

- **Framework**: Next.js 15 + React 18 + TypeScript
- **Estilos**: TailwindCSS + shadcn/ui + lucide-react
- **Estado Global**: Zustand
- **Data Fetching**: React Query (@tanstack/react-query)
- **Validaciones**: Zod + react-hook-form
- **Internacionalización**: next-intl (español por defecto)
- **Testing**: Jest + Testing Library (unit/integration) + Playwright (E2E)
- **Calidad de Código**: ESLint + Prettier

## Características Principales

### Módulos Implementados

1. **Dashboard**: KPIs y métricas generales (casos totales, ejecutados, pasados, fallidos, defectos)
2. **Proyectos**: Lista y gestión de proyectos con estadísticas
3. **Requisitos**: Gestión de requisitos con integración AIQUAA Req-Lint
4. **Planes de Prueba**: Organización en suites estáticas y dinámicas
5. **Casos de Prueba**: CRUD completo con pasos, precondiciones, datos de prueba
6. **Ejecuciones**: Gestión de corridas y registro de resultados
7. **Defectos**: CRUD con estados, severidad y vinculación
8. **Riesgos**: Matriz de riesgos con heatmap e integración AIQUAA
9. **Checklists**: Plantillas predefinidas (Web, API, Mobile, Security)
10. **Importar/Exportar**: JSON AIQUAA → casos, CSV/XLSX export
11. **Integraciones**: Configuración de Jira, Azure DevOps, CI/CD
12. **Auditoría**: Historial de eventos y cambios

### Funcionalidades Clave

- **Autenticación Simulada**: Login con JWT (mock) - usuario: `admin@aiquaa.com`, contraseña: `admin123`
- **Dark Mode**: Tema oscuro por defecto
- **Accesibilidad**: Soporte ARIA, foco visible, contraste AA
- **Rutas Protegidas**: Middleware para protección de rutas autenticadas
- **Responsive Design**: Adaptado a diferentes tamaños de pantalla

## Estructura del Proyecto

```
aiquaa-test-management-ui/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Rutas de autenticación
│   │   └── login/
│   ├── (app)/               # Rutas de la aplicación
│   │   ├── dashboard/
│   │   ├── proyectos/
│   │   ├── casos/
│   │   ├── ejecuciones/
│   │   ├── defectos/
│   │   ├── requisitos/
│   │   ├── planes/
│   │   ├── riesgos/
│   │   ├── checklists/
│   │   ├── integraciones/
│   │   ├── auditoria/
│   │   └── importar-exportar/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/              # Componentes React
│   ├── ui/                 # Componentes shadcn/ui
│   └── layout/             # Layout components (Sidebar, Topbar)
├── lib/                    # Utilidades y helpers
│   ├── utils.ts           # Funciones de utilidad (cn, formatters)
│   ├── validators.ts      # Esquemas de validación Zod
│   ├── status-colors.ts   # Mapeos de colores por estado
│   ├── constants.ts       # Constantes de la app
│   └── api-client.ts      # Cliente API con Axios
├── stores/                 # Zustand stores
│   ├── auth-store.ts      # Estado de autenticación
│   ├── proyecto-store.ts  # Estado de proyecto actual
│   └── ui-store.ts        # Estado de UI (sidebar)
├── types/                  # Definiciones TypeScript
│   ├── common.ts
│   ├── proyecto.ts
│   ├── caso.ts
│   ├── run.ts
│   ├── defecto.ts
│   ├── riesgo.ts
│   ├── requisito.ts
│   ├── plan.ts
│   ├── checklist.ts
│   ├── integracion.ts
│   └── auditoria.ts
├── hooks/                  # Custom React hooks
├── features/               # Módulos por funcionalidad
├── e2e/                    # Tests E2E con Playwright
├── __tests__/              # Tests unitarios con Jest
├── middleware.ts           # Middleware de Next.js (protección rutas)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── jest.config.js
├── playwright.config.ts
└── package.json
```

## Setup e Instalación

### Requisitos Previos

- Node.js >= 18.17.0
- npm >= 9.0.0

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd aiquaa-test-management-ui

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.local.example .env.local

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_API_TIMEOUT=30000

# AIQUAA Services
NEXT_PUBLIC_AIQUAA_REQ_LINT_URL=http://localhost:8000/labs/req-lint
NEXT_PUBLIC_AIQUAA_RISK_MATRIX_URL=http://localhost:8000/labs/risk-matrix

# Auth (simulated for now)
NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-here

# App Configuration
NEXT_PUBLIC_APP_NAME=AIQUAA Test Management
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en http://localhost:3000

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de ESLint automáticamente
npm run format       # Formatea código con Prettier
npm run type-check   # Verifica tipos TypeScript

# Testing
npm run test         # Ejecuta tests unitarios con Jest
npm run test:watch   # Ejecuta tests en modo watch
npm run e2e          # Ejecuta tests E2E con Playwright
npm run e2e:ui       # Ejecuta tests E2E en modo UI
```

## Rutas Principales

| Ruta                   | Descripción                                     |
| ---------------------- | ----------------------------------------------- |
| `/login`               | Página de inicio de sesión                      |
| `/dashboard`           | Dashboard con KPIs y métricas                   |
| `/proyectos`           | Lista y gestión de proyectos                    |
| `/requisitos`          | Gestión de requisitos + AIQUAA Req-Lint         |
| `/planes`              | Planes de prueba con suites                     |
| `/casos`               | Casos de prueba (CRUD completo)                 |
| `/ejecuciones`         | Corridas de pruebas y resultados                |
| `/defectos`            | Gestión de defectos                             |
| `/riesgos`             | Matriz de riesgos + heatmap                     |
| `/checklists`          | Checklists con plantillas                       |
| `/importar-exportar`   | Importar JSON AIQUAA / Exportar CSV/XLSX        |
| `/integraciones`       | Configuración de integraciones externas         |
| `/auditoria`           | Historial de eventos y cambios                  |

## Integración con AIQUAA

### AIQUAA Req-Lint

- **Endpoint**: `/labs/req-lint`
- **Funcionalidad**: Analiza requisitos y proporciona métricas de calidad (claridad, completitud, testabilidad)
- **UI**: Modal en módulo de Requisitos con botón "Analizar Requisito"

### AIQUAA Risk Matrix

- **Endpoint**: `/labs/risk-matrix`
- **Funcionalidad**: Sincroniza matriz de riesgos con backend AIQUAA
- **UI**: Botón "Abrir Matriz AIQUAA" en módulo de Riesgos

### AIQUAA JSON Import

Formato de importación para casos de prueba:

```json
{
  "id_work_item": "KAN-6",
  "datos_jira": {
    "key": "KAN-6",
    "summary": "Implementar login",
    "description": "...",
    "priority": "Alta"
  },
  "casos_prueba": [
    {
      "id_caso_prueba": "TC001",
      "titulo": "Verificar login con credenciales válidas",
      "pasos": [
        "Ingresar email",
        "Ingresar contraseña",
        "Click en Login"
      ],
      "precondiciones": ["Usuario registrado"],
      "datos_prueba": {
        "usuario": "test@example.com",
        "password": "test123"
      },
      "prioridad": "Alta",
      "resultado_esperado": "Usuario autenticado correctamente"
    }
  ]
}
```

## Decisiones de Diseño

### Arquitectura

- **App Router de Next.js 15**: Para aprovechar Server Components y layouts anidados
- **Route Groups**: `(auth)` y `(app)` para separar rutas públicas y protegidas
- **Middleware**: Protección de rutas basada en token JWT (simulado)

### Estado Global

- **Zustand**: Para estado simple y persistente (auth, UI)
- **React Query**: Para data fetching, cache y sincronización con backend

### Componentes UI

- **shadcn/ui**: Componentes accesibles y personalizables basados en Radix UI
- **Dark Mode**: Tema oscuro por defecto (configurable en `app/globals.css`)

### Validaciones

- **Zod**: Schemas de validación reutilizables para formularios y datos
- **react-hook-form**: Manejo de formularios con `zodResolver`

### Testing

- **Jest + Testing Library**: Tests unitarios de utilidades y componentes
- **Playwright**: Tests E2E de flujos críticos (login, CRUD casos, importar)

## Accesibilidad

- Atributos ARIA en componentes interactivos
- Foco visible con ring de Tailwind
- Contraste de colores AA según WCAG
- Navegación por teclado soportada
- Etiquetas semánticas HTML5

## Próximos Pasos

1. **Backend Integration**: Conectar con API real (Nest.js/FastAPI)
2. **Autenticación Real**: Implementar JWT refresh token y OAuth
3. **Módulos Completos**: Completar CRUD y flujos de todos los módulos
4. **Real-time Updates**: WebSockets para notificaciones en tiempo real
5. **Reportes Avanzados**: Gráficos y dashboards con Recharts
6. **Exportación Avanzada**: PDF reports, Excel con formato
7. **Mobile App**: React Native con código compartido

## Contribución

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

MIT

## Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.

---

**Desarrollado con ❤️ para AIQUAA**
