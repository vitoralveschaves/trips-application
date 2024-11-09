import { prisma } from "@/lib/prisma";
import { TripHeader } from "./components/trip-header";
import { TripReservation } from "./components/trip-reservation";
import { TripDescription } from "./components/trip-description";
import { TripHighLights } from "./components/trip-highlights";

interface TripDetailsProps {
  params: {
    tridId: string;
  }
}

const getTripsDetails = async (tripId: string) => {
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId
    }
  })

  return trip;
}

const TripDetails = async ({ params }: TripDetailsProps) => {
  const trip = await getTripsDetails(params.tridId);

  if (!trip) return null;

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation trip={trip} />
      <TripDescription description={trip.description} />
      <TripHighLights highLights={trip.highlights} />
    </div>
  )
}
export default TripDetails;