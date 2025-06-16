// src/components/LogoutButton.tsx
import { Button } from "@/components/ui/button";
import { logout } from "@/firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/login");
    } catch (error: any) {
      
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Cerrar sesión
    </Button>
  );
}
