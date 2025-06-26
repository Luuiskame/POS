import { BreadcrumbWithCustomSeparator } from "@/components/Breadcrumb";
import { ProductEditForm } from "@/components/Productos/EditFormProduct";
import { productos } from "@/lib/data";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const product = productos.find((p) => p.id === Number(id));
  const navigate = useNavigate();

  if (!product) return <div>Producto no encontrado</div>;

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <BreadcrumbWithCustomSeparator
          page="Productos"
          href="/dashboard/productos"
          title="Editar"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Editar Producto: {product.name}
        </h1>
        <ProductEditForm
          productData={product}
          onSuccess={() => navigate("/dashboard/productos")}
        />
      </div>
    </section>
  );
};

export default EditProductPage;
