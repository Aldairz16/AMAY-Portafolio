import { useNavigate } from "react-router";
import { ArrowLeft, Bell, Heart, MapPin, Moon, Sun, Globe, Check } from "lucide-react";
import { useState } from "react";

export function CaregiverPreferences() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("es");

  const [notifs, setNotifs] = useState({
    meds: true,
    gps: true,
    vitals: false
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-y-auto pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="bg-[#2B59FF] text-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Preferencias</h1>
        </div>
      </div>

      <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="space-y-4">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Notificaciones Al Instante</h2>
          <div className="bg-white rounded-[2.5rem] p-2 border border-slate-100 shadow-sm">
            {[
              { id: 'meds', icon: Bell, label: "Alertas de Medicina", color: "text-blue-500", bg: "bg-blue-50" },
              { id: 'gps', icon: MapPin, label: "Zonas de Seguridad GPS", color: "text-emerald-500", bg: "bg-emerald-50" },
              { id: 'vitals', icon: Heart, label: "Signos Vitales Críticos", color: "text-rose-500", bg: "bg-rose-50" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center`}>
                    <item.icon size={24} />
                  </div>
                  <span className="text-base font-bold text-slate-700">{item.label}</span>
                </div>
                <button 
                  onClick={() => setNotifs({...notifs, [item.id]: !notifs[item.id as keyof typeof notifs]})}
                  className={`w-14 h-8 rounded-full transition-all relative ${notifs[item.id as keyof typeof notifs] ? "bg-blue-500" : "bg-slate-200"}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${notifs[item.id as keyof typeof notifs] ? "right-1" : "left-1"}`}></div>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Apariencia</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setTheme("light")}
              className={`p-6 rounded-[2rem] flex flex-col items-center gap-3 border-2 transition-all ${theme === 'light' ? "bg-white border-blue-500 shadow-blue-50" : "bg-white border-transparent"}`}
            >
              <Sun size={32} className={theme === 'light' ? "text-blue-500" : "text-slate-300"} />
              <span className={`text-sm font-black ${theme === 'light' ? "text-blue-500" : "text-slate-400"}`}>Claro</span>
            </button>
            <button 
              onClick={() => setTheme("dark")}
              className={`p-6 rounded-[2rem] flex flex-col items-center gap-3 border-2 transition-all ${theme === 'dark' ? "bg-slate-900 border-blue-500" : "bg-white border-transparent"}`}
            >
              <Moon size={32} className={theme === 'dark' ? "text-blue-400" : "text-slate-300"} />
              <span className={`text-sm font-black ${theme === 'dark' ? "text-blue-400" : "text-slate-400"}`}>Oscuro</span>
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Idioma</h2>
          <div className="bg-white rounded-[2.5rem] p-2 border border-slate-100 shadow-sm">
            {[
              { id: 'es', label: "Español (Latinoamérica)", flag: "🇪🇸" },
              { id: 'en', label: "English (US)", flag: "🇺🇸" }
            ].map((langItem) => (
              <button 
                key={langItem.id}
                onClick={() => setLang(langItem.id)}
                className="w-full flex items-center justify-between p-4 active:bg-slate-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{langItem.flag}</span>
                  <span className="text-base font-bold text-slate-700">{langItem.label}</span>
                </div>
                {lang === langItem.id && <Check size={20} className="text-blue-500" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
