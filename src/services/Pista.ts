const API_URL = import.meta.env.VITE_API_URL;

export interface Pista {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  timestamp: string;
  creado_por: number;   
}

export async function fetchPistas(): Promise<Pista[]> {
  const res = await fetch(`${API_URL}/pistas`); 
  if (!res.ok) {
    throw new Error('Error al obtener las pistas');
  }
  const data = await res.json();
  return data;
}