import { Route, Routes, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import { useAuth } from "./hooks/useAuth";
import PistasView from "./pages/Pistas";
import HorariosView from "./pages/Horarios";
import ReservasView from "./pages/Reservas";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/pistas" element={user ? <PistasView /> : <Navigate to="/login" />} />
      <Route path="/pistas/:pistaId/horarios" element={user ? <HorariosView /> : <Navigate to="/login" />} />
      <Route path="/reservas" element={user ? <ReservasView /> : <Navigate to="/login" />} />
    </Routes>
  );
}