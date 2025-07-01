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
    { browser: "alimentos", visitors: 275, fill: "#8884d8" },
    { browser: "carnes", visitors: 200, fill: "#83a6ed" },
    { browser: "limpieza", visitors: 187, fill: "#8dd1e1" },
    { browser: "bebidas", visitors: 173, fill: "#82ca9d" },
    { browser: "other", visitors: 90, fill: "#a4de6c" },
    { browser: "panificado", visitors: 90, fill: "#3b82f6" },
    { browser: "bazar", visitors: 90, fill: "#3b8256" },

  ];

  const chartConfig = {
    alimentos: {
      label: "Alimentos",
      color: "#8884d8",
    },
    carnes: {
      label: "Carnes",
      color: "#83a6ed",
    },
    limpieza: {
      label: "Limpieza",
      color: "#8dd1e1",
    },
    bebidas: {
      label: "Bebidas",
      color: "#82ca9d",
    },
    other: {
      label: "Otros",
      color: "#a4de6c",
    },
    panificado: {
      label: "Panificado",
      color: "#3b82f6",
    },
    bazar: {
      label: "Bazar",
      color: "#3b8256",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Productos más vendidos</CardTitle>
        <CardDescription>Enero - Junio 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] w-full"
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
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              label={({
                name,
                percent,
                cx,
                cy,
                midAngle,
                outerRadius,
              }) => {
                const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 45
                const safeMidAngle = midAngle ?? 0;
                const x = cx + radius * Math.cos(-safeMidAngle * RADIAN);
                const y = cy + radius * Math.sin(-safeMidAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="var(--foreground)"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={11}
                    fontWeight={600}
                  >
                    {`${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              labelLine={{
                stroke: "var(--foreground)",
                strokeWidth: 1,
              }}
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
