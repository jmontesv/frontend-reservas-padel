import { getAuth } from "firebase/auth"
const API_URL = import.meta.env.VITE_API_URL;

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

  const token = await user.getIdToken();
  const res = await fetch(`${API_URL}/reservas`, {
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

export async function obtenerReservas() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("Usuario no autenticado");

  const token = await user.getIdToken();

  const res = await fetch(`${API_URL}/reservas`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error al obtener reservas");
  }

  return await res.json(); 
}

export async function deleteReserva(reservaId: string) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("Usuario no autenticado");

  const token = await user.getIdToken();

  const res = await fetch(`${API_URL}/reservas/${reservaId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error al eliminar la reserva");
  }

  return await res.json(); 
}