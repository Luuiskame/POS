import { users } from "@/lib/data";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { selectUserLogin } from "@/redux/features/userSlice";
import { useSelector } from "react-redux";
import { BreadcrumbWithCustomSeparator } from "../Breadcrumb";

const MainUsers = () => {
  const userLogin = useSelector(selectUserLogin);

  const usuarios = users.filter((product) => product.id !== userLogin.id);

  return (
    <div className="flex flex-col gap-4 py-5 px-10">
      <div className="mb-6">
        <BreadcrumbWithCustomSeparator
          page="Usuarios"
          href="/dashboard/usuarios"
          title="Listado"
        />
      </div>
      <DataTable columns={getColumns()} data={usuarios} />
    </div>
  );
};

export default MainUsers;
