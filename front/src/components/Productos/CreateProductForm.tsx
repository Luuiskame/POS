"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// Esquema de validación
const formProductSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  category: z.string().min(1, { message: "La categoría es requerida" }),
  price: z.number().min(0.01, { message: "El precio debe ser mayor a 0" }),
  stock: z.number().min(0, { message: "El stock no puede ser negativo" }),
  barcode: z.string().min(1, { message: "El código de barras es requerido" }),
  description: z.string().optional(),
});

export function ProductCreateForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 1. Definición del formulario
  const form = useForm<z.infer<typeof formProductSchema>>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      barcode: "",
      description: "",
    },
  });

  // 2. Manejador de envío
  async function onSubmit(values: z.infer<typeof formProductSchema>) {
    try {
      console.log("Valores del formulario:", values);
      // Aquí iría la llamada a tu API para crear el producto
      // await createProduct(values);
      setSuccess("Producto creado exitosamente");
      setError(null);
      form.reset();
    } catch (err) {
      setError("Error al crear el producto");
      setSuccess(null);
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Producto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Camiseta de algodón"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Nombre completo del producto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Ropa, Electrónica"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Categoría principal del producto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Precio de venta al público
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Cantidad disponible en inventario
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de Barras</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: 123456789012"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Código único del producto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción detallada del producto..."
                  {...field}
                  className="bg-gray-50 min-h-[100px]"
                />
              </FormControl>
              <FormDescription>
                Información adicional sobre el producto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">
          Crear Producto
        </Button>
      </form>

      {/* Alertas de estado */}
      <div className="mt-5 space-y-3">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {success}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Form>
  );
}