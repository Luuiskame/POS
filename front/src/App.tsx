import { BrowserRouter , Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/Login";
import Main from "./Pages/Dashboard/Main";
import Layout from "./layouts/Dashboard/Layout";
import MainVentas from "./Pages/Ventas/nueva/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="ventas/nueva" element={<MainVentas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
