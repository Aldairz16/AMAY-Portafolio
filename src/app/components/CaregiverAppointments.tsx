import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, Clock, MapPin, Plus, X, Trash2, Edit2, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useVoice } from "../context/VoiceContext";
import { seedAppointments } from "../data/demoData";

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
}

export function CaregiverAppointments() {
  const navigate = useNavigate();
  const { speak } = useVoice();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    location: "",
    notes: ""
  });

  useEffect(() => {
    setAppointments(seedAppointments());
    speak("Agenda Médica");
  }, []);

  const saveToStorage = (updated: Appointment[]) => {
    setAppointments(updated);
    localStorage.setItem("amay_appointments", JSON.stringify(updated));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated;
    if (editingId) {
      updated = appointments.map(a => a.id === editingId ? { ...formData, id: editingId } : a);
      speak(`Cita con el doctor ${formData.doctor} actualizada`);
      toast.success("Cita actualizada", { description: `${formData.doctor} · ${formData.time} hrs` });
    } else {
      const newAppt = { ...formData, id: Date.now().toString() };
      updated = [...appointments, newAppt].sort((a, b) => a.date.localeCompare(b.date));
      speak(`Cita con el doctor ${formData.doctor} guardada`);
      toast.success("¡Cita guardada!", { description: `${formData.doctor} · ${formData.time} hrs` });
    }
    
    saveToStorage(updated);
    closeModal();
  };

  const deleteAppt = (id: string) => {
    const appt = appointments.find(a => a.id === id);
    speak(`¿Confirmas eliminar la cita con ${appt?.doctor}?`);
    toast(`¿Eliminar la cita con ${appt?.doctor}?`, {
      action: {
        label: "Sí, eliminar",
        onClick: () => {
          saveToStorage(appointments.filter(a => a.id !== id));
          speak("Cita eliminada");
          toast.success("Cita eliminada");
        },
      },
      cancel: { label: "No", onClick: () => {} },
    });
  };

  const openEdit = (appt: Appointment) => {
    speak(`Editando cita de ${appt.doctor}`);
    setEditingId(appt.id);
    setFormData({
      doctor: appt.doctor,
      specialty: appt.specialty,
      date: appt.date,
      time: appt.time,
      location: appt.location,
      notes: appt.notes || ""
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingId(null);
    setFormData({ doctor: "", specialty: "", date: "", time: "", location: "", notes: "" });
  };

  const filteredAppts = appointments.filter(a => 
    a.doctor.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-24 font-sans">
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
          <h1 className="text-2xl font-bold tracking-tight" onClick={() => speak("Agenda Médica")}>Agenda Médica AM</h1>
          <button 
            onClick={() => {
              speak("Nueva cita");
              setShowAddModal(true);
            }}
            className="w-12 h-12 bg-white text-[#2B59FF] rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-md"
          >
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>
        <p className="text-blue-100 text-base leading-relaxed max-w-xs opacity-90 font-[Plus_Jakarta_Sans]">
          Gestiona las citas médicas, especialistas y ubicaciones para un seguimiento preventivo eficaz.
        </p>
      </div>

      <div className="flex-1 p-5 space-y-4 overflow-y-auto -mt-8 relative z-30">
        <div className="bg-white rounded-[2rem] p-2 shadow-sm border border-slate-100 mb-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar doctor o especialidad..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-0 transition-all outline-none text-sm font-bold"
            />
          </div>
        </div>

        {filteredAppts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <Calendar size={64} className="mb-4 text-slate-300" />
            <p className="font-semibold text-slate-500">No hay citas registradas</p>
          </div>
        ) : (
          filteredAppts.map(appt => (
            <div 
              key={appt.id} 
              className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex gap-4 cursor-pointer active:scale-[0.98] transition-all"
              onClick={() => speak(`Cita con ${appt.doctor}, ${appt.specialty}, el día ${new Date(appt.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} a las ${appt.time}`)}
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex flex-col items-center justify-center shrink-0">
                <span className="text-xs font-bold uppercase tracking-tighter">
                  {new Date(appt.date).toLocaleDateString('es-ES', { month: 'short' })}
                </span>
                <span className="text-2xl font-black leading-none">
                  {new Date(appt.date).getDate()}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg truncate">{appt.doctor}</h3>
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{appt.specialty}</p>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(appt);
                      }} 
                      className="p-2 text-slate-400 hover:text-blue-600"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAppt(appt.id);
                      }} 
                      className="p-2 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-y-2 gap-x-4">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock size={16} />
                    <span className="text-sm font-medium">{appt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin size={16} />
                    <span className="text-sm font-medium truncate max-w-[150px]">{appt.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                {editingId ? "Editar Cita" : "Nueva Cita Médica"}
              </h2>
              
              <form onSubmit={handleSave} className="space-y-4">
                <input 
                  required
                  type="text" 
                  placeholder="Doctor/a"
                  value={formData.doctor}
                  onChange={e => setFormData({...formData, doctor: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-blue-100 outline-none"
                />
                <input 
                  required
                  type="text" 
                  placeholder="Especialidad"
                  value={formData.specialty}
                  onChange={e => setFormData({...formData, specialty: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-blue-100 outline-none"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    required
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 outline-none"
                  />
                  <input 
                    required
                    type="time" 
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 outline-none"
                  />
                </div>
                <input 
                  required
                  type="text" 
                  placeholder="Lugar de la cita"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-blue-100 outline-none"
                />
                
                <div className="flex gap-3 mt-6">
                  <button 
                    type="button"
                    onClick={() => {
                      speak("Cerrar");
                      closeModal();
                    }}
                    className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl active:scale-95 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-[#2B59FF] text-white font-bold py-4 rounded-xl active:scale-95 shadow-lg shadow-blue-100 transition-all"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
