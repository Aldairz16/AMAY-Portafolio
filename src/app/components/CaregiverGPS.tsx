import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, ExternalLink, Share2, History, Loader2, X, Footprints, Home, Pill as PillIcon, Trees } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useVoice } from "../context/VoiceContext";

// Ubicación simulada del adulto mayor: Miraflores, Lima
const LOCATION = { lat: -12.1221, lng: -77.0283 };
const STREET_NAME = "Av. José Larco 456, Miraflores";

const demoRoutes = [
  { icon: Home, time: "07:45 AM", place: "Casa", detail: "Salida registrada", color: "bg-blue-50 text-blue-600" },
  { icon: PillIcon, time: "08:20 AM", place: "Farmacia MiFarma", detail: "15 min de visita", color: "bg-emerald-50 text-emerald-600" },
  { icon: Trees, time: "09:10 AM", place: "Parque Kennedy", detail: "Caminata de 30 min", color: "bg-amber-50 text-amber-600" },
  { icon: Home, time: "10:05 AM", place: "Casa", detail: "Regreso seguro", color: "bg-blue-50 text-blue-600" },
];

export function CaregiverGPS() {
  const navigate = useNavigate();
  const { speak } = useVoice();
  const [loading, setLoading] = useState(true);
  const [showRoutes, setShowRoutes] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    speak("Viendo la ubicación del adulto mayor en el mapa.");
    return () => clearTimeout(timer);
  }, []);

  const { lat, lng } = LOCATION;
  const delta = 0.004;
  // OpenStreetMap embebido: no requiere API key, funciona en cualquier dominio
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lng}`;

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  const openGoogleMaps = () => {
    window.open(googleMapsLink, "_blank");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(googleMapsLink).catch(() => {});
    speak("Enlace de ubicación copiado. Puedes compartirlo con la familia.");
    toast.success("Enlace de ubicación copiado", {
      description: "Compártelo con la familia por WhatsApp o SMS.",
    });
  };

  const handleRefreshLocation = () => {
    setLoading(true);
    setMapKey((k) => k + 1);
    speak("Actualizando ubicación");
    setTimeout(() => {
      setLoading(false);
      toast.success("Ubicación actualizada", {
        description: "María está en casa · señal GPS fuerte.",
      });
    }, 1200);
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col h-full overflow-y-auto pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#2B59FF] text-white px-6 pt-12 pb-16 rounded-b-[3rem] shadow-lg relative z-20">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Ubicación AM</h1>
          <button
            onClick={handleShare}
            onMouseEnter={() => speak("Botón: Compartir ubicación")}
            className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all"
          >
            <Share2 size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* GPS Content */}
      <div className="px-6 -mt-8 space-y-4 relative z-30 flex-1 flex flex-col">
        {/* Map Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col relative h-[380px]">
          <div className="relative flex-1 bg-slate-200">
            {loading ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-[#2B59FF]">
                <Loader2 size={40} className="animate-spin mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest">Cargando mapa...</p>
              </div>
            ) : (
              <iframe
                key={mapKey}
                title="Mapa con la ubicación del adulto mayor"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={mapUrl}
              ></iframe>
            )}

            {/* Estado en vivo */}
            {!loading && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl shadow-md flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-black text-slate-700">María · En casa</span>
              </div>
            )}
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-black text-[#2B59FF] uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} /> Dirección Detectada
            </label>
            <p className="text-lg font-bold text-slate-800 leading-snug">
              {STREET_NAME}
            </p>
          </div>

          <button
            onClick={openGoogleMaps}
            className="w-full bg-[#2B59FF] text-white rounded-2xl py-4 font-black flex items-center justify-center gap-3 shadow-lg shadow-blue-200 active:scale-95 transition-all"
          >
            <ExternalLink size={20} />
            Ver en Google Maps App
          </button>
        </div>

        {/* Action Options */}
        <div className="grid grid-cols-2 gap-4 pb-12">
          <button
            onClick={handleRefreshLocation}
            onMouseEnter={() => speak("Botón: Actualizar ubicación actual")}
            className="bg-white rounded-3xl p-4 shadow-md border border-slate-100 flex flex-col items-center gap-2 active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <span className="text-[11px] font-black text-slate-600 text-center uppercase">Ubicación Actual</span>
          </button>
          <button
            onClick={() => {
              speak("Mostrando las rutas del día");
              setShowRoutes(true);
            }}
            onMouseEnter={() => speak("Botón: Rutas del día")}
            className="bg-white rounded-3xl p-4 shadow-md border border-slate-100 flex flex-col items-center gap-2 active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <History size={20} />
            </div>
            <span className="text-[11px] font-black text-slate-600 text-center uppercase">Rutas del Día</span>
          </button>
        </div>
      </div>

      {/* Modal Rutas del Día */}
      {showRoutes && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowRoutes(false)} />
          <div className="relative bg-white w-full rounded-t-[2.5rem] shadow-2xl p-6 pb-10 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Footprints size={20} className="text-[#2B59FF]" /> Rutas de hoy
              </h2>
              <button onClick={() => setShowRoutes(false)} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 active:scale-95">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-1">
              {demoRoutes.map((r, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-11 h-11 ${r.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <r.icon size={22} />
                    </div>
                    {i < demoRoutes.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-1" />}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-black text-slate-800">{r.place}</p>
                    <p className="text-xs font-semibold text-slate-500">{r.detail}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{r.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
