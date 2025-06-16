import { useEffect, useState } from 'react';
import { fetchPistas, type Pista } from '@/services/Pista';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PistasView() {
  const [pistas, setPistas] = useState<Pista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPistas()
      .then(setPistas)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando pistas...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <ScrollArea className="h-[400px]">
      {pistas.length === 0 ? (
        <div>No hay pistas disponibles.</div>
      ) : (
        pistas.map((pista) => (
          <Card key={pista.id} className="mb-4">
            <CardHeader>
              <CardTitle>{pista.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{pista.ubicacion}</p>
              <p>{pista.tipo}</p>
            </CardContent>
          </Card>
        ))
      )}
    </ScrollArea>
  );
}