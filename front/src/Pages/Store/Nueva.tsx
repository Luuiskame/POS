import { BreadcrumbWithCustomSeparator } from "@/components/Breadcrumb";
import { StoreCreateForm } from "@/components/stores/createStoreForm";

const Nueva = () => {
  return (
    <div className="flex flex-col gap-4 py-5 px-10">
      <div className="mb-6">
        <BreadcrumbWithCustomSeparator
          page="Tiendas"
          href="/dashboard/store"
          title="Nuevo"
        />
      </div>
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Tienda</h1>
      <StoreCreateForm />
    </div>
  );
};

export default Nueva;
