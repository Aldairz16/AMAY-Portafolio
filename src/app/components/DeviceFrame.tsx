import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { HeartPulse, Bell, MapPin, Mic, CalendarCheck } from "lucide-react";
import { VoiceProvider } from "../context/VoiceContext";
import amayIcon from "../../assets/amay-icon.png";

const features = [
  { icon: Mic, text: "Narrador por voz que lee botones y recordatorios" },
  { icon: Bell, text: "Recordatorio de medicinas con confirmación de toma" },
  { icon: HeartPulse, text: "Registro de signos vitales y estado de ánimo" },
  { icon: MapPin, text: "Botón SOS y ubicación GPS para el cuidador" },
  { icon: CalendarCheck, text: "Agenda de citas médicas compartida" },
];

export function DeviceFrame() {
  return (
    <VoiceProvider>
      <div className="min-h-[100dvh] bg-white lg:h-screen lg:overflow-hidden lg:flex lg:items-center lg:justify-center lg:gap-10 xl:gap-16 lg:px-8 xl:px-12 lg:bg-gradient-to-br lg:from-blue-50 lg:via-white lg:to-indigo-100 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Panel de portafolio — solo escritorio */}
        <aside className="hidden lg:flex flex-col lg:max-w-md xl:max-w-lg min-w-0 shrink lg:gap-5 xl:gap-8 lg:max-h-[94vh] lg:overflow-y-auto lg:py-4">
          <div className="flex items-center gap-5">
            <img
              src={amayIcon}
              alt="Logo de AMAY"
              className="w-16 h-16 xl:w-20 xl:h-20 rounded-[1.4rem] xl:rounded-[1.6rem] shadow-xl shadow-blue-600/25"
            />
            <div>
              <h1 className="text-4xl xl:text-5xl font-black text-slate-900 tracking-tight">AMAY</h1>
              <p className="text-lg font-bold text-blue-600">Tu asistente de salud</p>
            </div>
          </div>

          <p className="text-base xl:text-lg text-slate-600 leading-relaxed font-medium">
            Aplicación móvil pensada para <strong className="text-slate-800">adultos mayores</strong> y
            sus cuidadores: tipografía grande, alto contraste, guía por voz y acciones de un solo toque.
          </p>

          <ul className="space-y-3 xl:space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4">
                <span className="w-10 h-10 xl:w-11 xl:h-11 bg-white text-[#2B59FF] rounded-2xl flex items-center justify-center shadow-md shadow-blue-100 border border-blue-50 shrink-0">
                  <Icon size={20} strokeWidth={2.5} />
                </span>
                <span className="text-sm xl:text-base font-semibold text-slate-700">{text}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center flex-wrap gap-2 xl:gap-3">
            {["React", "Tailwind CSS", "Vite", "Web Speech API"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 bg-white/80 border border-slate-200 rounded-full text-sm font-bold text-slate-500"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-sm font-semibold text-slate-400">
            Demo interactiva de portafolio — prueba la app en el teléfono 👉
            <span className="block mt-1">Todos los datos son ficticios.</span>
          </p>
        </aside>

        {/* Teléfono: pantalla completa en móvil, mockup con bisel en escritorio */}
        <div className="w-full h-[100dvh] lg:h-[min(844px,94vh)] lg:w-auto lg:aspect-[410/844] lg:shrink-0 lg:rounded-[3.2rem] lg:bg-slate-900 lg:p-[11px] lg:shadow-[0_45px_90px_-25px_rgba(30,58,138,0.5)] lg:relative">
          {/* Botones laterales del mockup */}
          <div className="hidden lg:block absolute -left-[3px] top-[16%] w-[4px] h-10 bg-slate-700 rounded-l-lg" />
          <div className="hidden lg:block absolute -left-[3px] top-[26%] w-[4px] h-16 bg-slate-700 rounded-l-lg" />
          <div className="hidden lg:block absolute -right-[3px] top-[22%] w-[4px] h-20 bg-slate-700 rounded-r-lg" />

          {/* Pantalla: transform crea un containing block para que los modales
              con position:fixed queden dentro del teléfono en escritorio */}
          <div className="w-full h-full bg-white relative overflow-hidden flex flex-col transform-gpu lg:rounded-[2.6rem]">
            {/* Isla dinámica */}
            <div className="hidden lg:block absolute top-2 left-1/2 -translate-x-1/2 w-24 h-[20px] bg-slate-900 rounded-full z-[200] pointer-events-none" />
            <Outlet />
            <Toaster
              position="top-center"
              offset={52}
              toastOptions={{
                style: {
                  fontSize: "16px",
                  fontWeight: 700,
                  borderRadius: "1.25rem",
                  padding: "16px 20px",
                },
              }}
              richColors
            />
          </div>
        </div>
      </div>
    </VoiceProvider>
  );
}
