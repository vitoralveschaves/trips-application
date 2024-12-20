"use client"

import { Prisma, TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserReservationItem } from "./components/user-reservation-item";
import Link from "next/link";
import Button from "@/components/button";

const MyTrips = () => {

  const [reservations, setReservations] = useState<Prisma.TripReservationGetPayload<{
    include: { trip: true }
  }>[]>([])
  const { status, data } = useSession();
  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/trips`)
    const json = await response.json();

    setReservations(json);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }

    fetchReservations();
  }, [status])

  return (
    <div className="container mx-auto p-5 lg:max-w-[600px] lg:mx-auto lg:text-center lg:pt-20">
      <h1 className="font-semibold text-primaryDarker text-xl lg:mb-2">Minhas viagens</h1>
      {reservations.length > 0 ? <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12">
        {reservations.map(reservation => (
          <UserReservationItem key={reservation.id} reservation={reservation} fetchReservations={fetchReservations} />
        ))}
      </div> :
        <div className="flex flex-col">
          <p className="font-medium text-primaryDarker mt-2">Você não possui reservas</p>
          <Link href={"/"}><Button variant="primary" className="w-full mt-5">Fazer reservar</Button></Link>
        </div>}
    </div>
  )
}
export default MyTrips;