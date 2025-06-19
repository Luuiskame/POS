import { LoginForm } from "@/components/login-form"
import { ModeToggle } from "@/components/mode-toggle"
export default function LoginPage() {
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
  )
}