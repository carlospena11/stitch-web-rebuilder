import { Flight, FlightType } from '@/types/flight';
import FlightRow from './FlightRow';
import { forwardRef } from 'react';

interface FidsTableProps {
  flights: Flight[];
  type: FlightType;
  isLoading: boolean;
}

const FidsTable = forwardRef<HTMLDivElement, FidsTableProps>(({ flights, type, isLoading }, ref) => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Column headers */}
      <div className="flex items-center gap-4 px-4 py-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        <div className="w-[120px] shrink-0">Vuelo</div>
        <div className="w-[200px] shrink-0">Aerolínea</div>
        <div className="flex-1">{type === 'departures' ? 'Destino' : 'Origen'}</div>
        <div className="w-[80px] shrink-0 text-right">Hora</div>
        <div className="w-[130px] shrink-0 text-right">Estado</div>
      </div>

      {/* Scrollable flight list */}
      <div ref={ref} className="flex-1 overflow-y-auto space-y-2 pr-1 scroll-smooth">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-row rounded-lg px-4 py-3 h-14 animate-pulse" />
          ))
        ) : flights.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No hay vuelos disponibles</p>
            <p className="text-sm mt-1">Los datos se actualizarán automáticamente</p>
          </div>
        ) : (
          flights.map((flight) => (
            <FlightRow key={flight.id} flight={flight} type={type} />
          ))
        )}
      </div>
    </div>
  );
});

FidsTable.displayName = 'FidsTable';

export default FidsTable;
