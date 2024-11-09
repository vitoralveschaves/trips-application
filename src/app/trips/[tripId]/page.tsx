import { prisma } from "@/lib/prisma";
import { TripHeader } from "./components/trip-header";
import { TripReservation } from "./components/trip-reservation";

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
    </div>
  )
}
export default TripDetails;