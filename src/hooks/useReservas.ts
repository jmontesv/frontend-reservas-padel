import { useEffect, useState, useCallback } from 'react';
import { obtenerReservas } from '@/services/Reservas';

export function useReservas() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReservas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerReservas();
      setReservas(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReservas();
  }, [loadReservas]);

  return { reservas, loading, error, refetch: loadReservas };
}

