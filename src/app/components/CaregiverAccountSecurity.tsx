import { useNavigate } from "react-router";
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff, Save, ShieldCheck, Fingerprint } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CaregiverAccountSecurity() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-y-auto pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="bg-[#2B59FF] text-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Cuenta y Seguridad</h1>
        </div>
      </div>

      <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="space-y-4">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Información Personal</h2>
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input type="text" defaultValue="Carlos Rodríguez" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-800 font-bold focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input type="email" defaultValue="carlos.r@email.com" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-800 font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input type="tel" defaultValue="+51 987 654 321" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-800 font-bold" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Seguridad de la Cuenta</h2>
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Contraseña Actual</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input type={showPass ? "text" : "password"} defaultValue="********" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-12 text-slate-800 font-bold" />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-3 text-emerald-600">
                <Fingerprint size={24} />
                <div>
                  <p className="text-sm font-bold">Biometría activada</p>
                  <p className="text-[10px] font-medium opacity-80">Usa tu huella para entrar</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={() => toast.success("Cambios guardados", { description: "Tu información personal fue actualizada." })}
          className="w-full bg-[#2B59FF] text-white rounded-2xl py-5 text-lg font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Save size={20} />
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
