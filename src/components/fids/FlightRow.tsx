import { Flight, FlightType, getAirlineLogo } from '@/types/flight';
import SplitFlapText from './SplitFlapText';
import FlightStatus from './FlightStatus';

interface FlightRowProps {
  flight: Flight;
  type: FlightType;
}

const FlightRow = ({ flight, type }: FlightRowProps) => {
  const place = type === 'departures' ? flight.destination : flight.origin;
  const time = flight.estimatedTime || flight.scheduledTime;

  return (
    <div className="glass-row rounded-lg px-4 py-3 flex items-center gap-4 hover:bg-accent/20 transition-colors">
      {/* Flight number */}
      <div className="w-[120px] shrink-0">
        <SplitFlapText text={flight.flightNumber} />
      </div>

      {/* Airline logo + name */}
      <div className="flex items-center gap-3 w-[200px] shrink-0">
        <img
          src={getAirlineLogo(flight.airlineCode)}
          alt={flight.airline}
          className="w-8 h-8 rounded object-contain bg-white/10 p-0.5"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <span className="text-sm text-secondary-foreground truncate">{flight.airline}</span>
      </div>

      {/* Destination/Origin */}
      <div className="flex-1 min-w-0">
        <span className="text-foreground font-medium text-sm truncate block">{place}</span>
      </div>

      {/* Time */}
      <div className="w-[80px] shrink-0 text-right">
        <span className="font-mono-fids text-foreground font-semibold text-base">{time}</span>
      </div>

      {/* Status */}
      <div className="w-[130px] shrink-0 flex justify-end">
        <FlightStatus status={flight.status} />
      </div>
    </div>
  );
};

export default FlightRow;
