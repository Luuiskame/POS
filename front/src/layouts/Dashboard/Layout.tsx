import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { setUserLogin } from "@/redux/features/userSlice";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("userLogin");
      if (user) {
        dispatch(setUserLogin(JSON.parse(user)));
      }
    }
  }, [dispatch]);

  return (
    <ThemeProvider
    >
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <ModeToggle />
           <Outlet />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}