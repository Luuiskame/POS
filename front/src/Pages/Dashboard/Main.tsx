import Cards from "@/components/dashboard/Cards";
import { ChartPieLabelList } from "@/components/dashboard/ChartPieSimple";

import { ChartAreaInteractive } from "@/components/dashboard/CharVentas";

const Main = () => {
  return (
    <main className="flex flex-col gap-4 p-5">
      <h1>Dashboard</h1>
      <Cards />
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Ventas</h2>
        <ChartAreaInteractive />
      </div>
      <section className="mb-10 w-[100%] flex flex-col mx-auto md:flex-row gap-4">
        <div className="w-full">
          <ChartPieLabelList />
        </div>
      </section>
    </main>
  );
};

export default Main;
