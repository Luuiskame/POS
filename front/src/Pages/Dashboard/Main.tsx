import Cards from "@/components/dashboard/Cards"
import { ChartAreaInteractive } from "@/components/dashboard/CharVentas"




const Main = () => {
  return (
    <div className="flex flex-col gap-4 py-5 px-10">
      <h1>Dashboard</h1>
      <Cards />
      <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Ventas</h2>
      <ChartAreaInteractive />
      </div>
    </div>
  )
}

export default Main