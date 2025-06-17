
export interface Horario {
  id: string;
  hora: string;
  disponible: boolean;
}


export async function fetchHorariosDisponibles(pistaId: string, fecha: string): Promise<Horario[]> {
  const res = await fetch(`http://localhost:5000/pistas/${pistaId}/horarios_disponibles?fecha=${fecha}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Error al obtener horarios disponibles');
  }

  return data.horarios;
}