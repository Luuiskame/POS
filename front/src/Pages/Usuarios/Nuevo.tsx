import { BreadcrumbWithCustomSeparator } from "@/components/Breadcrumb";
import { UserCreateForm } from "@/components/Usuarios/CreateFormUser";

// En tu página de administración
export function AdminUsersPage() {
  // Cargar tiendas desde tu API

  return (
    <main className="w-ful mx-auto p-6 ">
      <section className="mb-6">
        <BreadcrumbWithCustomSeparator
          page="Usuarios"
          href="/dashboard/usuarios"
          title="Nuevo"
        />
      </section>
      <section className="w-full flex flex-col mx-auto py-4 px-6">
        <h1 className="text-2xl font-bold mb-6">Crear Nuevo Usuario</h1>
        <UserCreateForm />
      </section>
    </main>
  );
}
