import { BreadcrumbWithCustomSeparator } from "@/components/Breadcrumb";
import { ProductCreateForm } from "@/components/Productos/CreateProductForm";

const Nuevo = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <BreadcrumbWithCustomSeparator page="Productos" href="/dashboard/productos" title="Nuevo" />
      </div>
      <div className="flex flex-col gap-6 mt-5">
        <h1 className="text-2xl font-bold mb-6">Crear Nuevo Producto</h1>
        <ProductCreateForm />
      </div>
    </section>
  );
};

export default Nuevo;
