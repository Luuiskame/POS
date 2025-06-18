"use client"

import * as React from "react"
import {
  LayoutDashboard,
  PackageSearch,
  ArrowLeftRight,
  BarChart3,
  Users,
  Settings2,
  Plus,
} from "lucide-react";

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { selectUserLogin } from "@/redux/features/userSlice";
import { useSelector } from "react-redux";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


 const userLogin = useSelector(selectUserLogin) 

 


 console.log("userLogin", userLogin)

 const userRole = userLogin?.role || "admin"; 

  const fullNav = [
     {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [
        { title: "Inicio", url: "/dashboard" },
      ],
    },
    {
      title: "Productos",
      url: "/dashboard/productos",
      icon: PackageSearch,
      items: [
        { title: "Listado", url: "/dashboard/productos" },
        { title: "Agregar producto", url: "/dashboard/productos/nuevo", icon: Plus },
      ],
    },
    {
      title: "ventas",
      url: "/dashboard/ventas",
      icon: ArrowLeftRight,
      items: [
        { title: "Historial", url: "/dashboard/ventas" },
        { title: "Nuevo venta", url: "/dashboard/ventas/nuevo", icon: Plus },
      ],
    },
    {
      title: "Reportes",
      url: "/dashboard/reportes",
      icon: BarChart3,
      role: "admin", // Only visible to admin
      items: [
        { title: "Ventas", url: "/dashboard/reportes/ventas" },
        { title: "Inventario", url: "/dashboard/reportes/inventario" },
      ],
    },
    {
      title: "Usuarios",
      url: "/dashboard/usuarios",
      icon: Users,
      role: "admin", // Only visible to admin
      items: [
        { title: "Listado", url: "/dashboard/usuarios" },
        { title: "Agregar usuario", url: "/dashboard/usuarios/nuevo", icon: Plus },
      ],
    },
    {
      title: "Configuración",
      url: "/dashboard/configuracion",
      icon: Settings2,
      items: [
        { title: "Perfil", url: "/dashboard/configuracion/perfil" },
        { title: "Preferencias", url: "/dashboard/configuracion/preferencias" },
      ],
    },
  ]

  // Filter the navigation items based on user role
  const navMain = fullNav.filter(item => !item.role || item.role === userRole);

// This is sample data.
const data = {
  user: {
    name: userLogin?.name || "Shadcn",
    email: userLogin?.email || "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain
};


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
