import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { store } from "@/lib/data";

const Store = () => {
  return (
    <div className="flex flex-col gap-4 py-5 px-10">
      <DataTable columns={getColumns()} data={store} />
    </div>
  );
};

export default Store;