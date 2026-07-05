import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, User, Calendar, Droplet, AlertCircle, Info, Check, HeartPulse, Hash, Binary } from "lucide-react";
import { toast } from "sonner";

export function ElderlyRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    codigoAM: "",
    birthDate: "",
    bloodType: "",
    allergies: "",
    medicalInfo: ""
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.codigoAM || !formData.birthDate) {
      toast.error("Por favor completa los campos obligatorios.");
      return;
    }

    // Guardar en localStorage para persistencia local
    localStorage.setItem("registeredElderly", JSON.stringify(formData));

    toast.success("¡Adulto mayor registrado!", {
      description: `Ahora supervisas la salud de ${formData.name.split(" ")[0]}.`,
    });
    navigate("/caregiver/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-y-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#2B59FF] text-white px-6 pt-10 pb-12 rounded-b-[2.5rem] shadow-lg relative z-20">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Nuevo Registro</h1>
          <div className="w-12 h-12" />
        </div>
        <p className="text-blue-100 text-base leading-relaxed opacity-90">
          Ingresa los datos del adulto mayor que vas a cuidar.
        </p>
      </div>

      <div className="px-6 -mt-6 relative z-30 pb-12 max-w-full overflow-x-hidden">
        <form onSubmit={handleRegister} className="space-y-6 w-full">
          {/* Personal Info Section */}
          <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-xl border border-slate-100 space-y-5 w-full">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1">
              <User className="text-[#2B59FF]" size={20} /> Datos Personales
            </h2>
            
            <div className="space-y-4 w-full">
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B59FF]">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre Completo"
                  className="w-full block bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-base font-medium focus:outline-none focus:border-[#2B59FF] transition-all placeholder:text-sm placeholder:font-bold placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                <div className="relative min-w-0">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B59FF]">
                    <Hash size={18} />
                  </div>
                  <input
                    type="number"
                    required
                    readOnly
                    value={formData.age}
                    placeholder="Edad"
                    className="w-full block bg-slate-100 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-base font-medium focus:outline-none cursor-not-allowed placeholder:text-sm placeholder:font-bold placeholder:text-slate-400"
                  />
                </div>
                <div className="relative min-w-0">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B59FF]">
                    <Binary size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.codigoAM}
                    onChange={(e) => setFormData({ ...formData, codigoAM: e.target.value })}
                    placeholder="Código AM"
                    className="w-full block bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-base font-medium focus:outline-none focus:border-[#2B59FF] transition-all placeholder:text-sm placeholder:font-bold placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B59FF]">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={(e) => {
                    const dateVal = e.target.value;
                    if (!dateVal) {
                      setFormData({ ...formData, birthDate: "", age: "" });
                      return;
                    }
                    const today = new Date();
                    const birth = new Date(dateVal);
                    let ageCalc = today.getFullYear() - birth.getFullYear();
                    const m = today.getMonth() - birth.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                      ageCalc--;
                    }
                    setFormData({ 
                      ...formData, 
                      birthDate: dateVal, 
                      age: ageCalc >= 0 ? ageCalc.toString() : "0" 
                    });
                  }}
                  className="w-full block bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-base font-medium focus:outline-none focus:border-[#2B59FF] transition-all"
                  style={{ minWidth: "0", maxWidth: "100%" }}
                />
              </div>
            </div>
          </div>

          {/* Medical Info Section */}
          <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-xl border border-slate-100 space-y-6 w-full">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <HeartPulse className="text-rose-500" size={20} /> Información Médica (Opcional)
            </h2>

            <div className="space-y-4 w-full">
              <div className="w-full">
                <label className="block text-sm font-bold text-slate-500 mb-2 ml-1 flex items-center gap-2">
                  <Droplet size={18} className="text-red-500" /> Tipo de Sangre
                </label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                  className="w-full block bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-medium focus:outline-none focus:border-[#2B59FF] transition-all appearance-none"
                >
                  <option value="">Selecciona...</option>
                  <option value="A+">A Positivo (A+)</option>
                  <option value="A-">A Negativo (A-)</option>
                  <option value="B+">B Positivo (B+)</option>
                  <option value="B-">B Negativo (B-)</option>
                  <option value="O+">O Positivo (O+)</option>
                  <option value="O-">O Negativo (O-)</option>
                  <option value="AB+">AB Positivo (AB+)</option>
                  <option value="AB-">AB Negativo (AB-)</option>
                </select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-bold text-slate-500 mb-2 ml-1 flex items-center gap-2">
                  <AlertCircle size={18} className="text-amber-500" /> Alergias
                </label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="Ej. Penicilina, polen..."
                  rows={2}
                  className="w-full block bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-base font-medium focus:outline-none focus:border-[#2B59FF] transition-all resize-none placeholder:font-bold placeholder:text-slate-400"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-bold text-slate-500 mb-2 ml-1 flex items-center gap-2">
                  <Info size={18} className="text-blue-400" /> Notas relevantes
                </label>
                <textarea
                  value={formData.medicalInfo}
                  onChange={(e) => setFormData({ ...formData, medicalInfo: e.target.value })}
                  placeholder="Ej. Hipertensión, diabetes..."
                  rows={2}
                  className="w-full block bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-base font-medium focus:outline-none focus:border-[#2B59FF] transition-all resize-none placeholder:font-bold placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2B59FF] text-white rounded-xl py-5 text-xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all flex justify-center items-center gap-2 mt-4"
          >
            <Check size={28} strokeWidth={3} />
            Finalizar Registro
          </button>
        </form>
      </div>
    </div>
  );
}
