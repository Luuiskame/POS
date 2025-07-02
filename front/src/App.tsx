import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login/Login";
import Main from "./Pages/Dashboard/Main";
import Layout from "./layouts/Dashboard/Layout";
import MainVentas from "./Pages/Ventas/nueva/Main";
import Store from "./components/stores/Store";
import Nueva from "./Pages/Store/Nueva";
import MainProduct from "./components/Productos/MainProduct";
import Nuevo from "./Pages/Productos/Nuevo";
import MainUsers from "./components/Usuarios/Main";
import { AdminUsersPage } from "./Pages/Usuarios/Nuevo";
import { useSelector } from "react-redux";
import { selectIsHydrated, selectUserLogin } from "@/redux/features/userSlice";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { AuthProvider } from "./components/Control/AuthProvider";
import EditUserPage from "./Pages/Usuarios/EditUser";
import EditStorePage from "./Pages/Store/EditStore";
import EditProductPage from "./Pages/Productos/EditProduct";

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: React.ReactElement;
  roles?: string[];
}) => {
  const user = useSelector(selectUserLogin);
  const isHydrated = useSelector(selectIsHydrated);

  if (!isHydrated) {
    return (
      <div className="container flex items-center justify-center h-screen ">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Extraemos el rol desde userStores
  const userRole = user.userStores?.[0]?.role ?? "";

  // Si no está permitido el rol, redireccionamos
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Main />} />

            {/* Ventas */}
            <Route
              path="ventas/nueva"
              element={
                <ProtectedRoute
                  roles={["admin", "manager", "cashier", "superadmin"]}
                >
                  <MainVentas />
                </ProtectedRoute>
              }
            />

            {/* Tiendas */}
            <Route
              path="store"
              element={
                <ProtectedRoute roles={["admin", "superadmin"]}>
                  <Store />
                </ProtectedRoute>
              }
            />
            <Route
              path="store/nueva"
              element={
                <ProtectedRoute
                  roles={["admin", "manager", "cashier", "superadmin"]}
                >
                  <Nueva />
                </ProtectedRoute>
              }
            />

            <Route
              path="store/:id/edit"
              element={
                <ProtectedRoute roles={["admin", "manager", "superadmin"]}>
                  <EditStorePage />
                </ProtectedRoute>
              }
            />

            {/* Productos */}
            <Route
              path="productos"
              element={
                <ProtectedRoute roles={["admin", "manager", "superadmin"]}>
                  <MainProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="productos/nuevo"
              element={
                <ProtectedRoute roles={["admin", "manager", "superadmin"]}>
                  <Nuevo />
                </ProtectedRoute>
              }
            />

            <Route
              path="productos/:id/edit"
              element={
                <ProtectedRoute roles={["admin", "manager", "superadmin"]}>
                  <EditProductPage />
                </ProtectedRoute>
              }
            />

            {/* Usuarios */}
            <Route
              path="usuarios"
              element={
                <ProtectedRoute roles={["admin", "superadmin"]}>
                  <MainUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="usuarios/nuevo"
              element={
                <ProtectedRoute roles={["admin", "superadmin"]}>
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="usuarios/:id/edit"
              element={
                <ProtectedRoute roles={["admin", "superadmin"]}>
                  <EditUserPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
