import { BrowserRouter , Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Main />} />
          
          {/*ventas*/}
          <Route path="ventas/nueva" element={<MainVentas />} />

          {/*store*/}
          <Route path="store" element={<Store />} />
          <Route path="store/nueva" element={<Nueva />} />
          
          {/*productos*/}
          <Route path="productos" element={<MainProduct />} />
          <Route path="productos/nuevo" element={<Nuevo />} />

          {/* usuarios */}
          <Route path="usuarios" element={<MainUsers />} />
          <Route path="usuarios/nuevo" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
