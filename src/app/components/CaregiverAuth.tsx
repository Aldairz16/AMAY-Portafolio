import { useNavigate } from "react-router";
import { ArrowLeft, UserPlus, LogIn, HeartHandshake } from "lucide-react";

export function CaregiverAuth() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-y-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#2B59FF] text-white px-6 pt-10 pb-12 rounded-b-[2.5rem] shadow-lg relative z-20">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/")}
            className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Acceso Cuidador</h1>
          <div className="w-12 h-12" />
        </div>
        <p className="text-blue-100 text-base leading-relaxed opacity-90">
          Selecciona una opción para gestionar la salud y bienestar de tus seres queridos.
        </p>
      </div>

      <div className="px-6 -mt-6 space-y-4 relative z-30 pb-12">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/caregiver/login")}
            className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-5 active:scale-95 transition-all text-left"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-50 text-[#2B59FF] border border-blue-100 shadow-sm shrink-0">
              <LogIn size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 leading-tight">Iniciar sesión</h2>
              <p className="text-sm font-semibold text-slate-400">Ya tengo una cuenta registrada</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/caregiver/register")}
            className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-5 active:scale-95 transition-all text-left"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm shrink-0">
              <UserPlus size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 leading-tight">Registrarse</h2>
              <p className="text-sm font-semibold text-slate-400">Soy un cuidador nuevo</p>
            </div>
          </button>
        </div>

        <div className="pt-8 text-center px-4">
          <div className="flex justify-center mb-4 text-[#2B59FF]/10">
            <HeartHandshake size={48} />
          </div>
          <p className="text-base font-semibold text-slate-400 leading-relaxed italic">
            "Cuidar es un acto de amor que AMAY te ayuda a organizar."
          </p>
        </div>
      </div>
    </div>
  );
}
