import { store } from "@/lib/data";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserById } from "@/redux/features/userSlice";
import { RootState } from "@/types/RootState";
import { UserEditForm } from "@/components/Usuarios/EditForm";
import { BreadcrumbWithCustomSeparator } from "@/components/Breadcrumb";

// En tu página de edición
const EditUserPage = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) =>
    id ? selectUserById(state, id) : undefined
  );
  const navigate = useNavigate();

  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <BreadcrumbWithCustomSeparator
          page="Usuarios"
          href="/dashboard/usuarios"
          title="Editar"
        />
      </div>
      <h1 className="text-2xl font-bold mb-6">Editar Usuario</h1>
      <UserEditForm
        userData={user}
        stores={store}
        onSuccess={() => navigate("/dashboard/usuarios")}
      />
    </div>
  );
};

export default EditUserPage;
