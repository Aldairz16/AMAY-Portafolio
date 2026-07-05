import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, Clock, MapPin, User, Plus, X, Check, Bell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
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

export function AppointmentsList() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppt, setNewAppt] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    location: "",
    notes: ""
  });

  useEffect(() => {
    setAppointments(seedAppointments());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const appt: Appointment = {
      ...newAppt,
      id: Date.now().toString(),
    };
    const updated = [...appointments, appt].sort((a, b) => a.date.localeCompare(b.date));
    setAppointments(updated);
    localStorage.setItem("amay_appointments", JSON.stringify(updated));
    toast.success("¡Cita guardada!", { description: `${appt.doctor} · ${appt.time} hrs` });
    setShowAddModal(false);
    setNewAppt({ doctor: "", specialty: "", date: "", time: "", location: "", notes: "" });
  };

  const deleteAppt = (id: string) => {
    const appt = appointments.find(a => a.id === id);
    toast(`¿Borrar la cita con ${appt?.doctor}?`, {
      action: {
        label: "Sí, borrar",
        onClick: () => {
          const updated = appointments.filter(a => a.id !== id);
          setAppointments(updated);
          localStorage.setItem("amay_appointments", JSON.stringify(updated));
          toast.success("Cita eliminada");
        },
      },
      cancel: { label: "No", onClick: () => {} },
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="bg-[#2B59FF] text-white px-6 pt-12 pb-16 rounded-b-[3rem] shadow-lg sticky top-0 z-20">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={32} strokeWidth={3} />
          </button>
          <h1 className="text-3xl font-black">Mis Citas</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-14 h-14 bg-white text-[#2B59FF] rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-md"
          >
            <Plus size={32} strokeWidth={3} />
          </button>
        </div>
        <p className="text-blue-100 text-[20px] leading-relaxed">
          Revisa tus próximas consultas médicas y organiza tu calendario de salud.
        </p>
      </div>

      <div className="flex-1 p-5 space-y-6 pb-24 -mt-8 relative z-30">
        {/* List */}
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
              <Calendar size={64} className="mx-auto text-slate-200 mb-4" />
              <p className="text-2xl font-bold text-slate-400">No tienes citas programadas</p>
            </div>
          ) : (
            appointments.map((appt) => (
              <div key={appt.id} className="bg-white rounded-[2.5rem] p-6 shadow-md border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-3 h-full bg-blue-500"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="bg-blue-50 text-[#2B59FF] px-4 py-1.5 rounded-full text-lg font-black uppercase tracking-wider">
                      {appt.specialty}
                    </span>
                    <h3 className="text-3xl font-black text-slate-800 mt-3">{appt.doctor}</h3>
                  </div>
                  <button 
                    onClick={() => deleteAppt(appt.id)}
                    className="p-3 text-slate-300 hover:text-red-500 active:scale-90 transition-all"
                  >
                    <X size={28} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                    <Calendar size={28} className="text-[#2B59FF]" />
                    <span className="text-xl font-bold">
                      {new Date(appt.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                    <Clock size={28} className="text-[#2B59FF]" />
                    <span className="text-xl font-bold">{appt.time} hrs</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                    <MapPin size={28} className="text-[#2B59FF]" />
                    <span className="text-xl font-bold">{appt.location}</span>
                  </div>
                </div>

                {appt.notes && (
                  <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-100 rounded-2xl flex items-start gap-3">
                    <Bell size={24} className="text-amber-500 mt-1 shrink-0" />
                    <p className="text-lg font-bold text-amber-700 italic">"{appt.notes}"</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-8 pb-4 flex justify-between items-center">
                <h2 className="text-3xl font-black text-slate-900">Nueva Cita</h2>
                <button onClick={() => setShowAddModal(false)} className="p-3 bg-slate-100 rounded-2xl text-slate-500">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleAdd} className="p-8 pt-4 space-y-5 overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-lg font-black text-slate-500 ml-2">Doctor/a</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej. Dr. García"
                    value={newAppt.doctor}
                    onChange={e => setNewAppt({...newAppt, doctor: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-xl font-bold focus:border-[#2B59FF] outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-lg font-black text-slate-500 ml-2">Especialidad</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Ej. Ojos"
                      value={newAppt.specialty}
                      onChange={e => setNewAppt({...newAppt, specialty: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-xl font-bold focus:border-[#2B59FF] outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg font-black text-slate-500 ml-2">Hora</label>
                    <input 
                      required
                      type="time" 
                      value={newAppt.time}
                      onChange={e => setNewAppt({...newAppt, time: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-xl font-bold focus:border-[#2B59FF] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-lg font-black text-slate-500 ml-2">Fecha</label>
                  <input 
                    required
                    type="date" 
                    value={newAppt.date}
                    onChange={e => setNewAppt({...newAppt, date: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-xl font-bold focus:border-[#2B59FF] outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg font-black text-slate-500 ml-2">Lugar</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej. Clínica Alemana"
                    value={newAppt.location}
                    onChange={e => setNewAppt({...newAppt, location: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-xl font-bold focus:border-[#2B59FF] outline-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#2B59FF] text-white py-6 rounded-2xl text-2xl font-black shadow-lg shadow-blue-200/50 active:scale-[0.98] transition-all mt-4"
                >
                  Guardar Cita
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
