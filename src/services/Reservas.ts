import { getAuth } from "firebase/auth"

export async function crearReserva({
  pistaId,
  usuarioId,
  fecha,
  horarioId,
}: {
  pistaId: string;
  usuarioId: string;
  fecha: string; 
  horarioId: string;
}) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("Usuario no autenticado");

  const token = await user.getIdToken(true);
  const res = await fetch(`http://localhost:5000/reservas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      pista_id: pistaId,
      usuario_id: usuarioId,
      fecha: fecha,
      horario_id: horarioId,
    }),
  });

  if (!res.ok) {
    throw new Error("Error al crear la reserva");
  }

  return await res.json();
}