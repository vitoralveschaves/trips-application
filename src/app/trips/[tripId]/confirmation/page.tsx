'use client'

import { Trip } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import ReactCountryFlag from "react-country-flag";
import ptBR from 'date-fns/locale/pt-BR'
import Button from "@/components/button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface TripConfirmationProps {
  params: {
    tripId: string
  }
}

const TripConfirmation = ({ params }: TripConfirmationProps) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [price, setPrice] = useState<Number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status, data } = useSession()

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`/api/trips/check`, {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      });
      const res = await response.json();

      if (res?.error) {
        return router.push("/")
      }

      setTrip(res.trip);
      setPrice(res.totalPrice)
    };

    if (status === "unauthenticated") {
      router.push("/")
    }

    fetchTrip();
  }, [status, searchParams, params, router])

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests");

  const handleBuyClick = async () => {
    const res = await fetch("http://localhost:3000/api/trips/reservation", {
      method: "POST",
      body: Buffer.from(JSON.stringify({
        tripId: params.tripId,
        startDate: searchParams.get("startDate"),
        endDate: searchParams.get("endDate"),
        guests: Number(searchParams.get("guests")),
        userId: (data?.user as any)?.id,
        totalPaid: price
      }))
    })

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao realizar a reservar!")
    }

    router.push("/")
    toast.success("Reserva realizada com sucesso!", { position: 'bottom-center' })
  }

  if (!trip) return null;

  return (
    <div className="container mx-auto p-5 lg:max-w-[680px]">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>
      <div className="flex flex-col p-5 mt-5 border border-grayLighter shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter ">
          <div className="relative h-[106px] w-[124px]">
            <Image src={trip.coverImage} fill alt={trip.name} style={{ objectFit: 'cover' }} className="rounded-lg" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary underline">{trip.location}</p>
            </div>
          </div>
        </div>
        <h3 className="font-semibold mt-3 text-primaryDarker">Informações sobre o preço</h3>
        <div className="flex justify-between mt-3 items-center">
          <p className="text-primaryDarker text-sm">Total:</p>
          <p className="font-medium text-sm">R${price.toString()}</p>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="font-medium">Datas</h3>
        <div className="flex gap-1 mt-1 text-sm">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          <div>-</div>
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="font-medium mt-5">Hóspedes</h3>
        <p className="mt-1 text-sm">{guests} hóspedes</p>

        <Button onClick={handleBuyClick} variant="primary" className="mt-5">Finalizar compra</Button>
      </div>
    </div>
  )
}
export default TripConfirmation;