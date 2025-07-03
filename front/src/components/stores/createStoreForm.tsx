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
import { useCreateStoresMutation } from "@/redux/services/storeApi";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { selectUserLogin } from "@/redux/features/userSlice";
import { useSelector } from "react-redux";

const formStoreSchema = z.object({
  storeName: z.string().min(3, { message: "El nombre es requerido" }),
  storeAddress: z.string().min(3, { message: "La dirección es requerida" }),
  storeEmail: z.string().email({ message: "Email inválido" }),
  storePhone: z.string().regex(/^\d+$/, { message: "Solo números" }),
  storeId: z.string().optional(),
  userId: z.string().optional(), 
  role: z.enum(["admin", "manager", "cashier", "superadmin"]).optional(),
});

export function StoreCreateForm() {
  const user = useSelector(selectUserLogin);
  const [createStore, { isLoading }] = useCreateStoresMutation();
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const userStoreId = user?.userStores?.[0]?.storeId || "";

  // 1. Define your form.
  const form = useForm<z.infer<typeof formStoreSchema>>({
    resolver: zodResolver(formStoreSchema),
    defaultValues: {
      storeId: userStoreId,
      storeName: "",
      storeAddress: "",
      storePhone: "",
      storeEmail: "",
      userId: user?.id || "",
      role: (user?.userStores?.[0]?.role as "admin" | "manager" | "cashier" | "superadmin") || "admin", 
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formStoreSchema>) {
    console.log("values", values);
    try {
      const response = await createStore({
        id: crypto.randomUUID(),
        storeName: values.storeName,
        storeAddress: values.storeAddress,
        storePhone: values.storePhone,
        storeEmail: values.storeEmail,
        storeId: values.storeId ?? "",
        userId: values.userId ?? user?.id ?? "",
        role: (values.role as "admin" | "manager" | "cashier" | "superadmin") ?? "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }).unwrap();
      if (response) {
        setMensaje("Tienda creada exitosamente");
        form.reset();
      }
    } catch (error) {
      console.error("Error al crear la tienda:", error);

      // Acceso seguro al mensaje de error
      type ErrorWithData = { data?: { message?: string } } & { message?: string };
      const err = error as ErrorWithData;
      setError(
        typeof error === "object" && error !== null && "data" in error && typeof err.data === "object"
          ? err.data?.message ?? "Error desconocido"
          : err?.message ?? String(error)
      );
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          console.log("intentando enviar");
          form.handleSubmit(onSubmit)(e);
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>Nombre</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="storeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Direccion"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>Direccion de la tienda</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storePhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Telefono"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Telefono de contacto de la tienda
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="storeEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email de la tienda"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Email de la tienda</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Botón de submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </span>
            ) : (
              "Crear Usuario"
            )}
          </Button>
        </div>
      </form>
      <div className="mt-5 space-y-3">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {mensaje && (
          <Alert className="border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {mensaje}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Form>
  );
}
