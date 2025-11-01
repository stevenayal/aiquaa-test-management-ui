import { z } from 'zod'

// Proyecto validators
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

// Caso de prueba validators
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

// Run validators
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

// Riesgo validators
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

// AIQUAA Import validators
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
