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
//import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, EyeClosed, EyeIcon, Loader2 } from "lucide-react";
import { useCreateUserMutation } from "@/redux/services/userApi";
import { useSelector } from "react-redux";
import { selectUserLogin } from "@/redux/features/userSlice";

// Esquema de validación
const formUserSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  firstName: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  role: z.enum(["manager", "cashier"]),
  isActive: z.boolean().default(true).optional(),
  storeId: z.string().min(1, { message: "Se requiere ID de tienda" }),
  lastName: z
    .string()
    .min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
});

export function UserCreateForm() {
  const user = useSelector(selectUserLogin);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation(); // Asegúrate de tener este hook configurado en tu API

  // 1. Definición del formulario
  type FormUserType = z.infer<typeof formUserSchema>;
  const form = useForm<FormUserType>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      role: "cashier",
      isActive: true,
      storeId: "",
      lastName: "",
    },
  });

  // 2. Manejador de envío
  async function onSubmit(values: z.infer<typeof formUserSchema>) {
    try {
      const response = await createUser({
        id: crypto.randomUUID(),
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
        isActive: values.isActive ?? true,
        storeId: values.storeId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }).unwrap();
      if (response) {
        setSuccess("Usuario creado exitosamente");
        setError(null);
        form.reset();
      }
    } catch (err) {
      setError("Error al crear el usuario");
      setSuccess(null);
      console.error(err);
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 space-y-6">
          {/* Nombre y Apellido */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Juan"
                    {...field}
                    className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Nombre del usuario
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Pérez"
                    {...field}
                    className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Apellido del usuario
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Email y Contraseña */}
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
                    className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Email único para el login
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••"
                      {...field}
                      className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeClosed className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                <FormDescription className="text-sm text-gray-500">
                  Mínimo 6 caracteres
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Rol y Tienda */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="cashier">Cajero</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-sm text-gray-500">
                  Permisos del usuario en el sistema
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tienda Asignada</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Selecciona una tienda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {user?.userStores?.map((store) => (
                      <SelectItem key={store.storeId} value={store.storeId}>
                        {store.storeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-sm text-gray-500">
                  Tienda donde trabajará el usuario
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Checkbox de activo
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-gray-400 data-[state=checked]:bg-blue-500"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal">Usuario activo</FormLabel>
                <FormDescription className="text-sm text-gray-500">
                  Desmarca para desactivar este usuario
                </FormDescription>
              </div>
            </FormItem>
          )}
        /> */}

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

      {/* Alertas de estado */}
      <div className="mt-6 space-y-3">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
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
