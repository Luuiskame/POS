import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMemo } from "react"
import { productos, store, users } from "@/lib/data";
import { ArrowDown, ArrowUp } from "lucide-react";

const Cards = () => {

     const stats = useMemo(() => {
 
        
        const productsCount = productos?.length || 0;
        const usuariosCount = users?.length || 0;
        const storesCount = store?.length || 0;
        
        return {
            productsCount,
            usuariosCount,
            storesCount,
        };
    }, []);


  return (
     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 w-100 md:w-220">
        {/* Productos */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Productos</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.productsCount}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <ArrowUp className="size-4" />
                            + 10 %
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Productos agregados <ArrowUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Productos agregados recientemente
                    </div>
                </CardFooter>
            </Card>


        {/* Tiendas */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total tiendas</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.storesCount}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <ArrowUp className="size-4" />
                            +5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Bajo 5% <ArrowUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        tiendas recientes
                    </div>
                </CardFooter>
            </Card>


        {/* Entradas */}

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total ventas</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      50
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <ArrowDown className="size-4" />
                            + 35%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        ventas recientes <ArrowDown className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                       ventas recientes
                    </div>
                </CardFooter>
            </Card>


        {/* usuarios */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total usuarios</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.usuariosCount}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <ArrowDown className="size-4" />
                            + 5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        usuarios recientes <ArrowDown className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Cumple proyecciones de crecimiento
                    </div>
                </CardFooter>
            </Card>
        </div>
  )
}

export default Cards