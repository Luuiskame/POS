import { BreadcrumbWithCustomSeparator } from "@/components/Breadcrumb";
import { StoreEditForm } from "@/components/stores/EditFormStore";
import { store } from "@/lib/data";
import { useNavigate, useParams } from "react-router-dom";

const EditStorePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const storeById = store.find((store) => String(store.id) === id);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <BreadcrumbWithCustomSeparator
          page="Tiendas"
          href="/dashboard/store"
          title="Editar"
        />
      </div>
      <h1>Editar tienda</h1>
      <div className="flex flex-col gap-4">
        {storeById ? (
          <StoreEditForm
            storeData={storeById}
            onSuccess={() => navigate("/dashboard/store")}
          />
        ) : (
          <p>Tienda no encontrada.</p>
        )}
      </div>
    </section>
  );
};

export default EditStorePage;
