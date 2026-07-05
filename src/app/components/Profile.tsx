import { useState } from "react";
import { User, Copy, Check, LogOut, Share2 } from "lucide-react";
import { useNavigate } from "react-router";

const CAREGIVER_CODE = "AMA-482391";

export function Profile() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("amay_user_name") || "María García";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CAREGIVER_CODE).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 pt-14 pb-20 text-white rounded-b-[3rem] shadow-xl flex flex-col items-center text-center gap-4">
        <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/40 shadow-lg">
          <User size={56} className="text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold">{userName}</h1>
          <p className="text-blue-200 text-xl mt-1">Adulto mayor · AMAY</p>
        </div>
      </div>

      <div className="px-6 flex-1 flex flex-col gap-6 -mt-8 pb-8">
        {/* Caregiver Code Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
              <Share2 size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">Código para tu Cuidador</h2>
              <p className="text-lg text-slate-500 mt-0.5">Compártelo con quien te cuida</p>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl px-6 py-5 flex items-center justify-between mb-4">
            <span className="text-4xl font-extrabold tracking-widest text-blue-700 font-mono">
              {CAREGIVER_CODE}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full rounded-2xl py-5 text-[24px] font-extrabold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-md ${
              copied
                ? "bg-green-500 text-white shadow-green-500/30"
                : "bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-700"
            }`}
          >
            {copied ? (
              <>
                <Check size={26} />
                ¡Copiado!
              </>
            ) : (
              <>
                <Copy size={26} />
                Copiar Código
              </>
            )}
          </button>

          <p className="text-base text-slate-400 text-center mt-4 leading-relaxed">
            Tu cuidador usará este código en la app AMAY para vincularse contigo y ver tu progreso.
          </p>
        </div>

        {/* Info section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-2xl font-extrabold text-slate-700 mb-4">Mis datos</h3>
          <div className="space-y-4">
            {[
              { label: "Nombre", value: userName },
              { label: "Edad", value: "72 años" },
              { label: "Cuidador", value: "Juan García (vinculado)" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <span className="text-xl text-slate-500 font-semibold">{item.label}</span>
                <span className="text-xl text-slate-800 font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={() => navigate("/")}
          className="w-full bg-white border-2 border-red-200 text-red-500 rounded-2xl py-5 text-[24px] font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-sm"
        >
          <LogOut size={24} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
