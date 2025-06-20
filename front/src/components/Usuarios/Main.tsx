import { users } from "@/lib/data"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"
import { selectUserLogin } from "@/redux/features/userSlice"
import { useSelector } from "react-redux"

const MainUsers = () => {

  const userLogin = useSelector(selectUserLogin)

  const usuarios = users.filter(product => product.id !== userLogin.id);


  return (
    <div className="flex flex-col gap-4 py-5 px-10">
      <DataTable columns={getColumns()} data={usuarios}/>
    </div>
  )
}

export default MainUsers