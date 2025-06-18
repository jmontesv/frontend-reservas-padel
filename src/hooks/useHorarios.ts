import { useEffect, useState, useCallback } from 'react';
import { fetchHorariosDisponibles, type Horario } from '@/services/Horarios';

export function useHorarios(pistaId: string, fecha: string) {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHorarios = useCallback(async () => {
    try {
      setLoading(true);
      const horariosData = await fetchHorariosDisponibles(pistaId, fecha);
      setHorarios(horariosData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pistaId, fecha]);

  useEffect(() => {
    if (pistaId && fecha) {
      loadHorarios();
    }
  }, [pistaId, fecha, loadHorarios]);

  return { horarios, loading, error, refetch: loadHorarios };
}

