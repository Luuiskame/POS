import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/services/authApi";
import { handleLoginSuccess } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { EyeClosed, EyeIcon } from "lucide-react";
import React from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch<AppDispatch>();
  const [logInMutation, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await logInMutation(data).unwrap();
      if (response?.user.id) {
        console.log("Login success:", response);
        // La navegación ahora se maneja en el componente de la página (LoginPage)
        dispatch(handleLoginSuccess(response.user));
      }
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Inicia sesión en tu cuenta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...register("email", { required: "Email es requerido" })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative flex items-center">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      {...register("password", {
                        required: "Contraseña es requerida",
                      })}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                    <Button
                      variant="outline"
                      className="w-1/6"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeClosed className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">
               {isLoading ? "Loading..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
