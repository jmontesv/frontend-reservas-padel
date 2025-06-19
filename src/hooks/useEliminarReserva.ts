import { useState, useCallback } from "react";
import { deleteReserva } from "@/services/Reservas";

export function useEliminarReserva(onSuccess?: () => void, onError?: (error: Error) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const eliminarReserva = useCallback(
    async (reservaId: string) => {
      setLoading(true);
      setError(null);
      try {
        await deleteReserva(reservaId);
        if (onSuccess) onSuccess();
      } catch (err: any) {
        setError(err);
        if (onError) onError(err);
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, onError]
  );

  return { eliminarReserva, loading, error };
}
