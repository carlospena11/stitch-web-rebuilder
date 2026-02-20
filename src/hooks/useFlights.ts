import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Flight, FlightType } from '@/types/flight';

// Mock data used as fallback when edge function is not configured
const MOCK_FLIGHTS: Record<FlightType, Flight[]> = {
  departures: [
    { id: '1', flightNumber: 'AV 504', airline: 'Avianca', airlineCode: 'AV', destination: 'Bogotá (BOG)', origin: 'San Salvador', scheduledTime: '06:15', status: 'on_time' },
    { id: '2', flightNumber: 'UA 1545', airline: 'United Airlines', airlineCode: 'UA', destination: 'Houston (IAH)', origin: 'San Salvador', scheduledTime: '07:30', status: 'boarding' },
    { id: '3', flightNumber: 'CM 831', airline: 'Copa Airlines', airlineCode: 'CM', destination: 'Panamá (PTY)', origin: 'San Salvador', scheduledTime: '08:00', status: 'on_time' },
    { id: '4', flightNumber: 'Y4 2910', airline: 'Volaris', airlineCode: 'Y4', destination: 'México (MEX)', origin: 'San Salvador', scheduledTime: '09:15', status: 'delayed' },
    { id: '5', flightNumber: 'AA 1294', airline: 'American Airlines', airlineCode: 'AA', destination: 'Miami (MIA)', origin: 'San Salvador', scheduledTime: '10:00', status: 'on_time' },
    { id: '6', flightNumber: 'DL 819', airline: 'Delta Air Lines', airlineCode: 'DL', destination: 'Atlanta (ATL)', origin: 'San Salvador', scheduledTime: '10:45', status: 'scheduled' },
    { id: '7', flightNumber: 'NK 582', airline: 'Spirit Airlines', airlineCode: 'NK', destination: 'Fort Lauderdale (FLL)', origin: 'San Salvador', scheduledTime: '11:30', status: 'on_time' },
    { id: '8', flightNumber: 'AV 616', airline: 'Avianca', airlineCode: 'AV', destination: 'San José (SJO)', origin: 'San Salvador', scheduledTime: '12:00', status: 'on_time' },
    { id: '9', flightNumber: 'CM 833', airline: 'Copa Airlines', airlineCode: 'CM', destination: 'Panamá (PTY)', origin: 'San Salvador', scheduledTime: '13:15', status: 'scheduled' },
    { id: '10', flightNumber: 'UA 1672', airline: 'United Airlines', airlineCode: 'UA', destination: 'Los Angeles (LAX)', origin: 'San Salvador', scheduledTime: '14:30', status: 'on_time' },
    { id: '11', flightNumber: 'IB 6342', airline: 'Iberia', airlineCode: 'IB', destination: 'Madrid (MAD)', origin: 'San Salvador', scheduledTime: '16:00', status: 'scheduled' },
    { id: '12', flightNumber: 'VB 3201', airline: 'VivaAerobus', airlineCode: 'VB', destination: 'Cancún (CUN)', origin: 'San Salvador', scheduledTime: '17:45', status: 'on_time' },
  ],
  arrivals: [
    { id: '101', flightNumber: 'AV 503', airline: 'Avianca', airlineCode: 'AV', destination: 'San Salvador', origin: 'Bogotá (BOG)', scheduledTime: '05:45', status: 'landed' },
    { id: '102', flightNumber: 'UA 1544', airline: 'United Airlines', airlineCode: 'UA', destination: 'San Salvador', origin: 'Houston (IAH)', scheduledTime: '06:50', status: 'landed' },
    { id: '103', flightNumber: 'CM 830', airline: 'Copa Airlines', airlineCode: 'CM', destination: 'San Salvador', origin: 'Panamá (PTY)', scheduledTime: '07:30', status: 'on_time' },
    { id: '104', flightNumber: 'AA 1293', airline: 'American Airlines', airlineCode: 'AA', destination: 'San Salvador', origin: 'Miami (MIA)', scheduledTime: '09:00', status: 'delayed' },
    { id: '105', flightNumber: 'Y4 2909', airline: 'Volaris', airlineCode: 'Y4', destination: 'San Salvador', origin: 'México (MEX)', scheduledTime: '10:15', status: 'on_time' },
    { id: '106', flightNumber: 'DL 818', airline: 'Delta Air Lines', airlineCode: 'DL', destination: 'San Salvador', origin: 'Atlanta (ATL)', scheduledTime: '11:00', status: 'on_time' },
    { id: '107', flightNumber: 'NK 581', airline: 'Spirit Airlines', airlineCode: 'NK', destination: 'San Salvador', origin: 'Fort Lauderdale (FLL)', scheduledTime: '12:30', status: 'scheduled' },
    { id: '108', flightNumber: 'AV 615', airline: 'Avianca', airlineCode: 'AV', destination: 'San Salvador', origin: 'San José (SJO)', scheduledTime: '14:00', status: 'scheduled' },
    { id: '109', flightNumber: 'CM 832', airline: 'Copa Airlines', airlineCode: 'CM', destination: 'San Salvador', origin: 'Panamá (PTY)', scheduledTime: '15:45', status: 'scheduled' },
    { id: '110', flightNumber: 'AM 652', airline: 'AeroMéxico', airlineCode: 'AM', destination: 'San Salvador', origin: 'México (MEX)', scheduledTime: '17:00', status: 'scheduled' },
  ],
};

async function fetchFlights(type: FlightType): Promise<Flight[]> {
  try {
    const { data, error } = await supabase.functions.invoke('get-flights', {
      body: { type },
    });

    if (error || !data?.flights?.length) {
      console.log('Using mock flight data');
      return MOCK_FLIGHTS[type];
    }

    return data.flights;
  } catch {
    console.log('Edge function not available, using mock data');
    return MOCK_FLIGHTS[type];
  }
}

export function useFlights(type: FlightType) {
  return useQuery({
    queryKey: ['flights', type],
    queryFn: () => fetchFlights(type),
    refetchInterval: 2 * 60 * 1000, // Refresh every 2 minutes
    staleTime: 60 * 1000,
  });
}
