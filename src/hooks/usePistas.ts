import { useEffect, useState } from 'react';
import { fetchPistas, type Pista } from '@/services/Pista';

export function usePistas() {
  const [pistas, setPistas] = useState<Pista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPistas()
      .then(setPistas)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { pistas, loading, error };
}
