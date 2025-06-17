
import { useState } from "react"
import { crearReserva } from "@/services/Reservas"

export function useCrearReserva() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reservar = async ({
    pistaId,
    usuarioId,
    fecha,
    horarioId,
  }: {
    pistaId: string
    usuarioId: string
    fecha: string
    horarioId: string
  }) => {
    setLoading(true)
    setError(null)

    try {
      const result = await crearReserva({ pistaId, usuarioId, fecha, horarioId })
      return result
    } catch (err: any) {
      setError(err.message || "Error desconocido")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { reservar, loading, error }
}
