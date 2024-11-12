import { Trip } from "@prisma/client"

interface TripDescriptionProps {
  description: string
}

export const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker lg:text-xl">Sobre a viagem</h2>
      <p className="text-xs leading-5 mt-2 text-primaryDarker lg:mt-5 lg:text-base">{description}</p>
    </div>
  )
}