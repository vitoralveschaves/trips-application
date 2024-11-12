import Button from "@/components/button"
import { Prisma } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import { toast } from "react-toastify"

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true }
  }>
  fetchReservations: () => void
}

export const UserReservationItem = ({ reservation, fetchReservations }: UserReservationItemProps) => {

  const { trip } = reservation;
  const router = useRouter();

  const handleDeleteClick = async () => {
    const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: "DELETE"
    })

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao cancelar a reservar!")
    }

    fetchReservations();
    toast.success("Reservar cancelada com sucesso!", { position: "bottom-center" })

  }

  return (
    <div>
      <div className="flex flex-col p-5 mt-5 border border-grayLighter shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter ">
          <div className="relative h-[106px] w-[124px]">
            <Image src={trip.coverImage} fill alt={trip.name} style={{ objectFit: 'cover' }} className="rounded-lg" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-medium">{trip.name}</h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary underline">{trip.location}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="font-medium text-sm">Datas</h3>
          <div className="flex gap-1 mt-1 text-sm">
            <p>{format(new Date(reservation.startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
            <div>-</div>
            <p>{format(new Date(reservation.endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
          </div>

          <h3 className="font-medium mt-5 text-sm">Hóspedes</h3>
          <p className="mt-1 text-sm">{reservation.guests} hóspedes</p>

          <h3 className="font-medium mt-5 text-primaryDarker pt-5 border-t border-grayLighter">Informações sobre o preço</h3>
          <div className="flex justify-between mt-2 items-center">
            <p className="text-primaryDarker text-sm mt-2">Total:</p>
            <p className="font-medium text-sm">R${reservation.totalPaid.toString()}</p>
          </div>
          <Button className="mt-5" variant="danger" onClick={handleDeleteClick}>Cancelar</Button>
        </div>
      </div>
    </div>
  )
}