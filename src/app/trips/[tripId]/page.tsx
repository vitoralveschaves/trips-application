import { prisma } from "@/lib/prisma";
import { TripHeader } from "./components/trip-header";
import { TripReservation } from "./components/trip-reservation";
import { TripDescription } from "./components/trip-description";
import { TripHighLights } from "./components/trip-highlights";
import { TripLocation } from "./components/trip-location";

interface TripDetailsProps {
  params: {
    tripId: string;
  }
}

const getTripsDetails = async (tripId: string) => {
  const tripDetails = await prisma.trip.findUnique({
    where: {
      id: tripId
    }
  })

  return tripDetails;
}

const TripDetails = async ({ params }: TripDetailsProps) => {

  console.log("Opa", params.tripId)

  const trip = await getTripsDetails(params.tripId);

  if (!trip) return null;

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation tripStartDate={trip.startDate} tripEndDate={trip.endDate} maxGuests={trip.maxGuests} />
      <TripDescription description={trip.description} />
      <TripHighLights highLights={trip.highlights} />
      <TripLocation location={trip.location} />
    </div>
  )
}
export default TripDetails;