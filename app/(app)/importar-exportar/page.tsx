'use client'

import { Upload, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ImportarExportarPage() {
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
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Seleccionar Archivo JSON
              </Button>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Formato esperado: JSON con estructura AIQUAA (id_work_item, datos_jira, casos_prueba)
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
            <CardContent className="space-y-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar a CSV
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar a XLSX
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
