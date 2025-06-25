"use client";

import * as React from "react";
import {
  LayoutDashboard,
  PackageSearch,
  ArrowLeftRight,
  BarChart3,
  Users,
  Settings2,
  Plus,
  Store,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { selectUserLogin } from "@/redux/features/userSlice";
import { useSelector } from "react-redux";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userLogin = useSelector(selectUserLogin);

  console.log("userLogin", userLogin);

  const userRole = userLogin?.role || "admin";

  const fullNav = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [{ title: "Inicio", url: "/dashboard" }],
      roles: ["admin", "manager", "cashier"],
    },
    {
      title: "Tiendas",
      url: "/dashboard/store",
      icon: Store,
      items: [
        { title: "Listado", url: "/dashboard/store" },
        {
          title: "Agregar tienda",
          url: "/dashboard/store/nueva",
          icon: Plus,
        },
      ],
      roles: ["admin"],
    },
    {
      title: "Productos",
      url: "/dashboard/productos",
      icon: PackageSearch,
      items: [
        { title: "Listado", url: "/dashboard/productos" },
        {
          title: "Agregar producto",
          url: "/dashboard/productos/nuevo",
          icon: Plus,
        },
      ],
      roles: ["admin", "manager"],
    },
    {
      title: "Ventas",
      url: "/dashboard/ventas",
      icon: ArrowLeftRight,
      items: [
        { title: "Historial", url: "/dashboard/ventas" },
        { title: "Nueva venta", url: "/dashboard/ventas/nueva", icon: Plus },
      ],
      roles: ["admin", "manager", "cashier"],
    },
    {
      title: "Reportes",
      url: "/dashboard/reportes",
      icon: BarChart3,
      items: [
        { title: "Ventas", url: "/dashboard/reportes/ventas" },
        { title: "Inventario", url: "/dashboard/reportes/inventario" },
      ],
      roles: ["admin"],
    },
    {
      title: "Usuarios",
      url: "/dashboard/usuarios",
      icon: Users,
      items: [
        { title: "Listado", url: "/dashboard/usuarios" },
        {
          title: "Agregar usuario",
          url: "/dashboard/usuarios/nuevo",
          icon: Plus,
        },
      ],
      roles: ["admin"],
    },
    {
      title: "Configuración",
      url: "/dashboard/configuracion",
      icon: Settings2,
      items: [
        { title: "Perfil", url: "/dashboard/configuracion/perfil" },
        { title: "Preferencias", url: "/dashboard/configuracion/preferencias" },
      ],
      roles: ["admin", "manager", "cashier"],
    },
  ];

  // userRole: UserRole
  const navMain = fullNav.filter((item) => item.roles?.includes(userRole));

  const data = {
    user: {
      name: userLogin?.name || "Shadcn",
      email: userLogin?.email || "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
