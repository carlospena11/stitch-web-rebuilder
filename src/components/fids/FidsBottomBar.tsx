import { ChevronUp, ChevronDown, Maximize, Minimize } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FidsBottomBarProps {
  onScrollUp: () => void;
  onScrollDown: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const FidsBottomBar = ({ onScrollUp, onScrollDown, isFullscreen, onToggleFullscreen }: FidsBottomBarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString('es-SV', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString('es-SV', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <footer className="glass-panel rounded-xl px-6 py-3 flex items-center justify-between">
      {/* Navigation buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onScrollUp}
          className="p-2 rounded-lg bg-accent hover:bg-accent/80 text-foreground transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={onScrollDown}
          className="p-2 rounded-lg bg-accent hover:bg-accent/80 text-foreground transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
        <span className="text-muted-foreground text-xs font-semibold tracking-wider ml-2">NAVEGAR</span>
      </div>

      {/* Fullscreen toggle */}
      <button
        onClick={onToggleFullscreen}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/80 text-foreground transition-colors"
      >
        {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        <span className="text-xs font-semibold tracking-wider">
          {isFullscreen ? 'SALIR' : 'KIOSKO'}
        </span>
      </button>

      {/* Clock */}
      <div className="text-right">
        <div className="font-mono-fids text-foreground text-2xl font-bold tracking-wider">
          {formattedTime}
        </div>
        <div className="text-muted-foreground text-xs capitalize">{formattedDate}</div>
      </div>
    </footer>
  );
};

export default FidsBottomBar;
