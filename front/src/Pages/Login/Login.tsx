import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";
import {
  selectTempUserData,
  selectUserLogin,
} from "@/redux/features/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useSelector(selectUserLogin);
  const tempUser = useSelector(selectTempUserData);

  React.useEffect(() => {
    // Si el usuario ya está logueado (o en el paso intermedio), redirigir.
    if (tempUser) {
      navigate("/select-store", { replace: true });
    } else if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, tempUser, navigate]);

  // Mientras se redirige, no mostrar el formulario para evitar un flash.
  if (tempUser) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-5">
        <a href="#" className="flex items-center gap-5 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <ModeToggle />
          </div>
          <span className="text-xl"></span>
          POS
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
