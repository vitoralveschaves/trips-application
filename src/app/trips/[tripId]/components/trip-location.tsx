import Button from "@/components/button"
import Image from "next/image"

interface TripLocationProps {
  location: string
}

export const TripLocation = ({ location }: TripLocationProps) => {
  return (
    <div className="p-5">
      <h2 className="font-semibold text-primaryDarker mb-3">Localização</h2>
      <div className="relative h-[280px] w-full">
        <Image src={'/map-mobile.png'} fill alt={location} style={{ objectFit: 'cover' }} quality={100} className="rounded-lg shadow-md" />
      </div>
      <p className="text-primaryDarker text-sm font-semibold mt-3">{location}</p>
      <Button variant="outline" className="w-full my-5">Ver no Google Maps</Button>
    </div>
  )
}