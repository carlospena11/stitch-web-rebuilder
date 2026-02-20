import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('AVIATIONSTACK_API_KEY');
    const { type = 'departures' } = await req.json();

    if (!apiKey) {
      return new Response(
        JSON.stringify({ flights: [], error: 'API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const endpoint = type === 'departures' ? 'flights' : 'flights';
    const param = type === 'departures' ? 'dep_iata' : 'arr_iata';
    
    const url = `http://api.aviationstack.com/v1/${endpoint}?access_key=${apiKey}&${param}=SAL&limit=25`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data) {
      return new Response(
        JSON.stringify({ flights: [], error: data.error?.message || 'No data' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const flights = data.data.map((f: any, i: number) => {
      const scheduled = f.departure?.scheduled || f.arrival?.scheduled || '';
      const timeStr = scheduled ? new Date(scheduled).toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--';
      
      const statusMap: Record<string, string> = {
        scheduled: 'scheduled',
        active: 'on_time',
        landed: 'landed',
        cancelled: 'cancelled',
        incident: 'delayed',
        diverted: 'delayed',
      };

      return {
        id: `${f.flight?.iata || i}-${i}`,
        flightNumber: f.flight?.iata || f.flight?.icao || 'N/A',
        airline: f.airline?.name || 'Unknown',
        airlineCode: f.airline?.iata || '',
        destination: type === 'departures' 
          ? `${f.arrival?.airport || ''} (${f.arrival?.iata || ''})`
          : `${f.departure?.airport || ''} (${f.departure?.iata || ''})`,
        origin: type === 'arrivals'
          ? `${f.departure?.airport || ''} (${f.departure?.iata || ''})`
          : `${f.arrival?.airport || ''} (${f.arrival?.iata || ''})`,
        scheduledTime: timeStr,
        status: statusMap[f.flight_status] || 'scheduled',
      };
    });

    return new Response(
      JSON.stringify({ flights }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ flights: [], error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
