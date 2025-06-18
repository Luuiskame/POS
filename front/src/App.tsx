import { BrowserRouter , Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/Login";
import Main from "./Pages/Dashboard/Main";
import Layout from "./layouts/Dashboard/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
