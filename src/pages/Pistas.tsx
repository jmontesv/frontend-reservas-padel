import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePistas } from '@/hooks/usePistas';
import { VerHorariosButton } from '@/components/VerHorariosButton';
import { Skeleton } from "@/components/ui/skeleton";

export default function PistasView() {
  const { pistas, loading, error } = usePistas();

  if (loading) return (
    <div className="grid grid-cols-2 gap-4 m-8">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-20 rounded-md" />
        <Skeleton className="h-6 rounded-md" />
      </div>
    ))}
  </div>
  );
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <ScrollArea className="h-[400px] mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {pistas.length === 0 ? (
          <div>No hay pistas disponibles.</div>
        ) : (
          pistas.map((pista) => (
            <Card
              key={pista.id}
              className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl"
            >
              <CardHeader>
                <CardTitle>{pista.nombre}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">{pista.ubicacion}</p>
                <p className="text-sm text-gray-500 italic">{pista.tipo}</p>
                <VerHorariosButton pistaId={pista.id} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
