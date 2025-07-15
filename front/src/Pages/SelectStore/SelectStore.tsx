import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  selectTempUserData,
  completeLoginWithStore,
} from "@/redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { Store } from "lucide-react";
import { Stores } from "@/types/types";
import React from "react";

export function StoreSelector({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectTempUserData);
  const [userStores, setUserStores] = React.useState<Stores[]>([]);
  const [selectedStore, setSelectedStore] = React.useState<Stores | null>(null);

  React.useEffect(() => {
    if (user && user.userStores) {
      setUserStores(user.userStores);
    } else {
      // Si no hay datos de usuario (ni siquiera temporales), redirigir al login.
      navigate("/");
    }
  }, [user, navigate]);

  const handleStoreSelection = (store: Stores) => {
    setSelectedStore(store);
  };

  const handleContinue = () => {
    if (selectedStore && user) {
      // Construir el objeto de usuario final con la tienda seleccionada
      const finalUser = {
        ...user,
        activeStore: selectedStore,
      };

      // Despachar la acción que moverá los datos de tempUser a userLogin
      dispatch(completeLoginWithStore(selectedStore, finalUser));

      navigate("/dashboard");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col gap-6 max-w-2xl mx-auto", className)}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Selecciona tu tienda</CardTitle>
          <CardDescription>
            Elige la tienda con la que deseas trabajar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {userStores.map((store) => (
              <Card
                key={store.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md border-2",
                  selectedStore?.id === store.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleStoreSelection(store)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={cn(
                        "p-2 rounded-full",
                        selectedStore?.id === store.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      <Store className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {store.storeName}
                      </h3>
                      {store.storeAddress && (
                        <p className="text-xs text-gray-500 mt-1">
                          {store.storeAddress}
                        </p>
                      )}
                    </div>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2",
                        selectedStore?.id === store.id
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      )}
                    >
                      {selectedStore?.id === store.id && (
                        <div className="w-full h-full bg-white rounded-full scale-50"></div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="flex-1"
            >
              Volver
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedStore}
              className="flex-1"
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
