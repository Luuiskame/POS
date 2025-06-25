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
// import {  useState } from "react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AlertCircle, CheckCircle2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";

const formStoreSchema = z.object({
  storeId: z.string().min(3, { message: "Error al agregar" }),
  name: z.string().min(3, { message: "El nombre es requerido" }),
  address: z.string().min(3, { message: "La dirección es requerida" }),
  phone: z.string().min(1, { message: "La razón es requerida" }),
  email: z.string().min(3, { message: "email es requerido" }),
});

export function StoreCreateForm() {


  // 1. Define your form.
  const form = useForm<z.infer<typeof formStoreSchema>>({
    resolver: zodResolver(formStoreSchema),
    defaultValues: {
      storeId: "",
      name: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formStoreSchema>) {
   console.log("Form values:", values);
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
                    placeholder="Nombre"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Nombre 
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
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Direccion"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Direccion de la tienda
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
            name="email"
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
                <FormDescription>
                   Email de la tienda
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
       
       
        <Button type="submit" >
          Agregar 
        </Button>
      </form>

      {/* Alertas de estado
      <div className="mt-5 space-y-3">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {mensaje && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {mensaje}
            </AlertDescription>
          </Alert>
        )}
      </div> */}
    </Form>
  );
}
