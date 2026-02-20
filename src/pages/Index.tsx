import { useState, useRef, useCallback, useEffect } from 'react';
import { FlightType } from '@/types/flight';
import { useFlights } from '@/hooks/useFlights';
import FidsHeader from '@/components/fids/FidsHeader';
import FidsTable from '@/components/fids/FidsTable';
import FidsBottomBar from '@/components/fids/FidsBottomBar';

const SCROLL_AMOUNT = 300;
const AUTO_SCROLL_SPEED = 1; // pixels per frame
const AUTO_SCROLL_PAUSE = 3000; // pause at bottom before restarting

const Index = () => {
  const [activeTab, setActiveTab] = useState<FlightType>('departures');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

  const { data: flights = [], isLoading } = useFlights(activeTab);

  const scrollUp = useCallback(() => {
    scrollRef.current?.scrollBy({ top: -SCROLL_AMOUNT, behavior: 'smooth' });
  }, []);

  const scrollDown = useCallback(() => {
    scrollRef.current?.scrollBy({ top: SCROLL_AMOUNT, behavior: 'smooth' });
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
      console.log('Fullscreen not supported');
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Auto-scroll in kiosk mode
  useEffect(() => {
    if (!isFullscreen || !scrollRef.current) return;

    const el = scrollRef.current;
    let running = true;

    const autoScroll = () => {
      if (!running) return;

      el.scrollTop += AUTO_SCROLL_SPEED;

      // If reached bottom, pause then reset to top
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
        pauseTimeoutRef.current = window.setTimeout(() => {
          if (running) {
            el.scrollTop = 0;
            autoScrollRef.current = requestAnimationFrame(autoScroll);
          }
        }, AUTO_SCROLL_PAUSE);
        return;
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    autoScrollRef.current = requestAnimationFrame(autoScroll);

    return () => {
      running = false;
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isFullscreen, flights]);

  return (
    <div className="h-screen flex flex-col gap-3 p-4 bg-background overflow-hidden">
      <FidsHeader activeTab={activeTab} onTabChange={setActiveTab} isLive={!isLoading} />
      <FidsTable ref={scrollRef} flights={flights} type={activeTab} isLoading={isLoading} />
      <FidsBottomBar
        onScrollUp={scrollUp}
        onScrollDown={scrollDown}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
};

export default Index;
