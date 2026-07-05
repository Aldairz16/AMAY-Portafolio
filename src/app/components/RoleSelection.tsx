import { useNavigate } from "react-router";
import { User, HeartHandshake, Volume2, VolumeX } from "lucide-react";
import { useVoice } from "../context/VoiceContext";
import amayIcon from "../../assets/amay-icon.png";

export function RoleSelection() {
  const navigate = useNavigate();
  const { speak, isNarratorActive, toggleNarrator } = useVoice();

  const handleSelectRole = (role: string, path: string) => {
    // Esto desbloquea el audio en la mayoría de navegadores
    speak(`Has seleccionado: ${role}`);
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col items-center p-8 bg-blue-50 overflow-y-auto">
      <div className="my-auto w-full flex flex-col items-center pt-6 lg:pt-10 pb-4">
        <div
          className="flex flex-col items-center mb-8 animate-in fade-in zoom-in duration-500 cursor-help"
          onClick={() => speak("Bienvenidos a AMAY, tu asistente de salud.")}
        >
          <img
            src={amayIcon}
            alt="Logo de AMAY"
            className="w-24 h-24 rounded-[1.8rem] mb-6 shadow-xl shadow-blue-600/30 object-cover"
          />
          <h1 className="text-5xl font-black text-blue-900 tracking-tight">AMAY</h1>
          <p className="text-xl text-blue-700 mt-3 text-center font-medium max-w-[250px] leading-relaxed">
            Te acompañamos en el cuidado de tu salud
          </p>
        </div>

        <div className="w-full space-y-4">
          <button
            onClick={() => handleSelectRole("Adulto Mayor", "/onboarding")}
            onMouseEnter={() => speak("Botón: Soy adulto mayor")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
          >
            <User size={44} />
            <span className="text-3xl font-bold">Soy adulto mayor</span>
          </button>

          <button
            onClick={() => handleSelectRole("Cuidador", "/caregiver/auth")}
            onMouseEnter={() => speak("Botón: Soy cuidador")}
            className="w-full bg-white hover:bg-blue-50 text-blue-800 border-4 border-blue-200 rounded-[2rem] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-all shadow-sm active:scale-95"
          >
            <HeartHandshake size={44} />
            <span className="text-3xl font-bold">Soy cuidador</span>
          </button>

          <button
            onClick={toggleNarrator}
            className={`w-full rounded-[1.5rem] py-4 px-4 flex items-center justify-center gap-3 transition-all active:scale-95 border-2 text-lg font-bold ${
              isNarratorActive
                ? "bg-blue-100 border-blue-300 text-blue-800"
                : "bg-white/60 border-blue-100 text-blue-500 hover:bg-white"
            }`}
          >
            {isNarratorActive ? <Volume2 size={24} /> : <VolumeX size={24} />}
            {isNarratorActive ? "Narrador de voz activado" : "Activar narrador de voz"}
          </button>
        </div>
      </div>
    </div>
  );
}
