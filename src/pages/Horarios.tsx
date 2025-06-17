import { useParams } from 'react-router-dom'
import { useHorarios } from '@/hooks/useHorarios'
import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area'
import { addDays, isBefore, isAfter, startOfDay } from 'date-fns'

export default function HorariosView() {
  const { pistaId } = useParams<{ pistaId: string }>()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null)
  const [open, setOpen] = useState(false)  


  const fechaFormateada = selectedDate
    ? format(selectedDate, 'yyyy-MM-dd')
    : format(new Date(), 'yyyy-MM-dd')

  const { horarios, loading, error } = useHorarios(pistaId!, fechaFormateada)

  // Limitar selección del calendario
  const today = startOfDay(new Date())
  const maxDate = startOfDay(addDays(today, 3))


  const handleConfirmar = () => {
    if (!selectedDate || !horaSeleccionada) return
    setOpen(true)
    // Aquí puedes hacer la petición a tu backend o Firestore para guardar la reserva
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Horarios disponibles
      </h1>

      <div className="flex justify-center items-start gap-10 flex-wrap">
        {/* Calendario */}
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border shadow"
            disabled={(date) => {
              const current = startOfDay(date);
              return isBefore(current, today) || isAfter(current, maxDate);
            }}
          />
        </div>

        {/* Lista de horarios */}
        <ScrollArea className="h-[300px] w-[300px]">
          <div className="grid grid-cols-1 gap-4">
            {loading && <p>Cargando horarios...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            {horarios && horarios.length === 0 ? (
              <p>No hay horarios disponibles para esta fecha.</p>
            ) : (
              horarios?.map(({ id, hora, disponible }) => (
                <Card
                  key={id}
                  className={`w-full transition-opacity ${
                    !disponible
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:shadow-md"
                  }`}
                  onClick={() => {
                    if (disponible) setHoraSeleccionada(hora);
                  }}
                >
                  <CardHeader>
                    <CardTitle>{hora}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p
                      className={
                        disponible
                          ? "text-green-500 font-semibold"
                          : "text-red-400"
                      }
                    >
                      {disponible ? "Reservar" : "No disponible"}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
      {horaSeleccionada && selectedDate && (
        <div className="mt-6 text-center">
          <p className="mb-2">
            Has seleccionado:{" "}
            <strong>
              {fechaFormateada} a las {horaSeleccionada}
            </strong>
          </p>
          <Button onClick={handleConfirmar}>Confirmar reserva</Button>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar reserva</DialogTitle>
          </DialogHeader>
          <p>
            ¿Confirmas la reserva para el <strong>{fechaFormateada}</strong> a
            las <strong>{horaSeleccionada}</strong>?
          </p>
          <DialogFooter>
            <Button
              onClick={() => {
                // Aquí podrías guardar en Firestore
                console.log(
                  "Reserva confirmada:",
                  fechaFormateada,
                  horaSeleccionada
                );
                setOpen(false);
              }}
            >
              Sí, confirmar
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
