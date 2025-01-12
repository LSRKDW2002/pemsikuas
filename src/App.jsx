import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CRUD from "./pages/CRUD";

const App = () => {
  const location = useLocation();

  // Periksa jika rute saat ini adalah login atau register
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crud" element={<CRUD />} />
        </Routes>
      </main>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;