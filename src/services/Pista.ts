export interface Pista {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  timestamp: string;
  creado_por: number;   
}

export async function fetchPistas(): Promise<Pista[]> {
  const res = await fetch('http://localhost:5000/pistas'); 
  if (!res.ok) {
    throw new Error('Error al obtener las pistas');
  }
  const data = await res.json();
  return data;
}