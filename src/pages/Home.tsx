import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-8">Cargando...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="max-w-xl w-full p-6 space-y-6 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Bienvenido a Reservas pádel 🎾
          </CardTitle>
          <p className="text-muted-foreground">
            Reserva tu pista de pádel favorita fácil y rápido.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {user ? (
            <>
              <p className="text-lg">Hola, {user.displayName || "Jugador"} 👋</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button onClick={() => navigate("/pistas")}>Ver pistas</Button>
                <Button variant="secondary" onClick={() => navigate("/reservas")}>
                  Mis reservas
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg">Inicia sesión o regístrate para comenzar a reservar.</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button onClick={() => navigate("/login")}>Iniciar sesión</Button>
                <Button variant="secondary" onClick={() => navigate("/registro")}>
                  Registrarse
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}