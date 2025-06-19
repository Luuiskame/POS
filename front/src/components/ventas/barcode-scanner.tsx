"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scan, Keyboard } from "lucide-react"

interface BarcodeScannerProps {
  onScan: (barcode: string) => void
  isScanning: boolean
  setIsScanning: (scanning: boolean) => void
}

export function BarcodeScanner({ onScan, isScanning, setIsScanning }: BarcodeScannerProps) {
  const [manualCode, setManualCode] = useState("")
  const [lastScanned, setLastScanned] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Simular escaneo automático cuando el componente está activo
  useEffect(() => {
    if (!isScanning) return

    const handleKeyPress = (event: KeyboardEvent) => {
      // Simular que el escáner envía el código seguido de Enter
      if (event.key === "Enter" && manualCode) {
        handleScan(manualCode)
        setManualCode("")
      }
    }

    document.addEventListener("keypress", handleKeyPress)
    return () => document.removeEventListener("keypress", handleKeyPress)
  }, [isScanning, manualCode])

  const handleScan = (code: string) => {
    if (code && code !== lastScanned) {
      setLastScanned(code)
      onScan(code)
      // Limpiar después de 2 segundos para permitir escaneos repetidos
      setTimeout(() => setLastScanned(""), 2000)
    }
  }

  const handleManualScan = () => {
    if (manualCode.trim()) {
      handleScan(manualCode.trim())
      setManualCode("")
    }
  }

  return (
    <Card className={`transition-all ${isScanning ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5" />
          Escáner de Código de Barras
          {isScanning && (
            <Badge variant="default" className="animate-pulse">
              Activo
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setIsScanning(!isScanning)}
            variant={isScanning ? "destructive" : "default"}
            className="flex-1"
          >
            <Scan className="h-4 w-4 mr-2" />
            {isScanning ? "Detener Escáner" : "Activar Escáner"}
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Código de barras manual..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleManualScan()}
              className="flex-1"
            />
            <Button onClick={handleManualScan} size="sm">
              <Keyboard className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            {isScanning
              ? "Escanee un código de barras o ingrese manualmente"
              : "Active el escáner o ingrese código manualmente"}
          </p>
        </div>

        {lastScanned && (
          <div className="p-2 bg-green-100 border border-green-300 rounded text-sm">
            <strong>Último escaneado:</strong> {lastScanned}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
