import { z } from 'zod'

// ============================================
// PROYECTOS
// ============================================

export const createProjectSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  status: z.enum(['Activo', 'Inactivo', 'Archivado']).default('Activo'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  teamMembers: z.array(z.string()).optional(),
})

export const updateProjectSchema = createProjectSchema.partial()

// Legacy - mantener compatibilidad
export const proyectoSchema = z.object({
  key: z
    .string()
    .min(2, 'La clave debe tener al menos 2 caracteres')
    .max(10, 'La clave debe tener máximo 10 caracteres')
    .regex(/^[A-Z0-9-]+$/, 'La clave solo puede contener letras mayúsculas, números y guiones'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  status: z.enum(['Activo', 'Inactivo', 'Archivado']),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

// ============================================
// CASOS DE PRUEBA
// ============================================

export const stepSchema = z.object({
  order: z.number().min(1),
  action: z.string().min(1, 'La acción es obligatoria'),
  expectedResult: z.string().min(1, 'El resultado esperado es obligatorio'),
  data: z.record(z.any()).optional(),
})

export const createTestCaseSchema = z.object({
  projectId: z.string().uuid('ID de proyecto inválido'),
  title: z.string().min(5, 'Mínimo 5 caracteres').max(200, 'Máximo 200 caracteres'),
  description: z.string().max(2000, 'Máximo 2000 caracteres').optional(),
  priority: z.enum(['Crítica', 'Alta', 'Media', 'Baja']),
  type: z.enum([
    'Funcional',
    'Regresión',
    'Humo',
    'Integración',
    'E2E',
    'Seguridad',
    'Performance',
  ]),
  status: z.enum(['Borrador', 'Listo', 'Obsoleto']).default('Borrador'),
  preconditions: z.array(z.string()).default([]),
  steps: z.array(stepSchema).min(1, 'Debe tener al menos un paso'),
  expectedResult: z.string().optional(),
  testData: z.record(z.any()).default({}),
  tags: z.array(z.string()).default([]),
  linkedRequirements: z.array(z.string()).default([]),
  estimatedDuration: z.number().positive('Debe ser mayor a 0').optional(),
  automationStatus: z.enum(['Manual', 'Automatable', 'Automatizado']).default('Manual'),
  automationScript: z.string().optional(),
})

export const updateTestCaseSchema = createTestCaseSchema.partial()

// Legacy - mantener compatibilidad
export const casoPruebaSchema = z.object({
  key: z.string().optional(),
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().optional(),
  priority: z.enum(['Crítica', 'Alta', 'Media', 'Baja']),
  type: z.enum([
    'Funcional',
    'Regresión',
    'Humo',
    'Integración',
    'E2E',
    'Seguridad',
    'Performance',
  ]),
  status: z.enum(['Borrador', 'Listo', 'Obsoleto']),
  preconditions: z.array(z.string()),
  steps: z.array(
    z.object({
      action: z.string().min(1, 'La acción es requerida'),
      expectedResult: z.string().min(1, 'El resultado esperado es requerido'),
      data: z.record(z.any()).optional(),
    })
  ),
  expectedResult: z.string().optional(),
  testData: z.record(z.any()),
  estimatedDuration: z.number().optional(),
  automationStatus: z.enum(['Manual', 'Automatable', 'Automatizado']),
})

// ============================================
// DEFECTOS
// ============================================

export const createDefectSchema = z.object({
  projectId: z.string().uuid('ID de proyecto inválido'),
  title: z.string().min(5, 'Mínimo 5 caracteres').max(200, 'Máximo 200 caracteres'),
  description: z.string().min(10, 'Mínimo 10 caracteres'),
  severity: z.enum(['Crítica', 'Alta', 'Media', 'Baja']),
  priority: z.enum(['Crítica', 'Alta', 'Media', 'Baja']),
  type: z.enum(['Bug', 'Defecto', 'Regresión', 'Mejora']),

  linkedCases: z.array(z.string()).default([]),
  linkedRuns: z.array(z.string()).default([]),

  foundInEnvironment: z.string().optional(),
  foundInBuild: z.string().optional(),

  reproducible: z.boolean().default(true),
  stepsToReproduce: z.array(z.string()).min(1, 'Debe incluir al menos un paso'),
  actualBehavior: z.string().optional(),
  expectedBehavior: z.string().optional(),

  assignedTo: z.string().optional(),
})

export const updateDefectSchema = createDefectSchema.partial().extend({
  status: z.enum(['Abierto', 'En Progreso', 'Resuelto', 'Cerrado', 'Reabierto']).optional(),
  resolution: z.string().optional(),
  resolvedBy: z.string().optional(),
})

// Legacy
export const defectoSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  severity: z.enum(['Crítica', 'Alta', 'Media', 'Baja']),
  priority: z.enum(['Crítica', 'Alta', 'Media', 'Baja']),
  type: z.enum(['Bug', 'Defecto', 'Regresión', 'Mejora']),
  reproducible: z.boolean(),
  stepsToReproduce: z.array(z.string()).min(1, 'Debe incluir pasos para reproducir'),
  actualBehavior: z.string().optional(),
  expectedBehavior: z.string().optional(),
  foundInEnvironment: z.string().optional(),
  foundInBuild: z.string().optional(),
  assignedTo: z.string().optional(),
})

// ============================================
// PLANES DE PRUEBA
// ============================================

export const createTestPlanSchema = z.object({
  projectId: z.string().uuid('ID de proyecto inválido'),
  name: z.string().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  status: z.enum(['Borrador', 'Activo', 'Archivado']).default('Borrador'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const updateTestPlanSchema = createTestPlanSchema.partial()

// ============================================
// EJECUCIONES (RUNS)
// ============================================

export const createRunSchema = z.object({
  projectId: z.string().uuid('ID de proyecto inválido'),
  planId: z.string().uuid('ID de plan inválido').optional(),
  name: z.string().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  configuration: z.object({
    environment: z.enum(['Dev', 'QA', 'Staging', 'Producción']).or(z.string()),
    browser: z.enum(['Chrome', 'Firefox', 'Safari', 'Edge']).optional(),
    device: z.string().optional(),
    os: z.string().optional(),
    buildVersion: z.string().optional(),
    customFields: z.record(z.string()).optional(),
  }),
  assignedTo: z.array(z.string()).optional(),
  caseIds: z.array(z.string()).optional(), // Si no hay plan
})

export const updateRunSchema = createRunSchema.partial().extend({
  status: z.enum(['Pendiente', 'En Progreso', 'Completada', 'Cancelada']).optional(),
})

export const updateCaseResultSchema = z.object({
  runId: z.string().uuid(),
  caseId: z.string().uuid(),
  status: z.enum(['Pasó', 'Falló', 'Bloqueado', 'Omitido', 'No Ejecutado']),
  comment: z.string().optional(),
  duration: z.number().positive().optional(),
  defects: z.array(z.string()).optional(),
})

// Legacy
export const runSchema = z.object({
  planId: z.string(),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  assignedTo: z.array(z.string()).min(1, 'Debe asignar al menos un tester'),
  configuration: z.object({
    environment: z.string().min(1, 'El ambiente es requerido'),
    browser: z.string().optional(),
    platform: z.string().optional(),
    buildVersion: z.string().optional(),
    customFields: z.record(z.string()).optional(),
  }),
})

// Defecto validators
export const defectoSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  severity: z.enum(['Crítica', 'Alta', 'Media', 'Baja']),
  priority: z.enum(['Crítica', 'Alta', 'Media', 'Baja']),
  type: z.enum(['Bug', 'Defecto', 'Regresión', 'Mejora']),
  reproducible: z.boolean(),
  stepsToReproduce: z.array(z.string()).min(1, 'Debe incluir pasos para reproducir'),
  actualBehavior: z.string().optional(),
  expectedBehavior: z.string().optional(),
  foundInEnvironment: z.string().optional(),
  foundInBuild: z.string().optional(),
  assignedTo: z.string().optional(),
})

// ============================================
// RIESGOS
// ============================================

export const createRiskSchema = z.object({
  projectId: z.string().uuid('ID de proyecto inválido'),
  title: z.string().min(5, 'Mínimo 5 caracteres').max(200, 'Máximo 200 caracteres'),
  description: z.string().min(10, 'Mínimo 10 caracteres'),
  category: z.enum(['Técnico', 'Negocio', 'Proyecto', 'Externo']),
  probabilidad: z.number().min(1, 'Mínimo 1').max(5, 'Máximo 5').int(),
  impacto: z.number().min(1, 'Mínimo 1').max(5, 'Máximo 5').int(),
  owner: z.string().optional(),
  linkedCases: z.array(z.string()).default([]),
  dueDate: z.string().optional(),
})

export const updateRiskSchema = createRiskSchema.partial().extend({
  estado: z.enum(['Identificado', 'Evaluado', 'Mitigado', 'Aceptado', 'Cerrado']).optional(),
  mitigation: z
    .object({
      strategy: z.enum(['Evitar', 'Transferir', 'Mitigar', 'Aceptar']),
      actions: z.array(z.string()),
      responsibleId: z.string().optional(),
      targetDate: z.string().optional(),
      status: z.enum(['Pendiente', 'En Progreso', 'Completada']),
    })
    .optional(),
})

// Legacy
export const riesgoSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  category: z.enum(['Técnico', 'Negocio', 'Operacional', 'Externo']),
  probabilidad: z.number().min(1).max(5),
  impacto: z.number().min(1).max(5),
  estado: z.enum(['Identificado', 'Mitigado', 'Aceptado', 'Cerrado']),
  estrategia: z.enum(['Mitigar', 'Aceptar', 'Transferir', 'Evitar']),
  owner: z.string().min(1, 'El responsable es requerido'),
  mitigationPlan: z.string().optional(),
  dueDate: z.string().optional(),
})

// ============================================
// CHECKLISTS
// ============================================

export const createChecklistSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  category: z.enum(['Funcional', 'API', 'Mobile', 'Security', 'Performance', 'Accessibility', 'Custom']),
  isTemplate: z.boolean().default(false),
  projectId: z.string().uuid().optional(),
  items: z
    .array(
      z.object({
        order: z.number().min(1),
        description: z.string().min(1, 'La descripción es obligatoria'),
        category: z.string().optional(),
      })
    )
    .min(1, 'Debe tener al menos un item'),
})

export const updateChecklistSchema = createChecklistSchema.partial().extend({
  status: z.enum(['Pendiente', 'En Progreso', 'Completada']).optional(),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
})

export const updateChecklistItemSchema = z.object({
  checklistId: z.string().uuid(),
  itemId: z.string().uuid(),
  isChecked: z.boolean(),
  notes: z.string().optional(),
})

// ============================================
// INTEGRACIONES
// ============================================

export const jiraConfigSchema = z.object({
  type: z.literal('Jira'),
  url: z.string().url('URL inválida'),
  email: z.string().email('Email inválido'),
  apiToken: z.string().min(1, 'Token es obligatorio'),
  projectKey: z.string().min(1, 'Clave de proyecto es obligatoria'),
  autoSync: z.boolean().default(false),
  syncInterval: z.number().positive().optional(),
})

export const azureDevOpsConfigSchema = z.object({
  type: z.literal('Azure DevOps'),
  organization: z.string().min(1, 'Organización es obligatoria'),
  project: z.string().min(1, 'Proyecto es obligatorio'),
  personalAccessToken: z.string().min(1, 'PAT es obligatorio'),
  workItemType: z.enum(['Bug', 'Test Case', 'Task']),
})

export const webhookConfigSchema = z.object({
  type: z.literal('Webhook'),
  url: z.string().url('URL inválida'),
  secret: z.string().optional(),
  events: z.array(
    z.enum(['case.created', 'case.updated', 'case.deleted', 'run.started', 'run.completed', 'defect.created', 'defect.updated'])
  ),
  headers: z.record(z.string()).optional(),
})

export const createIntegrationSchema = z.object({
  type: z.enum(['Jira', 'Azure DevOps', 'Jenkins', 'GitHub', 'GitLab', 'Slack', 'Webhook']),
  name: z.string().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  configuration: z.union([jiraConfigSchema, azureDevOpsConfigSchema, webhookConfigSchema]),
})

export const updateIntegrationSchema = createIntegrationSchema.partial().extend({
  status: z.enum(['Activo', 'Inactivo', 'Error']).optional(),
})

// ============================================
// USUARIO
// ============================================

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Ingresa tu contraseña actual'),
    newPassword: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const updateProfileSchema = z.object({
  firstName: z.string().max(50, 'Máximo 50 caracteres').optional(),
  lastName: z.string().max(50, 'Máximo 50 caracteres').optional(),
  jobTitle: z.string().max(100, 'Máximo 100 caracteres').optional(),
  department: z.string().max(100, 'Máximo 100 caracteres').optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]+$/, 'Formato de teléfono inválido')
    .optional()
    .or(z.literal('')),
  timezone: z.string().optional(),
})

export const updatePreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'auto']).optional(),
  language: z.enum(['es', 'en']).optional(),
  notifications: z
    .object({
      email: z.boolean().optional(),
      inApp: z.boolean().optional(),
      testRunComplete: z.boolean().optional(),
      defectAssigned: z.boolean().optional(),
      mentionedInComment: z.boolean().optional(),
      weeklyReport: z.boolean().optional(),
    })
    .optional(),
  defaultProject: z.string().uuid().optional(),
  itemsPerPage: z.number().min(10).max(100).optional(),
})

// ============================================
// AIQUAA IMPORT
// ============================================

export const aiquaaImportSchema = z.object({
  id_work_item: z.string(),
  datos_jira: z.object({
    key: z.string(),
    summary: z.string(),
    description: z.string().optional(),
    issue_type: z.string().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
  }),
  casos_prueba: z.array(
    z.object({
      id_caso_prueba: z.string(),
      titulo: z.string(),
      descripcion: z.string().optional(),
      pasos: z.array(z.string()),
      precondiciones: z.array(z.string()).optional(),
      datos_prueba: z.record(z.any()).optional(),
      prioridad: z.enum(['Alta', 'Media', 'Baja']),
      tipo: z.string().optional(),
      resultado_esperado: z.string().optional(),
    })
  ),
})

// ============================================
// HELPERS
// ============================================

export type ProjectFormData = z.infer<typeof createProjectSchema>
export type TestCaseFormData = z.infer<typeof createTestCaseSchema>
export type DefectFormData = z.infer<typeof createDefectSchema>
export type TestPlanFormData = z.infer<typeof createTestPlanSchema>
export type RunFormData = z.infer<typeof createRunSchema>
export type RiskFormData = z.infer<typeof createRiskSchema>
export type ChecklistFormData = z.infer<typeof createChecklistSchema>
export type IntegrationFormData = z.infer<typeof createIntegrationSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
