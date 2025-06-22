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

// Esquema de validación
const formUserSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  role: z.enum(["manager", "cashier"]),
  isActive: z.boolean().default(true).optional(),
  storeId: z.string().min(1, { message: "Se requiere ID de tienda" }),
});

export function UserCreateForm({ stores }: { stores: { id: string; name: string }[] }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 1. Definición del formulario
  type FormUserType = z.infer<typeof formUserSchema>;
  const form = useForm<FormUserType>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "cashier",
      isActive: true,
      storeId: "",
    },
  });

  // 2. Manejador de envío
  async function onSubmit(values: z.infer<typeof formUserSchema>) {
    try {
      console.log("Valores del formulario:", values);
      // Aquí iría la llamada a tu API para crear el usuario
      // await createUser(values);
      setSuccess("Usuario creado exitosamente");
      setError(null);
      form.reset();
    } catch (err) {
      setError("Error al crear el usuario");
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
                    placeholder="••••••"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Mínimo 6 caracteres
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-50">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="cashier">Cajero</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Permisos del usuario en el sistema
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Usuario activo</FormLabel>
                  <FormDescription>
                    Desmarca para desactivar este usuario
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Crear Usuario
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