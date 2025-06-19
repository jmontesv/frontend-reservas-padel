
import { useReservas } from "@/hooks/useReservas";
import { useEliminarReserva } from "@/hooks/useEliminarReserva";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";


export default function ReservasView() {
  const { reservas, loading, error, refetch } = useReservas();
  const { eliminarReserva, loading: loadingDelete, error: errorDelete } = useEliminarReserva(
    () => {
      toast.success("Reserva eliminada con éxito", {
        description: "Tu reserva ha sido eliminada correctamente.",
      });
      refetch();
    },
    (err) => {
      toast("Error al eliminar la reserva ❌" + err.message);
    }
  );
  
  const [eliminandoId, setEliminandoId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="grid gap-4 m-8">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-20 rounded-md" />
            <Skeleton className="h-6 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive font-semibold text-center my-8">
        Error al cargar reservas: {error}
      </div>
    );
  }

  if (reservas.length === 0) {
    return (
      <div className="text-muted-foreground text-center mt-10">
        No tienes reservas aún. ¡Haz una y empieza a jugar!
      </div>
    );
  }

  async function handleEliminar(id: string) {
    setEliminandoId(id);
    try {
      await eliminarReserva(id);
    } finally {
      setEliminandoId(null);
    }
  }

  return (
    <ScrollArea className="max-w-4xl mx-auto p-4 h-[600px]">
      {errorDelete && (
        <div className="text-destructive mb-4 text-center font-semibold">
          Error al eliminar reserva: {errorDelete.message}
        </div>
      )}
      {reservas.map(({ id, pista_nombre, fecha, hora }) => (
        <Card key={id} className="mb-4 hover:shadow-lg transition-shadow flex justify-between items-center">
          <div className="flex-1">
            <CardHeader>
              <CardTitle>Pista: {pista_nombre}</CardTitle>
              <CardDescription>Reserva ID: {id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Fecha:</strong> {fecha}</p>
              <p><strong>Horario:</strong> {hora}</p>
            </CardContent>
          </div>
          <button
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            onClick={() => handleEliminar(id)}
            disabled={loadingDelete && eliminandoId === id}
            aria-label={`Eliminar reserva ${id}`}
          >
            {loadingDelete && eliminandoId === id ? "Eliminando..." : "Eliminar"}
          </button>
        </Card>
      ))}
    </ScrollArea>
  );
}
