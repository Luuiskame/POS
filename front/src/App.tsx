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
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!user) {
    console.log("No user found, redirecting to login");
    // return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user.role)) {
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
                <ProtectedRoute roles={["admin", "manager", "cashier"]}>
                  <MainVentas />
                </ProtectedRoute>
              }
            />

            {/* Tiendas */}
            <Route
              path="store"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Store />
                </ProtectedRoute>
              }
            />
            <Route
              path="store/nueva"
              element={
                <ProtectedRoute roles={["admin", "manager", "cashier"]}>
                  <Nueva />
                </ProtectedRoute>
              }
            />

            {/* Productos */}
            <Route
              path="productos"
              element={
                <ProtectedRoute roles={["admin", "manager"]}>
                  <MainProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="productos/nuevo"
              element={
                <ProtectedRoute roles={["admin", "manager"]}>
                  <Nuevo />
                </ProtectedRoute>
              }
            />

            {/* Usuarios */}
            <Route
              path="usuarios"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <MainUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="usuarios/nuevo"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminUsersPage />
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
