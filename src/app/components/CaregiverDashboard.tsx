import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserPlus, Settings, LogOut, HeartPulse, UserCircle2, Bell, MapPin, ChevronRight, User, Activity, Calendar, Volume2, VolumeX, X, Pill, Sparkles } from "lucide-react";
import { useVoice } from "../context/VoiceContext";
import { demoElderly } from "../data/demoData";

const demoNotifications = [
  { icon: Pill, color: "bg-emerald-50 text-emerald-600", title: "Medicina tomada", detail: "María confirmó su Losartán de las 8:00 AM.", time: "Hace 20 min" },
  { icon: Bell, color: "bg-amber-50 text-amber-600", title: "Stock crítico", detail: "Quedan 2 unidades de Amlodipino en el inventario.", time: "Hace 1 h" },
  { icon: MapPin, color: "bg-blue-50 text-blue-600", title: "Salida registrada", detail: "María salió de casa rumbo a la farmacia.", time: "Hace 3 h" },
];

export function CaregiverDashboard() {
  const navigate = useNavigate();
  const { speak, isNarratorActive, toggleNarrator } = useVoice();
  const [registeredElderly, setRegisteredElderly] = useState<any>(null);
  const [showNotifs, setShowNotifs] = useState(false);

  const loadDemoData = () => {
    localStorage.setItem("registeredElderly", JSON.stringify(demoElderly));
    setRegisteredElderly(demoElderly);
    speak(`Datos de demostración cargados. Ahora supervisas a ${demoElderly.name}.`);
  };

  useEffect(() => {
    const data = localStorage.getItem("registeredElderly");
    if (data) {
      setRegisteredElderly(JSON.parse(data));
    }
    speak("Bienvenido al Panel del Cuidador. Aquí puedes supervisar la salud de tus seres queridos.");
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-y-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header Panel */}
      <div className="bg-[#2B59FF] text-white px-6 pt-10 pb-14 rounded-b-[2.5rem] shadow-xl relative z-20">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/20">
              <UserCircle2 size={32} />
            </div>
            <div>
              <p className="text-blue-100 text-sm font-semibold opacity-80">¡Bienvenido!</p>
              <h1 className="text-xl font-bold tracking-tight" onMouseEnter={() => speak("Título: Panel del Cuidador")}>Panel Cuidador</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={toggleNarrator}
              onMouseEnter={() => speak(isNarratorActive ? "Desactivar voz" : "Activar voz")}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isNarratorActive ? "bg-white text-[#2B59FF]" : "bg-white/10 text-white"}`}
              title={isNarratorActive ? "Desactivar voz" : "Activar voz"}
            >
              {isNarratorActive ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={() => {
                speak("Abriendo notificaciones");
                setShowNotifs(true);
              }}
              onMouseEnter={() => speak("Botón: Notificaciones")}
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center relative"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-blue-600"></span>
            </button>
            <button 
              onClick={() => {
                speak("Cerrando sesión del panel");
                navigate("/");
              }}
              onMouseEnter={() => speak("Botón: Cerrar sesión")}
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
        <p className="text-blue-100 text-base leading-relaxed max-w-xs opacity-90" onMouseEnter={() => speak("Acompaña y protege a tus seres queridos desde un solo lugar.")}>
          Acompaña y protege a tus seres queridos desde un solo lugar.
        </p>
      </div>

      <div className="px-6 -mt-6 space-y-6 relative z-30 pb-24">
        {registeredElderly ? (
          /* Registered Adult Card */
          <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-slate-100 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Cabecera Principal - Identidad Visual AMAY */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5 cursor-help" onMouseEnter={() => speak(`Perfil de ${registeredElderly.name}, ${registeredElderly.age} años. Código A M: ${registeredElderly.codigoAM}`)} onClick={() => speak(`Viendo perfil de ${registeredElderly.name}`)}>
                <div className="relative">
                  <div className="w-20 h-20 bg-blue-50 text-[#2B59FF] rounded-[2rem] flex items-center justify-center border-2 border-blue-100 shadow-inner shrink-0 overflow-hidden">
                    <User size={40} strokeWidth={2} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">{registeredElderly.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 uppercase tracking-tighter">
                      {registeredElderly.codigoAM}
                    </span>
                    <span className="text-sm font-bold text-slate-400">• {registeredElderly.age} años</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  speak("Abriendo GPS de ubicación");
                  navigate("/caregiver/gps");
                }}
                onMouseEnter={() => speak("Botón: Ver ubicación en mapa")}
                className="w-14 h-14 rounded-[1.5rem] bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-[#2B59FF] hover:text-white transition-all border border-slate-100 shadow-sm group"
              >
                <ChevronRight size={28} strokeWidth={3} className="group-active:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Grid de Estado con Semántica de Colores */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="bg-slate-50 rounded-[2rem] p-5 flex flex-col gap-3 border border-slate-100 group active:bg-blue-50 transition-colors cursor-help"
                onMouseEnter={() => speak("Ubicación actual: Miraflores, Lima")}
              >
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <MapPin size={16} strokeWidth={2.5} className="text-[#2B59FF]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em]">Ubicación</span>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800 leading-none">Miraflores</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">Lima, Perú</p>
                </div>
              </div>

              <div 
                className="bg-emerald-50/50 rounded-[2rem] p-5 flex flex-col gap-3 border border-emerald-100/50 group active:bg-emerald-100 transition-colors cursor-help"
                onMouseEnter={() => speak("Estado de salud: Estable, signos normales")}
              >
                <div className="flex items-center gap-2 text-emerald-500">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <HeartPulse size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em]">Salud</span>
                </div>
                <div>
                  <p className="text-sm font-black text-emerald-600 leading-none">Estable</p>
                  <p className="text-[10px] font-bold text-emerald-500/70 mt-1">Signos normales</p>
                </div>
              </div>
            </div>

            {/* Acción Principal con Énfasis Táctil */}
            <button
              onClick={() => {
                speak("Abriendo lista de medicación");
                navigate("/caregiver/pills");
              }}
              onMouseEnter={() => speak("Botón: Ver Medicación")}
              className="w-full bg-[#2B59FF] text-white rounded-[1.8rem] py-6 text-xl font-black shadow-xl shadow-blue-200 active:scale-[0.97] transition-all flex justify-center items-center gap-3 border-b-4 border-blue-700"
            >
              <Activity size={24} strokeWidth={3} />
              <span>Ver Medicación</span>
            </button>
          </div>
        ) : (
          /* Empty State Card */
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 bg-blue-50 text-[#2B59FF] rounded-2xl flex items-center justify-center shadow-inner">
              <HeartPulse size={36} strokeWidth={1.5} className="opacity-40" />
            </div>
            
            <div onMouseEnter={() => speak("Aún no tienes a nadie vinculado. Registra a un adulto mayor para empezar.")}>
              <h2 className="text-xl font-bold text-slate-800 leading-tight mb-2">Aún no tienes a nadie vinculado</h2>
              <p className="text-base font-semibold text-slate-400 leading-relaxed px-2">
                Registra a un adulto mayor para empezar a monitorear sus medicinas y signos vitales.
              </p>
            </div>

            <button
              onClick={() => {
                speak("Iniciando registro de nuevo adulto mayor");
                navigate("/caregiver/register-elderly");
              }}
              onMouseEnter={() => speak("Botón: Registrar adulto mayor")}
              className="w-full bg-[#2B59FF] text-white rounded-xl py-4 text-lg font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all flex justify-center items-center gap-2 mt-2"
            >
              <UserPlus size={24} strokeWidth={2.5} />
              Registrar adulto mayor
            </button>
            <button
              onClick={loadDemoData}
              onMouseEnter={() => speak("Botón: Ver con datos de ejemplo")}
              className="w-full bg-blue-50 text-[#2B59FF] rounded-xl py-4 text-base font-bold border-2 border-dashed border-blue-200 active:scale-95 transition-all flex justify-center items-center gap-2"
            >
              <Sparkles size={20} strokeWidth={2.5} />
              Ver con datos de ejemplo
            </button>
          </div>
        )}

        {/* Quick Access Grid (Mock) */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => {
              speak("Abriendo sección de Citas Médicas");
              navigate("/caregiver/appointments");
            }}
            onMouseEnter={() => speak("Botón: Citas Médicas")}
            className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-all"
          >
            <div className="w-10 h-10 bg-blue-50 text-[#2B59FF] rounded-lg flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <span className="text-sm font-bold text-slate-600">Citas Médicas</span>
          </button>
          <button 
            onClick={() => {
              speak("Abriendo sección de Ajustes");
              navigate("/caregiver/settings");
            }}
            onMouseEnter={() => speak("Botón: Ajustes")}
            className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-all"
          >
            <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-lg flex items-center justify-center">
              <Settings size={20} />
            </div>
            <span className="text-sm font-bold text-slate-600">Ajustes</span>
          </button>
        </div>
      </div>

      {/* Panel de Notificaciones */}
      {showNotifs && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNotifs(false)} />
          <div className="relative bg-white w-full rounded-t-[2.5rem] shadow-2xl p-6 pb-10 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Bell size={20} className="text-[#2B59FF]" /> Notificaciones
              </h2>
              <button onClick={() => setShowNotifs(false)} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 active:scale-95">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {demoNotifications.map((n) => (
                <div
                  key={n.title}
                  onClick={() => speak(`${n.title}. ${n.detail}`)}
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className={`w-11 h-11 ${n.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <n.icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-800">{n.title}</p>
                    <p className="text-xs font-semibold text-slate-500 leading-relaxed">{n.detail}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
