import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LogOut, Volume2, VolumeX, Calendar, Siren, PhoneCall, X } from "lucide-react";
import { useVoice } from "../context/VoiceContext";

const initialMedicines = [
  { nombre: "Losartán 50mg", hora: "08:00 AM", instruccion: "Tomar con abundante agua después del desayuno." },
  { nombre: "Paracetamol 500mg", hora: "02:00 PM", instruccion: "Tomar después del almuerzo." },
  { nombre: "Atorvastatina 20mg", hora: "09:00 PM", instruccion: "Tomar antes de dormir." },
];

export function OlderAdultHome() {
  const navigate = useNavigate();
  const { speak, isNarratorActive, toggleNarrator } = useVoice();
  const userName = localStorage.getItem("amay_user_name") || "María García";
  const [takenCount, setTakenCount] = useState(0);
  const [currentMedIndex, setCurrentMedIndex] = useState(0);
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);
  const [animoSeleccionado, setAnimoSeleccionado] = useState<string | null>(null);
  const [medTomada, setMedTomada] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  const [hasGreeted, setHasGreeted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasGreeted) {
        const hour = new Date().getHours();
        let greeting = "¡Hola!";
        if (hour < 12) greeting = "Buenos días";
        else if (hour < 20) greeting = "Buenas tardes";
        else greeting = "Buenas noches";
        
        speak(`${greeting} ${userName.split(' ')[0]}. Tienes tus medicinas listas. ¿Cómo te sientes hoy?`);
        setHasGreeted(true);
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasGreeted, userName, speak]);

  const medicines = initialMedicines;
  const totalMeds = medicines.length;
  const progressPercent = Math.round((takenCount / totalMeds) * 100);
  const circumference = 2 * Math.PI * 24;
  const dashOffset = circumference - (progressPercent / 100) * circumference;
  const nextMed = medicines[Math.min(currentMedIndex, totalMeds - 1)];

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
    speak(`${title}. ${message}`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleTomarMedicina = () => {
    if (medTomada) return;
    setMedTomada(true);
    const newCount = takenCount + 1;
    setTakenCount(newCount);
    if (navigator.vibrate) navigator.vibrate(200);
    
    const phrases = [
      "¡Muy bien hecho!",
      "Excelente, una menos.",
      "Así se hace, cuidando tu salud.",
      "Perfecto, registro completado."
    ];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    showToast("¡Medicina tomada!", `${nextMed.nombre} registrada correctamente.`);
    speak(`${randomPhrase}. Has registrado tu medicina: ${nextMed.nombre}.`);

    setTimeout(() => {
      if (currentMedIndex + 1 < totalMeds) {
        setCurrentMedIndex((i) => i + 1);
        const next = initialMedicines[currentMedIndex + 1];
        speak(`Cuando estés listo, la siguiente toma es a las ${next.hora}.`);
      } else {
        speak("¡Enhorabuena! Has completado todas tus tomas de hoy. Te ves muy bien.");
      }
      setMedTomada(false);
    }, 2000);
  };

  const handleSOS = () => {
    setSosSent(false);
    setShowSOS(true);
    speak("¿Necesitas ayuda? Si presionas el botón rojo, avisaremos a tu cuidador de inmediato.");
  };

  const confirmSOS = () => {
    setSosSent(true);
    if (navigator.vibrate) navigator.vibrate([300, 100, 300, 100, 300]);
    speak("No te preocupes, estoy contigo. He enviado la señal de ayuda a tu cuidador Juan. Mantén la calma, ya vienen en camino.");
    setTimeout(() => {
      setShowSOS(false);
      showToast("¡Alerta enviada!", "Tu cuidador ha sido notificado.");
    }, 2500);
  };

  const handleSeleccionarAnimo = (animo: string) => {
    setAnimoSeleccionado(animo);
    speak(`Me alegra saber que te sientes ${animo}. Registro completado.`);
    showToast("Estado registrado", `Te sientes: ${animo}`);
  };

  const moodOptions = [
    { label: "Muy bien", emoji: "😊", key: "Muy bien 😊", hoverClass: "hover:bg-emerald-50", selClass: "bg-emerald-50 border-emerald-300" },
    { label: "Estable", emoji: "😐", key: "Estable 😐", hoverClass: "hover:bg-blue-50", selClass: "bg-blue-50 border-blue-300" },
    { label: "Cansada", emoji: "🥱", key: "Cansada 🥱", hoverClass: "hover:bg-amber-50", selClass: "bg-amber-50 border-amber-300" },
    { label: "Con dolor", emoji: "🤕", key: "Con dolor 🤕", hoverClass: "hover:bg-rose-50", selClass: "bg-rose-50 border-rose-300" },
  ];

  const nextMedForProgress = medicines[Math.min(currentMedIndex + (medTomada ? 1 : 0), totalMeds - 1)];

  return (
    <div
      className="flex-1 flex flex-col bg-slate-100 overflow-y-auto relative"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", WebkitTapHighlightColor: "transparent" }}
    >
      {/* Toast */}
      <div
        className={`absolute top-4 left-4 right-4 bg-emerald-600 text-white p-4 rounded-2xl shadow-lg flex items-center gap-3 z-50 transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-white/20 p-2 rounded-full flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-sm">{toast?.title}</h4>
          <p className="text-xs text-emerald-100">{toast?.message}</p>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#2B59FF] text-white px-6 pt-8 pb-20 rounded-b-[3rem] shadow-lg relative">
        <button
          onClick={() => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            const nextState = !isNarratorActive;
            toggleNarrator();
            if (nextState) {
              speak("Narrador activado. Ahora leeré los botones y títulos al pasar el dedo o el ratón sobre ellos.");
            }
          }}
          onMouseEnter={() => speak(isNarratorActive ? "Desactivar narrador" : "Activar narrador")}
          className={`absolute top-8 right-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 z-20 shadow-lg border-2 ${
            isNarratorActive 
              ? "bg-white text-[#2B59FF] border-white/50" 
              : "bg-slate-800/40 text-slate-300 border-slate-500/30"
          }`}
        >
          {isNarratorActive ? <Volume2 size={32} strokeWidth={2.5} /> : <VolumeX size={32} strokeWidth={2.5} />}
        </button>

        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                speak("Cerrando sesión");
                navigate("/");
              }}
              onMouseEnter={() => speak("Cerrar sesión")}
              className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all"
            >
              <LogOut size={24} />
            </button>
            <div className="max-w-[160px]" onMouseEnter={() => speak(`Hola de nuevo, ${userName}`)}>
              <p className="text-blue-100 text-[18px] font-medium leading-none mb-1">¡Hola de nuevo!</p>
              <h2 className="text-3xl font-extrabold tracking-tight truncate">{userName}</h2>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <p className="text-blue-100 text-[20px] leading-relaxed max-w-[220px]" onMouseEnter={() => speak("Aquí tienes tu medicina pendiente. Tu salud está al día hoy.")}>
            Aquí tienes tu medicina pendiente. Tu salud está al día hoy.
          </p>
          <button
            onClick={handleSOS}
            onMouseEnter={() => speak("Botón de emergencia S O S")}
            className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-extrabold px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition-all sos-pulse text-[24px]"
          >
            <span className="w-3 h-3 bg-white rounded-full inline-block animate-ping" />
            SOS
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 -mt-12 space-y-5 relative z-10 pb-6">

        {/* Medicine Card */}
        <div className={`bg-white rounded-3xl p-6 shadow-xl border border-slate-100 transition-all ${medTomada ? "success-pop" : ""}`}>
          <div className="flex justify-between items-center mb-5">
            <span 
              className="text-[18px] font-black text-[#2B59FF] uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-xl cursor-help"
              onMouseEnter={() => speak("Próxima toma de medicina")}
            >
              Próxima toma
            </span>
            <span 
              className="text-[18px] font-black text-[#2B59FF] bg-blue-50/50 px-3 py-1.5 rounded-xl cursor-help"
              onMouseEnter={() => speak(`La hora programada es a las ${nextMed.hora}`)}
            >
              {nextMed.hora}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6 cursor-help" onMouseEnter={() => speak(`Medicina: ${nextMed.nombre}`)}>
            <div className="bg-blue-50 p-3 rounded-2xl text-[#2B59FF] shrink-0">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-slate-800 leading-tight">{nextMed.nombre}</h3>
          </div>

          <div 
            className="text-slate-500 text-lg mb-6 flex items-start gap-3 cursor-help"
            onMouseEnter={() => speak(`Instrucción: ${nextMed.instruccion}`)}
          >
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{nextMed.instruccion}</span>
          </div>

          <button
            onClick={handleTomarMedicina}
            onMouseEnter={() => speak(takenCount >= totalMeds ? "Ya has tomado todo" : medTomada ? "Medicina registrada" : "Botón: Ya lo tomé")}
            disabled={medTomada || takenCount >= totalMeds}
            className={`w-full active:scale-95 text-white py-5 px-6 rounded-2xl font-bold text-[24px] shadow-lg transition-all flex justify-center items-center gap-3 ${
              medTomada || takenCount >= totalMeds
                ? "bg-green-500 shadow-green-200 cursor-default"
                : "bg-[#2B59FF] hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            {takenCount >= totalMeds ? "¡Todo tomado! 🎉" : medTomada ? "¡Registrado!" : "¡Ya lo tomé!"}
          </button>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100 cursor-help" onMouseEnter={() => speak(`Tu progreso es del ${progressPercent} por ciento. Has tomado ${takenCount} de ${totalMeds} medicinas.`)}>
          <h4 className="text-base font-bold text-slate-500 mb-3 uppercase tracking-wider">Tu Progreso de Hoy</h4>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center flex-shrink-0">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" stroke="#E2E8F0" strokeWidth="5" fill="transparent" />
                <circle
                  cx="28" cy="28" r="24"
                  stroke="#2B59FF" strokeWidth="5" fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className="transition-all duration-500"
                />
              </svg>
              <span className="absolute text-xs font-black text-slate-800">{progressPercent}%</span>
            </div>
            <div>
              <p className="font-extrabold text-slate-800 text-lg">
                {takenCount} de {totalMeds} medicinas tomadas
              </p>
              {takenCount < totalMeds && (
                <p className="text-sm text-slate-500">
                  Siguiente a las {nextMedForProgress.hora}
                </p>
              )}
              {takenCount >= totalMeds && (
                <p className="text-sm text-emerald-600 font-semibold">¡Todas las medicinas tomadas!</p>
              )}
            </div>
          </div>
        </div>

        {/* Mood Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
          <h4 
            className="text-xl font-bold text-slate-500 mb-5 cursor-help"
            onMouseEnter={() => speak(`¿Cómo te sientes hoy, ${userName.split(' ')[0]}?`)}
          >
            ¿Cómo te sientes hoy, {userName.split(' ')[0]}?
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {moodOptions.map((mood) => {
              const isSelected = animoSeleccionado === mood.key;
              return (
                <button
                  key={mood.key}
                  onClick={() => handleSeleccionarAnimo(mood.key)}
                  onMouseEnter={() => speak(`Botón: Me siento ${mood.label}`)}
                  className={`p-6 rounded-[2.5rem] transition-all text-center active:scale-95 border-2 flex flex-col items-center justify-center gap-2 ${
                    isSelected ? mood.selClass : `bg-slate-50 border-transparent ${mood.hoverClass}`
                  }`}
                >
                  <span className="text-5xl block">{mood.emoji}</span>
                  <span className="text-lg font-black text-slate-700">{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-4 pb-8">
          <button
            onClick={() => {
              speak("Abriendo Mis Medicinas");
              navigate("/medicines");
            }}
            onMouseEnter={() => speak("Botón: Mis Medicinas")}
            className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-700 text-center leading-tight">Mis Medicinas</span>
          </button>
          <button
            onClick={() => {
              speak("Abriendo Registrar Salud");
              navigate("/vitals");
            }}
            onMouseEnter={() => speak("Botón: Registrar Salud")}
            className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-700 text-center leading-tight">Registrar Salud</span>
          </button>
          <button
            onClick={() => {
              speak("Abriendo Mis Citas");
              navigate("/appointments");
            }}
            onMouseEnter={() => speak("Botón: Mis Citas")}
            className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
              <Calendar size={28} />
            </div>
            <span className="text-lg font-bold text-slate-700 text-center leading-tight">Mis Citas</span>
          </button>
        </div>
      </div>

      {/* Modal SOS — botones grandes, sin diálogos nativos */}
      {showSOS && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => !sosSent && setShowSOS(false)} />
          <div className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-sm text-center shadow-2xl space-y-6">
            {sosSent ? (
              <>
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <PhoneCall size={48} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 leading-tight">¡Alerta enviada!</h2>
                <p className="text-xl font-bold text-slate-500 leading-relaxed">
                  Tu cuidador <span className="text-emerald-600">Juan</span> ya fue notificado. Mantén la calma.
                </p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto sos-pulse">
                  <Siren size={48} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 leading-tight">¿Necesitas ayuda?</h2>
                <p className="text-xl font-bold text-slate-500 leading-relaxed">
                  Enviaremos una alerta con tu ubicación a tu cuidador.
                </p>
                <button
                  onClick={confirmSOS}
                  onMouseEnter={() => speak("Botón: Sí, enviar alerta")}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-[2rem] py-6 text-2xl font-black shadow-lg shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Siren size={28} />
                  Sí, enviar alerta
                </button>
                <button
                  onClick={() => setShowSOS(false)}
                  onMouseEnter={() => speak("Botón: Cancelar, estoy bien")}
                  className="w-full bg-slate-100 text-slate-600 rounded-[2rem] py-5 text-xl font-black active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <X size={24} />
                  Estoy bien, cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .sos-pulse { animation: pulse-red 2s infinite; }

        @keyframes success-pop {
          0% { transform: scale(0.97); opacity: 0.8; }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }
        .success-pop { animation: success-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
}
