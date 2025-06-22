import { ProductCreateForm } from "@/components/Productos/CreateProductForm";

const Nuevo = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Producto</h1>
      <ProductCreateForm />
    </div>
  );
};

export default Nuevo;
