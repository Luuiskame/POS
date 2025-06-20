import { productos } from "@/lib/data"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"



const MainProduct = () => {
  return (
    <div className="w-full p-4 px-5 py-10">
      <DataTable columns={getColumns()} data={productos} />

    </div>
  )
}

export default MainProduct