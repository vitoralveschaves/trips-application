import Button from "@/components/button"
import Image from "next/image"

interface TripLocationProps {
  location: string
}

export const TripLocation = ({ location }: TripLocationProps) => {
  return (
    <div className="p-5 lg:pb-12">
      <h2 className="font-semibold text-primaryDarker mb-3 lg:text-xl">Localização</h2>
      <div className="relative h-[280px] w-full lg:hidden">
        <Image src={'/map-mobile.png'} fill alt={location} style={{ objectFit: 'cover' }} quality={100} className="rounded-lg shadow-md" />
      </div>
      <div className="hidden relative h-[480px] w-full lg:block">
        <Image src={'/map-desktop.png'} fill alt={location} style={{ objectFit: 'cover' }} quality={100} className="rounded-lg shadow-md" />
      </div>
      <p className="text-primaryDarker text-sm font-semibold mt-3 lg:text-base lg:mt-5">{location}</p>
      <Button variant="outline" className="w-full my-5 lg:hidden">Ver no Google Maps</Button>
    </div>
  )
}