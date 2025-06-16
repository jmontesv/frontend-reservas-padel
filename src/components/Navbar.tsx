import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import logo from "@/assets/logo.png"

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="w-full px-6 py-4 bg-white border-b shadow-sm flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
         <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-18 w-auto" />
            <span className="text-xl font-bold">Reservas Pádel</span>
        </div>
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/" className="text-sm hover:underline">Inicio</Link>
        <Link to="/pistas" className="text-sm hover:underline">Pistas</Link>
        <Link to="/reservas" className="text-sm hover:underline">Reservas</Link>
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Iniciar sesión</Button>
            </Link>
            <Link to="/register">
              <Button>Registrarse</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}