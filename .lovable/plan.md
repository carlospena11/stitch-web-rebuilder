

# Panel de Información de Vuelos (FIDS) — Aeropuerto SAL

## Visión General
Recrear la pantalla de información de vuelos del Aeropuerto Internacional de El Salvador con estilo **premium dark glass**, datos en tiempo real y modo TV/kiosko con auto-scroll.

---

## Pantalla 1: Header del Aeropuerto
- Código IATA "SAL" en badge amarillo/dorado prominente
- Nombre completo: "Aeropuerto Internacional de El Salvador"
- Indicador verde de "LIVE" con texto "DATOS ACTIVOS"
- Tabs para alternar entre **SALIDAS** y **LLEGADAS**

## Pantalla 2: Tabla de Vuelos
- Columnas: **VUELO** | **LOGO** | **AEROLÍNEA** | **DESTINO/ORIGEN** | **HORA** | **ESTADO**
- Números de vuelo estilo split-flap (cada carácter en su propia casilla oscura)
- Logos de aerolíneas reales (Avianca, United, Copa, Volaris, etc.)
- Estados con colores: 🟢 ON TIME, 🟡 BOARDING, 🔴 DELAYED, ⚪ LANDED
- Estética glassmorphism oscura con bordes sutiles

## Pantalla 3: Barra de Navegación Inferior
- Botones arriba/abajo para scroll manual
- Texto "NAVEGAR"
- Reloj con hora actual en tiempo real

## Funcionalidad: Modo Kiosko
- Pantalla completa automática (fullscreen API)
- Auto-scroll suave que recorre los vuelos continuamente
- Actualización automática de datos cada 2-3 minutos
- Sin elementos de navegación web visibles

## Backend: Datos en Tiempo Real
- Integración con API de aviación (AviationStack) via Supabase Edge Function
- Consulta de vuelos de salida y llegada para el aeropuerto SAL
- Se necesitará una API key de AviationStack (plan gratuito disponible)
- Conexión a Lovable Cloud para almacenar la API key de forma segura

## Detalles de Diseño
- Fondo negro/gris muy oscuro
- Tipografía monoespaciada para números de vuelo
- Efecto glass en las filas de vuelos
- Animación tipo split-flap al actualizar datos
- Responsive pero optimizado para pantalla grande/TV

