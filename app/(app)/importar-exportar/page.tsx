'use client'

import { useState } from 'react'
import { Upload, Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTestCases } from '@/hooks/use-test-cases'
import { toast } from 'sonner'

// Función para exportar a CSV
function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    toast.error('No hay datos para exportar')
    return
  }

  // Obtener las claves de todas las propiedades
  const headers = Object.keys(data[0])
  
  // Crear el contenido CSV
  const csvContent = [
    // Headers
    headers.join(','),
    // Rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Escapar comillas y envolver en comillas si contiene comas o saltos de línea
        if (value === null || value === undefined) return ''
        const stringValue = String(value).replace(/"/g, '""')
        return `"${stringValue}"`
      }).join(',')
    )
  ].join('\n')

  // Crear blob y descargar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  toast.success('Archivo CSV descargado exitosamente')
}

// Función para exportar a XLSX (usando formato CSV por ahora, se puede mejorar con una librería)
function exportToXLSX(data: any[], filename: string) {
  if (!data || data.length === 0) {
    toast.error('No hay datos para exportar')
    return
  }

  // Por ahora, exportamos como CSV con extensión .xlsx
  // En producción, se debería usar una librería como 'xlsx' o 'exceljs'
  exportToCSV(data, filename)
  toast.info('Nota: Por ahora se exporta como CSV. La funcionalidad XLSX completa estará disponible próximamente.')
}

export default function ImportarExportarPage() {
  const [isExportingCSV, setIsExportingCSV] = useState(false)
  const [isExportingXLSX, setIsExportingXLSX] = useState(false)
  const { data: testCases, isLoading } = useTestCases()

  const handleExportCSV = async () => {
    setIsExportingCSV(true)
    try {
      if (!testCases || testCases.length === 0) {
        toast.error('No hay casos de prueba para exportar')
        return
      }

      // Preparar datos para exportación
      const exportData = testCases.map(tc => ({
        'ID': tc.id,
        'Clave': tc.key || '',
        'Título': tc.title,
        'Descripción': tc.description || '',
        'Prioridad': tc.priority,
        'Tipo': tc.type,
        'Estado': tc.status,
        'Proyecto ID': tc.projectId,
        'Duración Estimada': tc.estimatedDuration || '',
        'Estado Automatización': tc.automationStatus,
        'Fecha Creación': tc.createdAt || '',
        'Fecha Actualización': tc.updatedAt || '',
      }))

      exportToCSV(exportData, `casos-prueba-${new Date().toISOString().split('T')[0]}`)
    } catch (error) {
      console.error('Error al exportar CSV:', error)
      toast.error('Error al generar el archivo CSV')
    } finally {
      setIsExportingCSV(false)
    }
  }

  const handleExportXLSX = async () => {
    setIsExportingXLSX(true)
    try {
      if (!testCases || testCases.length === 0) {
        toast.error('No hay casos de prueba para exportar')
        return
      }

      // Preparar datos para exportación
      const exportData = testCases.map(tc => ({
        'ID': tc.id,
        'Clave': tc.key || '',
        'Título': tc.title,
        'Descripción': tc.description || '',
        'Prioridad': tc.priority,
        'Tipo': tc.type,
        'Estado': tc.status,
        'Proyecto ID': tc.projectId,
        'Duración Estimada': tc.estimatedDuration || '',
        'Estado Automatización': tc.automationStatus,
        'Fecha Creación': tc.createdAt || '',
        'Fecha Actualización': tc.updatedAt || '',
      }))

      exportToXLSX(exportData, `casos-prueba-${new Date().toISOString().split('T')[0]}`)
    } catch (error) {
      console.error('Error al exportar XLSX:', error)
      toast.error('Error al generar el archivo XLSX')
    } finally {
      setIsExportingXLSX(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Importar/Exportar</h1>
        <p className="text-muted-foreground">Importa casos desde JSON AIQUAA o exporta a CSV/XLSX</p>
      </div>

      <Tabs defaultValue="import">
        <TabsList>
          <TabsTrigger value="import">Importar</TabsTrigger>
          <TabsTrigger value="export">Exportar</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Importar desde JSON AIQUAA</CardTitle>
              <CardDescription>
                Importa casos de prueba desde formato JSON generado por AIQUAA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled>
                <Upload className="mr-2 h-4 w-4" />
                Seleccionar Archivo JSON
              </Button>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Formato esperado: JSON con estructura AIQUAA (id_work_item, datos_jira, casos_prueba)
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Funcionalidad en desarrollo
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exportar Casos y Resultados</CardTitle>
              <CardDescription>
                Exporta casos de prueba y resultados a CSV o XLSX
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={handleExportCSV}
                      disabled={isExportingCSV || isExportingXLSX || !testCases || testCases.length === 0}
                    >
                      {isExportingCSV ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Exportando...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Exportar a CSV
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      {testCases && testCases.length > 0 
                        ? `${testCases.length} casos disponibles para exportar`
                        : 'No hay casos de prueba para exportar'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={handleExportXLSX}
                      disabled={isExportingCSV || isExportingXLSX || !testCases || testCases.length === 0}
                    >
                      {isExportingXLSX ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Exportando...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Exportar a XLSX
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Nota: Por ahora se exporta como CSV. La funcionalidad XLSX completa estará disponible próximamente.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
