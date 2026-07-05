import { NavLink, useLocation } from "react-router";
import { Home, Pill, HeartPulse, MapPin, Calendar } from "lucide-react";

export function CaregiverBottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/caregiver/dashboard", icon: Home, label: "Inicio" },
    { path: "/caregiver/pills", icon: Pill, label: "Pastillas" },
    { path: "/caregiver/vitals", icon: HeartPulse, label: "Salud" },
    { path: "/caregiver/appointments", icon: Calendar, label: "Citas" },
    { path: "/caregiver/gps", icon: MapPin, label: "GPS" },
  ];

  return (
    <div className="bg-white border-t border-slate-200 px-1 py-3 pb-6 flex items-center justify-around shadow-[0_-4px_25px_rgba(0,0,0,0.08)] rounded-t-[1.5rem] fixed bottom-0 left-0 right-0 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 min-w-[4.5rem] transition-all active:scale-95 ${
              isActive ? "text-[#2B59FF]" : "text-slate-400"
            }`}
          >
            <div className="p-1">
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[11px] font-bold tracking-tight ${isActive ? "text-[#2B59FF]" : "text-slate-500"}`}>
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
}
