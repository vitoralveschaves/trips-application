import { Trip } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import ReactCountryFlag from "react-country-flag"

interface TripItemProps {
  trip: Trip
}

export const TripItem = ({ trip }: TripItemProps) => {

  return (
    <Link href={`/trips/${trip.id}`}>
      <div className="flex flex-col">
        <div className="relative h-[280px] w-[300px]">
          <Image src={trip.coverImage} fill alt={trip.name} className="rounded-lg shadow-md" style={{ objectFit: 'cover' }} />
        </div>
        <h3 className="text-primaryDarker font-medium text-sm mt-2">{trip.name}</h3>
        <div className="flex items-center gap-1 my-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-grayPrimary">{trip.location}</p>
        </div>
        <p className="text-xs text-grayPrimary">
          <span className="text-primary font-medium">R${trip.pricePerDay.toString()}</span> por dia
        </p>
      </div>
    </Link>
  )
}