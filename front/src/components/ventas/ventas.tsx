

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Plus, Minus, Trash2, Receipt, ShoppingCart, CheckCircle, AlertCircle } from "lucide-react"
import { BarcodeScanner } from "./barcode-scanner"
import { productos } from "@/lib/data"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import type { Product } from "@/types/types"
import { addItem, clearCart, removeItem, selectCartItemCount, selectCartItems, selectCartTotal, updateQuantity } from "@/redux/features/cartSlice"

interface ScanResult {
  success: boolean
  message: string
  producto?: Product
}

export default function VentasInterface() {
  const dispatch = useAppDispatch()
  const carrito = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const itemCount = useAppSelector(selectCartItemCount)
  
  const [busqueda, setBusqueda] = useState("")
  const [mostrarTicket, setMostrarTicket] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)

  // Filtrar productos por búsqueda
  const productosFiltrados = useMemo(() => {
    return productos.filter(
      (producto) =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.category.toLowerCase().includes(busqueda.toLowerCase()) ||
        (producto.barcode && producto.barcode.includes(busqueda)),
    )
  }, [busqueda])

  // Manejar escaneo de código de barras
  const handleBarcodeScan = (codigoBarras: string) => {
    const producto = productos.find((p) => p.barcode === codigoBarras)

    if (producto) {
      if (producto.stock > 0) {
        agregarAlCarrito(producto)
        setScanResult({
          success: true,
          message: `✅ ${producto.name} agregado al carrito`,
          producto,
        })
      } else {
        setScanResult({
          success: false,
          message: `❌ ${producto.name} sin stock disponible`,
          producto,
        })
      }
    } else {
      setScanResult({
        success: false,
        message: `❌ Producto no encontrado: ${codigoBarras}`,
      })
    }

    setTimeout(() => setScanResult(null), 3000)
  }

  // Agregar producto al carrito
  const agregarAlCarrito = (producto: Product) => {
    dispatch(addItem({ 
      product: producto,
      quantity: 1
    }))
  }

  // Actualizar cantidad en carrito
  const actualizarCantidad = (id: string, nuevaCantidad: number) => {
    dispatch(updateQuantity({ 
      itemId: id, 
      newQuantity: nuevaCantidad 
    }))
  }

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id: string) => {
    dispatch(removeItem({ itemId: id }))
  }

  // Limpiar carrito
  const limpiarCarrito = () => {
    dispatch(clearCart())
  }

  // Calcular totales (ahora viene de Redux)
  const impuestos = total * 0.16 // 16% de IVA
  const totalConImpuestos = total + impuestos

  // Generar ticket
  const generarTicket = () => {
    setMostrarTicket(true)
    setIsScanning(false)
    setTimeout(() => {
      limpiarCarrito()
      setMostrarTicket(false)
    }, 3000)
  }

  return (
    <div className="container w-full mx-auto p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Venta</h1>
        </div>

        {/* Resultado del escaneo */}
        {scanResult && (
          <Alert className={`mb-4`}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-medium">{scanResult.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de Productos y Escáner */}
          <div className="lg:col-span-2 space-y-6">
            {/* Escáner de Código de Barras */}
            <BarcodeScanner onScan={handleBarcodeScan} isScanning={isScanning} setIsScanning={setIsScanning} />

            {/* Panel de Productos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Productos Disponibles
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre, categoría o código de barras..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {productosFiltrados.map((producto) => (
                    <Card key={producto.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex  items-start mb-2">
                          <h3 className="font-semibold text-sm">{producto.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {producto.category}
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 font-mono">{producto.barcode}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg font-bold text-green-600">${producto.price.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">Stock: {producto.stock}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => agregarAlCarrito(producto)}
                            className="h-8 w-8 p-0"
                            disabled={producto.stock === 0}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel de Carrito y Venta */}
          <div className="space-y-6">
            {/* Carrito */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Lista de Productos
                    {itemCount > 0 && <Badge variant="default">{itemCount}</Badge>}
                  </CardTitle>
                  {itemCount > 0 && (
                    <Button variant="outline" size="sm" onClick={limpiarCarrito}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Limpiar
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {itemCount === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No hay productos escaneados</p>
                    <p className="text-sm text-gray-400 mt-2">Active el escáner o busque productos manualmente</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {carrito.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between p-3 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.product.name}</h4>
                          <p className="text-xs text-gray-500 font-mono">{item.product.barcode}</p>
                          <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} c/u</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => actualizarCantidad((item.product.id).toString(), item.quantity - 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => actualizarCantidad((item.product.id).toString(), item.quantity + 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => eliminarDelCarrito((item.product.id).toString())}
                            className="h-6 w-6 p-0 ml-2"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resumen de Venta */}
            {itemCount > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Venta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {carrito.map((item) => (
                      <div key={`summary-${item.product.id}`} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x {item.product.name}
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (16%):</span>
                      <span>${impuestos.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">${totalConImpuestos.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button onClick={generarTicket} className="w-full" size="lg" disabled={mostrarTicket}>
                    <Receipt className="h-4 w-4 mr-2" />
                    {mostrarTicket ? "Generando Ticket..." : "Generar Ticket"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Modal de Ticket */}
        {mostrarTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-80 max-w-sm">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle>Ticket de Venta</CardTitle>
                <p className="text-sm text-gray-600">Terminal 001</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <Separator />
                {carrito.map((item) => (
                  <div key={`ticket-${item.product.id}`} className="flex justify-between text-sm">
                    <div>
                      <div>
                        {item.quantity}x {item.product.name}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">{item.product.barcode}</div>
                    </div>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA:</span>
                  <span>${impuestos.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${totalConImpuestos.toFixed(2)}</span>
                </div>
                <Separator />
                <p className="text-center text-xs text-gray-500">¡Gracias por su compra!</p>
                <p className="text-center text-xs text-gray-400">Productos escaneados: {itemCount}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}