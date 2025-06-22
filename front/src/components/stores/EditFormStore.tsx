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
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Stores } from "@/types/types";

// Esquema de validación
const formStoreSchema = z.object({
  storeId: z.string().min(3, { message: "ID inválido" }),
  name: z.string().min(3, { message: "El nombre es requerido" }),
  address: z.string().min(3, { message: "La dirección es requerida" }),
  phone: z.string().min(1, { message: "El teléfono es requerido" }),
  email: z.string().email({ message: "Email inválido" }),
});

interface StoreEditFormProps {
  storeData: Stores;
  onSuccess?: () => void;
}

export function StoreEditForm({ storeData, onSuccess }: StoreEditFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 1. Definición del formulario con valores iniciales
  const form = useForm<z.infer<typeof formStoreSchema>>({
    resolver: zodResolver(formStoreSchema),
    defaultValues: {
      storeId: storeData.id,
      name: storeData.name,
      address: storeData.address,
      phone: storeData.phone,
      email: storeData.email,
    },
  });

  // 2. Manejador de envío
  async function onSubmit(values: z.infer<typeof formStoreSchema>) {
    try {
      const dataToSend = {
        ...values,
        id: storeData.id, // Mantenemos el ID original
      };

      console.log("Valores del formulario:", dataToSend);
      // Aquí iría la llamada a tu API para actualizar la tienda
      // await updateStore(dataToSend);
      
      setSuccess("Tienda actualizada exitosamente");
      setError(null);
      
      // Resetear el formulario con los nuevos valores
      form.reset(dataToSend);
      
      // Ejecutar callback de éxito si existe
      if (onSuccess) onSuccess();
      
    } catch (err) {
      setError("Error al actualizar la tienda");
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
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre de la tienda"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Nombre comercial de la tienda
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="storeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID de Tienda</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-gray-50"
                    disabled // El ID no se puede modificar
                  />
                </FormControl>
                <FormDescription>
                  Identificador único de la tienda
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dirección completa"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Ubicación física de la tienda
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número de contacto"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Teléfono principal de la tienda
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="contacto@tienda.com"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Email de contacto principal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">
            Guardar Cambios
          </Button>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={() => form.reset()}
          >
            Revertir Cambios
          </Button>
        </div>
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