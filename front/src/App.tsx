import { BrowserRouter , Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/Login";
import Main from "./Pages/Dashboard/Main";
import Layout from "./layouts/Dashboard/Layout";
import MainVentas from "./Pages/Ventas/nueva/Main";
import Store from "./components/stores/Store";
import Nueva from "./Pages/Store/Nueva";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
