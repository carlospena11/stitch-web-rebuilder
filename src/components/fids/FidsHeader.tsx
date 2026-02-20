import { FlightType } from '@/types/flight';

interface FidsHeaderProps {
  activeTab: FlightType;
  onTabChange: (tab: FlightType) => void;
  isLive: boolean;
}

const FidsHeader = ({ activeTab, onTabChange, isLive }: FidsHeaderProps) => {
  return (
    <header className="glass-panel rounded-xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* IATA Badge */}
        <div className="bg-primary text-primary-foreground font-mono-fids font-bold text-2xl px-4 py-1.5 rounded-lg tracking-wider shadow-lg shadow-primary/20">
          SAL
        </div>
        <div>
          <h1 className="text-foreground font-semibold text-lg leading-tight">
            Aeropuerto Internacional
          </h1>
          <p className="text-muted-foreground text-sm">de El Salvador</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onTabChange('departures')}
          className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'departures'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          ✈ SALIDAS
        </button>
        <button
          onClick={() => onTabChange('arrivals')}
          className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'arrivals'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          ✈ LLEGADAS
        </button>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2">
        {isLive && (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 live-pulse" />
            <span className="text-green-400 font-semibold text-xs tracking-wider">LIVE</span>
          </>
        )}
        <span className="text-muted-foreground text-xs ml-1">DATOS ACTIVOS</span>
      </div>
    </header>
  );
};

export default FidsHeader;
