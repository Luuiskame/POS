"use client";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ChartPieLabelList() {
  const chartData = [
    { browser: "alimentos", visitors: 275, fill: "var(--chart-1)" },
    { browser: "carnes", visitors: 200, fill: "var(--chart-2)" },
    { browser: "limpieza", visitors: 187, fill: "var(--chart-3)" },
    { browser: "bebidas", visitors: 173, fill: "var(--chart-4)" },
    { browser: "other", visitors: 90, fill: "var(--chart-5)" },
    { browser: "panificado", visitors: 90, fill: "#3b82f6" },
  ];

  const chartConfig = {
    alimentos: {
      label: "Alimentos",
      color: "var(--chart-1)",
    },
    carnes: {
      label: "Carnes",
      color: "var(--chart-2)",
    },
    limpieza: {
      label: "Limpieza",
      color: "var(--chart-3)",
    },
    bebidas: {
      label: "Bebidas",
      color: "var(--chart-4)",
    },
    other: {
      label: "Otros",
      color: "var(--chart-5)",
    },
    panificado: {
      label: "Panificado",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col w-[100%]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Productos más vendidos</CardTitle>
        <CardDescription>Enero - Junio 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-[100%]"
        >
          <PieChart>
            <ChartTooltip
              content={(props) => (
                <ChartTooltipContent
                  {...props}
                  nameKey="browser"
                  labelKey="browser"
                />
              )}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              labelLine={false}
              isAnimationActive={false} // Desactiva animaciones para debugging
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          <TrendingUp className="h-4 w-4" />
          <span>Aumento del 5.2% este mes</span>
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando el total de visitantes en los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
