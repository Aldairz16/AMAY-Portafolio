import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, HeartPulse, Thermometer, Activity, Droplets, Bell, UserCircle2, LogOut, Info } from "lucide-react";
import { useVoice } from "../context/VoiceContext";

export function CaregiverVitals() {
  const navigate = useNavigate();
  const { speak } = useVoice();
  const [registeredElderly, setRegisteredElderly] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("registeredElderly");
    if (data) {
      setRegisteredElderly(JSON.parse(data));
    }
    speak("Viendo Signos Vitales");
  }, []);

  // Mock data for vitals
  const vitals = [
    {
      label: "Frecuencia",
      value: "72",
      unit: "BPM",
      status: "Normal",
      color: "rose",
      icon: HeartPulse,
      bg: "bg-rose-50",
      text: "text-rose-500",
      border: "border-rose-100"
    },
    {
      label: "Temperatura",
      value: "36.5",
      unit: "°C",
      status: "Estable",
      color: "orange",
      icon: Thermometer,
      bg: "bg-orange-50",
      text: "text-orange-500",
      border: "border-orange-100"
    },
    {
      label: "Oxígeno",
      value: "98",
      unit: "%",
      status: "Óptimo",
      color: "blue",
      icon: Droplets,
      bg: "bg-blue-50",
      text: "text-blue-500",
      border: "border-blue-100"
    },
    {
      label: "Presión",
      value: "120/80",
      unit: "mmHg",
      status: "Saludable",
      color: "indigo",
      icon: Activity,
      bg: "bg-indigo-50",
      text: "text-indigo-500",
      border: "border-indigo-100"
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-y-auto pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header Panel */}
      <div className="bg-[#2B59FF] text-white px-6 pt-10 pb-12 rounded-b-[2.5rem] shadow-xl relative z-20">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              speak("Regresando");
              navigate(-1);
            }}
            className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight" onClick={() => speak("Signos Vitales")}>Signos Vitales</h1>
          <div className="w-12 h-12" />
        </div>
        
        {registeredElderly && (
          <p className="text-blue-100 text-base leading-relaxed max-w-xs opacity-90">
            Monitorea en tiempo real los signos vitales de {registeredElderly.name.split(' ')[0]} para garantizar una atención oportuna y segura.
          </p>
        )}
      </div>

      <div className="px-6 -mt-4 space-y-6 relative z-30">
        {registeredElderly ? (
          <div className="space-y-4">
            {/* Vitals Grid */}
            <div className="grid grid-cols-2 gap-4">
              {vitals.map((vital, index) => (
                <div 
                  key={index}
                  onClick={() => speak(`${vital.label}: ${vital.value} ${vital.unit}. Estado: ${vital.status}`)}
                  className={`bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 flex flex-col gap-4 transition-all active:scale-95 cursor-pointer`}
                >
                  <div className={`w-12 h-12 ${vital.bg} ${vital.text} rounded-2xl flex items-center justify-center border ${vital.border}`}>
                    <vital.icon size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{vital.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-800 tracking-tight">{vital.value}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{vital.unit}</span>
                    </div>
                  </div>
                  <div className={`mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 w-fit`}>
                    <Activity size={10} />
                    {vital.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Health Report Card */}
            <div 
              className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 flex flex-col gap-4 cursor-help"
              onClick={() => speak(`Resumen del Estado: Todos los signos vitales de ${registeredElderly.name.split(' ')[0]} se encuentran dentro del rango saludable hoy.`)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-[#2B59FF] rounded-xl flex items-center justify-center">
                  <Info size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Resumen del Estado</h3>
              </div>
              <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                Todos los signos vitales de {registeredElderly.name.split(' ')[0]} se encuentran dentro del rango saludable hoy. No se han detectado anomalías en las últimas 24 horas.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center gap-5 mt-4">
            <div className="w-16 h-16 bg-blue-50 text-[#2B59FF] rounded-2xl flex items-center justify-center shadow-inner">
              <HeartPulse size={36} strokeWidth={1.5} className="opacity-40" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 leading-tight mb-2">Sin datos disponibles</h2>
              <p className="text-base font-semibold text-slate-400 leading-relaxed px-2">
                Primero debes registrar a un adulto mayor para ver su monitoreo de salud.
              </p>
            </div>
            <button
              onClick={() => {
                speak("Registrando adulto mayor");
                navigate("/caregiver/register-elderly");
              }}
              className="w-full bg-[#2B59FF] text-white rounded-xl py-4 text-lg font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all flex justify-center items-center gap-2 mt-2"
            >
              Registrar ahora
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
