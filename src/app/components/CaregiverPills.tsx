import { useState, useEffect } from "react";
import { ArrowLeft, Pill, Plus, X, CheckCircle2, AlertCircle, ShoppingBag, History, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { useVoice } from "../context/VoiceContext";

interface Medication {
  id: number;
  name: string;
  dose: string;
  stock: number;
  totalNeeded: number;
  frequency: string;
  lastRefill: string;
}

const initialMeds: Medication[] = [
  { id: 1, name: "Losartán", dose: "50 mg", stock: 5, totalNeeded: 30, frequency: "Cada 24h", lastRefill: "15 May" },
  { id: 2, name: "Metformina", dose: "850 mg", stock: 12, totalNeeded: 60, frequency: "Cada 12h", lastRefill: "10 May" },
  { id: 3, name: "Amlodipino", dose: "5 mg", stock: 2, totalNeeded: 30, frequency: "Diario", lastRefill: "20 May" },
];

export function CaregiverPills() {
  const navigate = useNavigate();
  const { speak } = useVoice();
  const [meds, setMeds] = useState<Medication[]>(initialMeds);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [newMed, setNewMed] = useState({ name: "", dose: "", totalNeeded: 30, frequency: "Diario" });

  useEffect(() => {
    speak("Inventario de Medicamentos");
  }, []);

  const handleRefill = (id: number) => {
    const med = meds.find(m => m.id === id);
    speak(`Recargando inventario de ${med?.name}`);
    setMeds(meds.map(m => m.id === id ? { ...m, stock: m.totalNeeded, lastRefill: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) } : m));
    if (selectedMed?.id === id) {
      setSelectedMed(prev => prev ? { ...prev, stock: prev.totalNeeded, lastRefill: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) } : null);
    }
  };

  const handleAddMed = () => {
    if (!newMed.name) return;
    speak(`Agregando ${newMed.name} al inventario`);
    const med: Medication = {
      id: Date.now(),
      name: newMed.name,
      dose: newMed.dose || "1 Pastilla",
      stock: newMed.totalNeeded,
      totalNeeded: newMed.totalNeeded,
      frequency: newMed.frequency,
      lastRefill: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
    };
    setMeds([...meds, med]);
    setShowAddForm(false);
    setNewMed({ name: "", dose: "", totalNeeded: 30, frequency: "Diario" });
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col h-full overflow-y-auto pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#2B59FF] text-white px-6 pt-12 pb-16 rounded-b-[3rem] shadow-lg relative z-20">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              speak("Regresando");
              navigate(-1);
            }}
            className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight" onClick={() => speak("Medicamentos")}>Medicamentos AM</h1>
          <button
            onClick={() => {
              speak("Nuevo medicamento");
              setShowAddForm(true);
            }}
            className="w-12 h-12 bg-white text-[#2B59FF] rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-md"
          >
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>
        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl mt-4 border border-white/10 cursor-help" onClick={() => speak("Alerta: Hay un medicamento con stock crítico.")}>
          <Bell className="text-amber-300 animate-pulse shrink-0" size={24} />
          <p className="text-white/90 text-sm font-medium leading-tight">
            Hay 1 medicamento con stock crítico. Revisa el inventario pronto.
          </p>
        </div>
      </div>

      {/* Medication List */}
      <div className="px-6 -mt-8 space-y-4 relative z-30">
        {meds.map((med) => {
          const isLow = med.stock <= 5;
          const percentage = (med.stock / med.totalNeeded) * 100;

          return (
            <div 
              key={med.id} 
              onClick={() => {
                speak(`${med.name}, ${med.dose}. Quedan ${med.stock} unidades de ${med.totalNeeded}.`);
                setSelectedMed(med);
              }}
              className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-slate-100 space-y-5 active:scale-[0.98] transition-all cursor-pointer group hover:border-[#2B59FF]/30"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 shadow-inner ${isLow ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#2B59FF]'}`}>
                    <Pill size={32} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight">{med.name}</h3>
                    <p className="text-base font-bold text-slate-400">{med.dose}</p>
                  </div>
                </div>
                {isLow && (
                  <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-2xl flex items-center gap-2 border border-red-100 animate-pulse">
                    <AlertCircle size={16} strokeWidth={3} />
                    <span className="text-xs font-black uppercase tracking-wider">Crítico</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Stock Disponible</span>
                    <span className={`text-2xl font-black ${isLow ? 'text-red-500' : 'text-[#2B59FF]'}`}>
                      {med.stock} <span className="text-slate-300 text-lg font-bold">/ {med.totalNeeded}</span>
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(`Agregando 1 unidad de ${med.name}`);
                      setMeds(prev => prev.map(m => m.id === med.id ? { ...m, stock: Math.min(m.stock + 1, m.totalNeeded) } : m));
                    }}
                    className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-[#2B59FF] shadow-md active:scale-90 hover:bg-[#2B59FF] hover:text-white transition-all border border-slate-100 cursor-pointer relative z-10"
                  >
                    <Plus size={24} strokeWidth={3} />
                  </button>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden p-1 shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ease-out ${isLow ? 'bg-red-500' : 'bg-[#2B59FF]'}`}
                    style={{ width: `${Math.max(percentage, 8)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <History size={18} />
                  <span className="text-xs font-black uppercase tracking-tight">Última: {med.lastRefill}</span>
                </div>
                <div className="text-[#2B59FF] text-sm font-black flex items-center gap-1">
                  <span>Ver detalles</span>
                  <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Plus size={14} strokeWidth={4} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddForm && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 z-[60] backdrop-blur-sm" onClick={() => setShowAddForm(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] z-[70] shadow-2xl p-8 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Nuevo Medicamento</h2>
              <button onClick={() => {
                speak("Cerrar");
                setShowAddForm(false);
              }} className="p-2 bg-slate-100 rounded-xl text-slate-500">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Nombre</label>
                <input
                  type="text"
                  placeholder="Ej. Losartán"
                  value={newMed.name}
                  onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-bold focus:outline-none focus:border-[#2B59FF] placeholder:font-bold placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Dosis</label>
                  <input
                    type="text"
                    placeholder="Ej. 50mg"
                    value={newMed.dose}
                    onChange={(e) => setNewMed({...newMed, dose: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-bold focus:outline-none focus:border-[#2B59FF] placeholder:font-bold placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Stock Inicial</label>
                  <input
                    type="number"
                    value={newMed.totalNeeded}
                    onChange={(e) => setNewMed({...newMed, totalNeeded: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-bold focus:outline-none focus:border-[#2B59FF]"
                  />
                </div>
              </div>

              <button
                onClick={handleAddMed}
                disabled={!newMed.name}
                className="w-full bg-[#2B59FF] disabled:bg-slate-200 text-white rounded-2xl py-4 text-lg font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <CheckCircle2 size={24} strokeWidth={2.5} />
                Agregar Medicamento
              </button>
            </div>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {selectedMed && (
        <>
          <div className="fixed inset-0 bg-slate-900/80 z-[80] backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedMed(null)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3.5rem] z-[90] shadow-2xl p-8 pt-4 animate-in slide-in-from-bottom duration-500">
            <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
            
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-5">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 border-4 ${selectedMed.stock <= 5 ? 'bg-red-50 text-red-500 border-red-100' : 'bg-blue-50 text-[#2B59FF] border-blue-100'}`}>
                  <Pill size={40} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">{selectedMed.name}</h2>
                  <p className="text-xl font-bold text-slate-400">{selectedMed.dose}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMed(null)} 
                className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 active:bg-slate-200 transition-colors"
              >
                <X size={28} strokeWidth={3} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Frecuencia</p>
                <p className="text-lg font-black text-slate-800">{selectedMed.frequency}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Última Recarga</p>
                <p className="text-lg font-black text-slate-800">{selectedMed.lastRefill}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 mb-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Inventario (Editar número)</p>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <input 
                        type="number"
                        value={selectedMed.stock}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          const cappedVal = Math.min(Math.max(0, val), selectedMed.totalNeeded);
                          setMeds(prev => prev.map(m => m.id === selectedMed.id ? { ...m, stock: cappedVal } : m));
                          setSelectedMed({ ...selectedMed, stock: cappedVal });
                        }}
                        className={`w-full text-5xl font-black bg-white px-6 py-4 rounded-[1.5rem] border-4 transition-all focus:outline-none shadow-inner ${selectedMed.stock <= 5 ? 'text-red-500 border-red-100 focus:border-red-500' : 'text-[#2B59FF] border-blue-50 focus:border-[#2B59FF]'}`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-slate-300 font-bold">
                        / {selectedMed.totalNeeded}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-6 bg-slate-200 rounded-full overflow-hidden p-1.5 shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${selectedMed.stock <= 5 ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-[#2B59FF] to-blue-400'}`}
                    style={{ width: `${(selectedMed.stock / selectedMed.totalNeeded) * 100}%` }}
                  />
                </div>
                <p className="text-center text-slate-400 font-bold text-base">
                  {selectedMed.stock <= 5 
                    ? "¡Pocas unidades! Realiza una recarga pronto."
                    : "Inventario actualizado correctamente."}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleRefill(selectedMed.id)}
              className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all active:scale-[0.97] shadow-xl border-b-8 ${
                selectedMed.stock <= 5
                  ? 'bg-red-500 text-white border-red-700 shadow-red-200'
                  : 'bg-[#2B59FF] text-white border-blue-800 shadow-blue-200'
              }`}
            >
              <ShoppingBag size={28} strokeWidth={2.5} />
              Recargar Inventario Completo
            </button>
            <div className="h-8" />
          </div>
        </>
      )}
    </div>
  );
}
