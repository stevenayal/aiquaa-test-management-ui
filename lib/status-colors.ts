// Colores para estados de casos
export const caseStatusColors = {
  Borrador: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  Listo: 'bg-green-500/10 text-green-400 border-green-500/20',
  Obsoleto: 'bg-red-500/10 text-red-400 border-red-500/20',
}

// Colores para prioridades
export const priorityColors = {
  Crítica: 'bg-red-500/10 text-red-400 border-red-500/20',
  Alta: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Media: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Baja: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

// Colores para resultados de ejecución
export const resultStatusColors = {
  Pasó: 'bg-green-500/10 text-green-400 border-green-500/20',
  Falló: 'bg-red-500/10 text-red-400 border-red-500/20',
  Bloqueado: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Omitido: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  'No Ejecutado': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

// Colores para estados de run
export const runStatusColors = {
  Pendiente: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  'En Progreso': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Completada: 'bg-green-500/10 text-green-400 border-green-500/20',
  Cancelada: 'bg-red-500/10 text-red-400 border-red-500/20',
}

// Colores para estados de defectos
export const defectStatusColors = {
  Abierto: 'bg-red-500/10 text-red-400 border-red-500/20',
  'En Progreso': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Resuelto: 'bg-green-500/10 text-green-400 border-green-500/20',
  Cerrado: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  Reabierto: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

// Colores para severidades
export const severityColors = {
  Crítica: 'bg-red-500/10 text-red-400 border-red-500/20',
  Alta: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Media: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Baja: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

// Colores para estados de riesgos
export const riskStatusColors = {
  Identificado: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Mitigado: 'bg-green-500/10 text-green-400 border-green-500/20',
  Aceptado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Cerrado: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

// Función para obtener color de riesgo según nivel
export function getRiskLevelColor(level: number): string {
  if (level <= 5) return 'bg-green-500'
  if (level <= 10) return 'bg-yellow-500'
  if (level <= 15) return 'bg-orange-500'
  return 'bg-red-500'
}
