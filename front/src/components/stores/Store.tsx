import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { store } from "@/lib/data";
import { BreadcrumbWithCustomSeparator } from "../Breadcrumb";

const Store = () => {
  return (
    <div className="flex flex-col gap-4 py-5 px-10">
      <div className="mb-6">
        <BreadcrumbWithCustomSeparator
          page="Tiendas"
          href="/dashboard/store"
          title="Listado"
        />
      </div>
      <DataTable columns={getColumns()} data={store} />
    </div>
  );
};

export default Store;
