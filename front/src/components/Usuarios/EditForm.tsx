
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { User } from "@/types/types";

// Esquema de validación (similar al de creación pero sin contraseña requerida)
const formUserSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  role: z.enum(["admin", "manager", "cashier"]),
  isActive: z.boolean().default(true).optional(),
  storeId: z.string().min(1, { message: "Se requiere ID de tienda" }),
});

interface UserEditFormProps {
  userData: User;
  stores: { id: string; name: string }[];
  onSuccess?: () => void;
  currentUserId?: string; // Añadido para identificar el usuario actual
}

export function UserEditForm({ userData, stores, onSuccess, currentUserId }: UserEditFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 1. Definición del formulario con valores iniciales
   type FormUserType = z.infer<typeof formUserSchema>;
   const form = useForm<FormUserType>({
     resolver: zodResolver(formUserSchema),
    defaultValues: {
      email: userData.email,
      password: '',
      name: userData.name,
      role: userData.role,
      isActive: userData.isActive ?? true,
      storeId: userData.storeId,
     },
   });

  // 2. Manejador de envío
  async function onSubmit(values: z.infer<typeof formUserSchema>) {
    try {
      const dataToSend = {
        ...values,
        // Solo envía la contraseña si se modificó
        password: values.password || undefined,
        id: userData.id, // Incluimos el ID del usuario
      };

      console.log("Valores del formulario:", dataToSend);
      // Aquí iría la llamada a tu API para actualizar el usuario
      // await updateUser(dataToSend);
      
      setSuccess("Usuario actualizado exitosamente");
      setError(null);
      
      // Resetear el formulario con los nuevos valores
      form.reset(dataToSend);
      
      // Ejecutar callback de éxito si existe
      if (onSuccess) onSuccess();
      
    } catch (err) {
      setError("Error al actualizar el usuario");
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
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Juan Pérez"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Nombre real del usuario
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="ejemplo@tienda.com"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Email único para el login
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Dejar vacío para no cambiar"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Completa solo si deseas cambiar la contraseña
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value}
                  disabled={userData.role === 'admin'} // Deshabilitar si es admin
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-50">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="cashier">Cajero</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {userData.role === 'admin' ? 
                    "Los administradores no pueden cambiar su rol" : 
                    "Permisos del usuario en el sistema"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="storeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tienda Asignada</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-50">
                      <SelectValue placeholder="Selecciona una tienda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Tienda donde trabajará el usuario
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={userData.id === currentUserId} // Opcional: evitar desactivarse a sí mismo
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Usuario activo</FormLabel>
                  <FormDescription>
                    {userData.id === currentUserId ?
                      "No puedes desactivar tu propio usuario" :
                      "Desmarca para desactivar este usuario"}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="w-full md:w-auto">
            Guardar Cambios
          </Button>
          
          {/* Botón opcional para cancelar */}
          <Button 
            type="button" 
            variant="outline"
            onClick={() => form.reset()}
            className="w-full md:w-auto"
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