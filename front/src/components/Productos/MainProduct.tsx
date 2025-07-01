import { productos } from "@/lib/data";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { BreadcrumbWithCustomSeparator } from "../Breadcrumb";

const MainProduct = () => {
  return (
    <div className="w-full p-4 px-5 py-10">
      <div className="mb-6">
        <BreadcrumbWithCustomSeparator
          page="Productos"
          href="/dashboard/productos"
          title="Listado"
        />
      </div>
      <DataTable columns={getColumns()} data={productos} />
    </div>
  );
};

export default MainProduct;
