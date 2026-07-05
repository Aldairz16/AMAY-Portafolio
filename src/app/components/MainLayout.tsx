import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function MainLayout() {
  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
