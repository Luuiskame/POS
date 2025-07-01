import { BreadcrumbWithCustomSeparator } from "@/components/Breadcrumb";
import { UserCreateForm } from "@/components/Usuarios/CreateFormUser";
import { store } from "@/lib/data";

// En tu página de administración
export function AdminUsersPage() {
  // Cargar tiendas desde tu API

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <BreadcrumbWithCustomSeparator
          page="Usuarios"
          href="/dashboard/usuarios"
          title="Nuevo"
        />
      </div>
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Usuario</h1>
      <UserCreateForm stores={store} />
    </div>
  );
}
