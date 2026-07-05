import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Activity, Droplet, Scale, Heart, Thermometer, Wind, X, Check } from "lucide-react";
import { toast } from "sonner";
import { useVoice } from "../context/VoiceContext";

type VitalKey = "presion" | "glucosa" | "peso" | "ritmo" | "temperatura" | "oxigeno";
type Vital = VitalKey | null;

interface VitalConfigItem {
  name: string;
  icon: any;
  color: string;
  bg: string;
  unit: string;
}

const vitalsConfig: Record<VitalKey, VitalConfigItem> = {
  presion: { name: "Presión Arterial", icon: Activity, color: "text-red-500", bg: "bg-red-100", unit: "mmHg" },
  glucosa: { name: "Glucosa", icon: Droplet, color: "text-blue-500", bg: "bg-blue-100", unit: "mg/dL" },
  peso: { name: "Peso", icon: Scale, color: "text-emerald-500", bg: "bg-emerald-100", unit: "kg" },
  ritmo: { name: "Ritmo Cardíaco", icon: Heart, color: "text-rose-500", bg: "bg-rose-100", unit: "lpm" },
  temperatura: { name: "Temperatura", icon: Thermometer, color: "text-orange-500", bg: "bg-orange-100", unit: "°C" },
  oxigeno: { name: "Oxígeno", icon: Wind, color: "text-cyan-500", bg: "bg-cyan-100", unit: "%" },
};

export function VitalsRegistration() {
  const navigate = useNavigate();
  const { speak } = useVoice();
  const [selectedVital, setSelectedVital] = useState<Vital>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    speak("Registro de Salud. Selecciona qué signo vital deseas registrar.");
  }, []);

  const handleSave = () => {
    if (!selectedVital) return;
    const { name, unit } = vitalsConfig[selectedVital];
    speak(`Registro de ${name} guardado: ${inputValue} ${unit}`);
    toast.success(`¡${name} registrada!`, {
      description: `Valor guardado: ${inputValue} ${unit}`,
    });
    setSelectedVital(null);
    setInputValue("");
  };

  const vitalKeys = Object.keys(vitalsConfig) as VitalKey[];

  return (
    <div className="flex-1 flex flex-col bg-slate-100 h-full overflow-y-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header Estilo Home */}
      <div className="bg-[#2B59FF] text-white px-6 pt-12 pb-16 rounded-b-[3rem] shadow-lg relative z-20">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              speak("Regresando");
              navigate(-1);
            }}
            className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={32} strokeWidth={3} />
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight" onClick={() => speak("Registro de Salud")}>Registro Salud</h1>
          <div className="w-14 h-14" />
        </div>
        <p className="text-blue-100 text-[20px] leading-relaxed">
          Selecciona una categoría para registrar tus signos vitales de hoy.
        </p>
      </div>

      {/* Grid de Signos Vitales */}
      <div className="px-5 -mt-8 space-y-4 relative z-30 pb-32">
        <div className="grid grid-cols-2 gap-4">
          {vitalKeys.map((key) => {
            const config = vitalsConfig[key];
            const IconComp = config.icon;
            return (
              <button
                key={key}
                onClick={() => { 
                  speak(`Registrando ${config.name}`);
                  setSelectedVital(key); 
                  setInputValue(""); 
                }}
                className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-50 flex flex-col items-center gap-4 active:scale-95 transition-all"
              >
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center ${config.bg} ${config.color} border-2 border-white shadow-sm`}>
                  <IconComp size={44} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-black text-slate-700 text-center leading-tight">
                  {config.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Sheet Modal */}
      {selectedVital && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            onClick={() => setSelectedVital(null)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 w-full bg-slate-50 rounded-t-[3.5rem] z-[70] shadow-2xl flex flex-col"
            style={{ maxHeight: "92vh" }}
          >
            <div className="px-8 pt-6 pb-4 shrink-0 bg-white rounded-t-[3.5rem] border-b border-slate-100">
              <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 ${vitalsConfig[selectedVital].bg} ${vitalsConfig[selectedVital].color} border-2 border-white shadow-sm`}>
                    {(() => {
                      const IconComp = vitalsConfig[selectedVital].icon;
                      return <IconComp size={36} strokeWidth={2.5} />;
                    })()}
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 leading-tight">
                    {vitalsConfig[selectedVital].name}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    speak("Cerrar");
                    setSelectedVital(null);
                  }}
                  className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 active:scale-95"
                >
                  <X size={32} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-8 py-10 flex flex-col gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-400 mb-6">Ingresa tu medición:</p>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={selectedVital === "presion" ? "120/80" : "0.0"}
                      inputMode={selectedVital === "presion" ? "text" : "decimal"}
                      className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] py-10 px-6 text-6xl font-black text-center text-[#2B59FF] focus:outline-none focus:border-[#2B59FF] shadow-inner transition-all"
                      autoFocus
                    />
                    <div className="mt-4">
                      <span className="text-3xl font-black text-slate-400 uppercase tracking-widest">
                        {vitalsConfig[selectedVital].unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 px-8 pt-6 pb-12 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <button
                onClick={handleSave}
                disabled={!inputValue}
                className="w-full bg-[#2B59FF] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-[2rem] py-7 text-3xl font-black shadow-xl shadow-blue-200 active:scale-95 transition-all flex justify-center items-center gap-4"
              >
                <Check size={36} strokeWidth={3} />
                Guardar Registro
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
