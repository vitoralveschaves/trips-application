import { TripItem } from "@/components/trip-item";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";

const getTrips = async () => {
  return await prisma.trip.findMany({});
}

const RecommendedTrips = async () => {
  const data = await getTrips();

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">Destinos recomendados</h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className="flex flex-col items-center mt-5 gap-5 lg:grid lg:grid-cols-4 lg:place-content-center lg:gap-x-24 lg:gap-y-10 lg:mt-12">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}
export default RecommendedTrips