'use client'

import Button from "@/components/button"
import DatePicker from "@/components/date-picker"
import Input from "@/components/input"
import { Trip } from "@prisma/client"

interface TripReservationProps {
  trip: Trip
}

export const TripReservation = ({ trip }: TripReservationProps) => {
  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <DatePicker placeholderText="Data de início" onChange={() => { }} className="w-full" />
        <DatePicker placeholderText="Data final" onChange={() => { }} className="w-full" />
      </div>
      <Input placeholder={`Número de hóspedes (máx: ${trip.maxGuests})`} className="mt-4" />
      <div className="flex justify-between my-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
      </div>
      <div className="w-full pb-10 border-b border-grayLighter">
        <Button variant="primary" className="w-full">Reservar agora</Button>
      </div>
    </div>
  )
}