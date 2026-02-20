export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  destination: string;
  origin: string;
  scheduledTime: string;
  estimatedTime?: string;
  status: 'on_time' | 'boarding' | 'delayed' | 'landed' | 'departed' | 'cancelled' | 'scheduled';
  gate?: string;
  terminal?: string;
}

export type FlightType = 'departures' | 'arrivals';

export const AIRLINE_LOGOS: Record<string, string> = {
  'AV': 'https://images.kiwi.com/airlines/64/AV.png',   // Avianca
  'UA': 'https://images.kiwi.com/airlines/64/UA.png',   // United
  'CM': 'https://images.kiwi.com/airlines/64/CM.png',   // Copa
  'Y4': 'https://images.kiwi.com/airlines/64/Y4.png',   // Volaris
  'AA': 'https://images.kiwi.com/airlines/64/AA.png',   // American
  'DL': 'https://images.kiwi.com/airlines/64/DL.png',   // Delta
  'NK': 'https://images.kiwi.com/airlines/64/NK.png',   // Spirit
  'B6': 'https://images.kiwi.com/airlines/64/B6.png',   // JetBlue
  'TA': 'https://images.kiwi.com/airlines/64/TA.png',   // TACA
  'VB': 'https://images.kiwi.com/airlines/64/VB.png',   // VivaAerobus
  'AM': 'https://images.kiwi.com/airlines/64/AM.png',   // AeroMexico
  'IB': 'https://images.kiwi.com/airlines/64/IB.png',   // Iberia
};

export function getAirlineLogo(code: string): string {
  return AIRLINE_LOGOS[code] || `https://images.kiwi.com/airlines/64/${code}.png`;
}
