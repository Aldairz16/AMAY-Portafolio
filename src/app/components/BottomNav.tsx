import { NavLink, useLocation } from "react-router";
import { Home, Pill, HeartPulse, User, Calendar } from "lucide-react";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: "Inicio" },
    { path: "/medicines", icon: Pill, label: "Pastillas" },
    { path: "/vitals", icon: HeartPulse, label: "Salud" },
    { path: "/appointments", icon: Calendar, label: "Citas" },
    { path: "/profile", icon: User, label: "Perfil" },
  ];

  return (
    <div className="bg-white border-t border-slate-200 px-2 py-5 pb-9 flex items-center justify-between shadow-[0_-4px_25px_rgba(0,0,0,0.08)] rounded-t-[2.5rem] z-50 overflow-x-auto no-scrollbar">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1.5 min-w-[4.2rem] transition-all active:scale-90 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`}
          >
            <div className="p-1">
              <Icon size={32} strokeWidth={isActive ? 3 : 2} />
            </div>
            <span className={`text-[13px] font-black tracking-tight ${isActive ? "text-blue-600" : "text-slate-500"}`}>
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
}
