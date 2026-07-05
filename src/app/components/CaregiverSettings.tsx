import { useNavigate } from "react-router";
import { ArrowLeft, Bell, Shield, Smartphone, HelpCircle, ChevronRight, UserCircle, Globe, Palette } from "lucide-react";
import { toast } from "sonner";

export function CaregiverSettings() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Cuenta y Perfil",
      items: [
        { icon: UserCircle, label: "Información Personal", desc: "Nombre, email y teléfono", color: "text-blue-500", bg: "bg-blue-50", path: "/caregiver/settings/account" },
        { icon: Shield, label: "Seguridad", desc: "Contraseña y autenticación", color: "text-indigo-500", bg: "bg-indigo-50", path: "/caregiver/settings/account" },
      ]
    },
    {
      title: "Preferencias",
      items: [
        { icon: Bell, label: "Notificaciones", desc: "Alertas de medicina y GPS", color: "text-rose-500", bg: "bg-rose-50", path: "/caregiver/settings/preferences" },
        { icon: Palette, label: "Apariencia", desc: "Modo oscuro y temas", color: "text-amber-500", bg: "bg-amber-50", path: "/caregiver/settings/preferences" },
        { icon: Globe, label: "Idioma", desc: "Español (Latinoamérica)", color: "text-emerald-500", bg: "bg-emerald-50", path: "/caregiver/settings/preferences" },
      ]
    },
    {
      title: "Soporte",
      items: [
        { icon: HelpCircle, label: "Centro de Ayuda", desc: "Preguntas y contacto", color: "text-slate-500", bg: "bg-slate-50", path: "/caregiver/settings/help" },
        { icon: Smartphone, label: "Versión de la App", desc: "v1.0.4 (Actualizada)", color: "text-slate-500", bg: "bg-slate-50", path: null },
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-y-auto pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#2B59FF] text-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Ajustes</h1>
        </div>
      </div>

      <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="px-2">
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            Personaliza tu experiencia en AMAY y gestiona la seguridad de la cuenta para brindar el mejor cuidado posible.
          </p>
        </div>

        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">{section.title}</h2>
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <button 
                  key={itemIdx}
                  onClick={() => item.path && navigate(item.path)}
                  className={`w-full flex items-center justify-between p-5 active:bg-slate-50 transition-colors ${
                    itemIdx !== section.items.length - 1 ? "border-b border-slate-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center`}>
                      <item.icon size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800 leading-tight">{item.label}</p>
                      <p className="text-xs font-medium text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            toast.success("Sesión cerrada correctamente");
            navigate("/");
          }}
          className="w-full py-5 px-6 rounded-[2rem] bg-rose-50 text-rose-500 font-bold text-center border border-rose-100 active:scale-95 transition-all"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
