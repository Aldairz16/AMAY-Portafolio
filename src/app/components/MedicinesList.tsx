import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Pill, CheckCircle2, Clock, AlertTriangle, Plus, X, ScanLine, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useVoice } from "../context/VoiceContext";

interface Medicine {
  id: number;
  name: string;
  dose: string;
  time: string;
  frequency: string;
  status: string;
}

const initialMedicines: Medicine[] = [
  { id: 1, name: "Losartán", dose: "50 mg", time: "08:00 AM", frequency: "Cada 24 horas", status: "pendiente" },
  { id: 2, name: "Vitamina C", dose: "1000 mg", time: "09:00 AM", frequency: "Diario", status: "tomado" },
  { id: 3, name: "Paracetamol", dose: "500 mg", time: "02:00 PM", frequency: "Cada 8 horas", status: "pendiente" },
  { id: 4, name: "Atorvastatina", dose: "20 mg", time: "08:00 PM", frequency: "Cada noche", status: "pendiente" },
];

const frequencyOptions = [
  "Diario", "Cada 8 horas", "Cada 12 horas", "Cada 24 horas", "Cada noche", "Solo si hay dolor"
];

const timeOptions = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM",
  "10:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
  "04:00 PM", "06:00 PM", "08:00 PM", "10:00 PM",
];

const scannedMedicines = [
  { name: "Metformina", dose: "850 mg" },
  { name: "Amlodipino", dose: "5 mg" },
  { name: "Omeprazol", dose: "20 mg" },
];

export function MedicinesList() {
  const navigate = useNavigate();
  const { speak } = useVoice();
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedName, setNewMedName] = useState("");
  const [newMedDose, setNewMedDose] = useState("");
  const [newMedTime, setNewMedTime] = useState("");
  const [newMedFreq, setNewMedFreq] = useState("Diario");
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    speak("Viendo lista de medicinas");
  }, []);

  const handleAddMed = () => {
    if (!newMedName.trim()) { toast.error("Por favor escribe el nombre de la medicina."); return; }
    if (!newMedTime) { toast.error("Por favor selecciona la hora de la toma."); return; }
    setMedicines([
      ...medicines,
      { 
        id: Date.now(), 
        name: newMedName, 
        dose: newMedDose || "1 Pastilla", 
        time: newMedTime, 
        frequency: newMedFreq,
        status: "pendiente" 
      },
    ]);
    speak(`Medicina ${newMedName} guardada correctamente`);
    toast.success(`¡${newMedName} agregada!`, { description: `Te recordaremos a las ${newMedTime}.` });
    setShowAddForm(false);
    setNewMedName("");
    setNewMedDose("");
    setNewMedTime("");
    setNewMedFreq("Diario");
  };

  const handleScan = () => {
    setScanning(true);
    speak("Iniciando escaneo de caja");
    setTimeout(() => {
      const result = scannedMedicines[Math.floor(Math.random() * scannedMedicines.length)];
      setNewMedName(result.name);
      setNewMedDose(result.dose);
      setScanning(false);
      speak(`Se detectó ${result.name} de ${result.dose}`);
    }, 2000);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "tomado":
        return { color: "bg-green-100 text-green-700", border: "border-green-200", icon: CheckCircle2, label: "Tomado" };
      case "pendiente":
        return { color: "bg-blue-100 text-blue-700", border: "border-blue-200", icon: Clock, label: "Pendiente" };
      case "olvidado":
        return { color: "bg-red-100 text-red-700", border: "border-red-200", icon: AlertTriangle, label: "Olvidado" };
      default:
        return { color: "bg-slate-100 text-slate-700", border: "border-slate-200", icon: Pill, label: "" };
    }
  };

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
          <h1 className="text-3xl font-extrabold tracking-tight" onClick={() => speak("Mis Medicinas")}>Mis Medicinas</h1>
          <button
            onClick={() => {
              speak("Agregar nueva medicina");
              setShowAddForm(true);
            }}
            className="w-14 h-14 bg-white text-[#2B59FF] rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-md"
          >
            <Plus size={32} strokeWidth={3} />
          </button>
        </div>
        <p className="text-blue-100 text-[20px] leading-relaxed">
          Gestiona tus medicamentos y horarios para no olvidar ninguna toma.
        </p>
      </div>

      {/* Lista de medicinas */}
      <div className="px-5 -mt-8 space-y-4 relative z-30 pb-32">
        {medicines.map((med) => {
          const config = getStatusConfig(med.status);
          const StatusIcon = config.icon;
          return (
            <div
              key={med.id}
              onClick={() => speak(`${med.name}, ${med.dose}, estado ${config.label}`)}
              className={`bg-white rounded-[2.5rem] p-6 shadow-xl border border-slate-100 flex flex-col gap-4 active:scale-[0.98] transition-all cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 ${config.color} border-2 ${config.border}`}>
                    <StatusIcon size={36} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 leading-tight">{med.name}</h3>
                    <p className="text-xl font-bold text-[#2B59FF]">{med.dose}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-2xl font-black text-sm uppercase tracking-wider ${config.color}`}>
                  {config.label}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Clock size={22} className="text-slate-400" />
                  <span className="text-xl font-bold text-slate-600">{med.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Pill size={22} className="text-slate-400" />
                  <span className="text-xl font-bold text-slate-500">{med.frequency}</span>
                </div>
              </div>
            </div>
          );
        })}

        {medicines.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center shadow-md">
            <Pill size={64} className="mx-auto text-slate-200 mb-4" />
            <p className="text-2xl font-bold text-slate-400">No tienes medicinas registradas</p>
          </div>
        )}
      </div>

      {/* Modal agregar medicina */}
      {showAddForm && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onClick={() => setShowAddForm(false)} />
          <div
            className="fixed bottom-0 left-0 right-0 w-full bg-slate-50 rounded-t-[3.5rem] z-[70] shadow-2xl flex flex-col"
            style={{ maxHeight: "92vh" }}
          >
            <div className="px-8 pt-6 pb-4 shrink-0 bg-white rounded-t-[3.5rem] border-b border-slate-100">
              <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-800">Nueva Medicina</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 active:scale-95"
                >
                  <X size={32} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-8 py-6 flex flex-col gap-6">
              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full bg-blue-50 border-2 border-dashed border-[#2B59FF] rounded-3xl py-6 flex items-center justify-center gap-4 text-[#2B59FF] active:scale-95 transition-all disabled:opacity-60"
              >
                {scanning ? (
                  <>
                    <Loader2 size={32} className="animate-spin" />
                    <span className="text-2xl font-black">Escaneando...</span>
                  </>
                ) : (
                  <>
                    <ScanLine size={32} strokeWidth={2.5} />
                    <span className="text-2xl font-black">Escanear Caja</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-lg text-slate-400 font-bold uppercase tracking-widest">o escribe</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xl font-black text-slate-700 mb-3">Nombre del Medicamento</label>
                  <input
                    type="text"
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    placeholder="Ej. Losartán"
                    className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-6 py-5 text-2xl font-bold focus:outline-none focus:border-[#2B59FF] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xl font-black text-slate-700 mb-3">Dosis</label>
                  <input
                    type="text"
                    value={newMedDose}
                    onChange={(e) => setNewMedDose(e.target.value)}
                    placeholder="Ej. 50 mg o 1 Pastilla"
                    className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-6 py-5 text-2xl font-bold focus:outline-none focus:border-[#2B59FF] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xl font-black text-slate-700 mb-3">¿Con qué frecuencia?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {frequencyOptions.map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => {
                          speak(`Frecuencia seleccionada: ${freq}`);
                          setNewMedFreq(freq);
                        }}
                        className={`rounded-2xl py-4 px-3 text-lg font-bold transition-all border-2 ${
                          newMedFreq === freq
                            ? "bg-[#2B59FF] text-white border-[#2B59FF] shadow-md shadow-blue-200"
                            : "bg-white text-slate-600 border-slate-50 hover:bg-slate-50"
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xl font-black text-slate-700 mb-4">¿A qué hora?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeOptions.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          speak(`Hora seleccionada: ${t}`);
                          setNewMedTime(t);
                        }}
                        className={`rounded-2xl py-5 text-xl font-black transition-all border-2 ${
                          newMedTime === t
                            ? "bg-[#2B59FF] text-white border-[#2B59FF] shadow-md shadow-blue-200"
                            : "bg-white text-slate-600 border-slate-50 hover:bg-slate-50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 px-8 pt-6 pb-12 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <button
                onClick={handleAddMed}
                disabled={!newMedName.trim() || !newMedTime}
                className="w-full bg-[#2B59FF] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-[2rem] py-6 text-2xl font-black shadow-xl shadow-blue-200 active:scale-95 transition-all flex justify-center items-center gap-3"
              >
                <CheckCircle2 size={32} strokeWidth={3} />
                Guardar Medicina
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
