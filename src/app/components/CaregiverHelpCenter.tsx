import { useNavigate } from "react-router";
import { ArrowLeft, Search, MessageCircle, PhoneCall, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CaregiverHelpCenter() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      q: "¿Cómo vinculo a un adulto mayor?",
      a: "Para vincular a alguien, necesitas el 'Código AM' generado desde la aplicación del adulto mayor. Ingresa este código en tu panel de 'Añadir nuevo adulto' y la conexión será inmediata."
    },
    {
      q: "¿Qué significan los estados de salud?",
      a: "El estado 'Estable' (verde) significa que todos los signos vitales están en rangos normales. 'Alerta' (amarillo) sugiere revisión, y 'Crítico' (rojo) requiere atención inmediata."
    },
    {
      q: "¿Cómo configuro las zonas de seguridad?",
      a: "En el mapa GPS, presiona el icono de engranaje para definir perímetros. Recibirás una notificación si el adulto mayor sale de estas zonas seguras."
    },
    {
      q: "¿Cómo agrego nuevos medicamentos?",
      a: "Ve a la sección 'Medicación' y presiona el botón '+'. Puedes programar la hora, dosis y el nombre del fármaco para recibir alertas de cumplimiento."
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-y-auto pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="bg-[#2B59FF] text-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Centro de Ayuda</h1>
        </div>
      </div>

      <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar soluciones..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenIndex(0);
            }}
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 font-medium shadow-sm focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <section className="space-y-4">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {faqs.filter(f => (f.q + " " + f.a).toLowerCase().includes(search.toLowerCase())).length === 0 && (
              <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center">
                <p className="text-sm font-bold text-slate-400">No encontramos resultados para "{search}"</p>
              </div>
            )}
            {faqs.filter(f => (f.q + " " + f.a).toLowerCase().includes(search.toLowerCase())).map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-bold text-slate-700 pr-4">{faq.q}</span>
                  {openIndex === idx ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-slate-400" />}
                </button>
                {openIndex === idx && (
                  <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Contacto Directo</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => toast.info("Conectando con soporte...", { description: "Ana del equipo AMAY te atenderá en unos segundos. (Demo)" })}
              className="bg-blue-50 p-6 rounded-[2rem] flex flex-col items-center gap-3 border border-blue-100 active:scale-95 transition-all"
            >
              <MessageCircle size={32} className="text-[#2B59FF]" />
              <span className="text-xs font-black text-[#2B59FF]">Chat Vivo</span>
            </button>
            <button
              onClick={() => toast.info("Llamando a soporte AMAY...", { description: "+51 (01) 555-0123 · Lun a Sáb, 8am - 8pm. (Demo)" })}
              className="bg-emerald-50 p-6 rounded-[2rem] flex flex-col items-center gap-3 border border-emerald-100 active:scale-95 transition-all"
            >
              <PhoneCall size={32} className="text-emerald-600" />
              <span className="text-xs font-black text-emerald-600">Llamada</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
