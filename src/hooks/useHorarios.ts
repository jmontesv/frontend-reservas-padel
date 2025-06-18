import { useEffect, useState } from 'react';
import { fetchHorariosDisponibles, type Horario } from '@/services/Horarios';

export function useHorarios(pistaId: string, fecha: string) {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHorarios() {
      try {
        setLoading(true);
        const horariosData = await fetchHorariosDisponibles(pistaId, fecha);
        setHorarios(horariosData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (pistaId && fecha) {
      loadHorarios();
    }
  }, [pistaId, fecha]);

  return { horarios, loading, error };
}
