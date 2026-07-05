import { createBrowserRouter } from "react-router";
import { RoleSelection } from "./components/RoleSelection";
import { Onboarding } from "./components/Onboarding";
import { OlderAdultHome } from "./components/OlderAdultHome";
import { VitalsRegistration } from "./components/VitalsRegistration";
import { MedicinesList } from "./components/MedicinesList";
import { AppointmentsList } from "./components/AppointmentsList";
import { MainLayout } from "./components/MainLayout";
import { Profile } from "./components/Profile";
import { CaregiverAuth } from "./components/CaregiverAuth";
import { CaregiverLogin } from "./components/CaregiverLogin";
import { CaregiverRegister } from "./components/CaregiverRegister";
import { CaregiverDashboard } from "./components/CaregiverDashboard";
import { ElderlyRegistration } from "./components/ElderlyRegistration";
import { CaregiverBottomNav } from "./components/CaregiverBottomNav";
import { CaregiverPills } from "./components/CaregiverPills";
import { CaregiverGPS } from "./components/CaregiverGPS";
import { CaregiverVitals } from "./components/CaregiverVitals";
import { CaregiverAppointments } from "./components/CaregiverAppointments";
import { CaregiverSettings } from "./components/CaregiverSettings";
import { CaregiverAccountSecurity } from "./components/CaregiverAccountSecurity";
import { CaregiverPreferences } from "./components/CaregiverPreferences";
import { CaregiverHelpCenter } from "./components/CaregiverHelpCenter";
import { DeviceFrame } from "./components/DeviceFrame";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DeviceFrame />,
    children: [
      {
        index: true,
        Component: RoleSelection,
      },
      {
        path: "onboarding",
        Component: Onboarding,
      },
      {
        path: "caregiver/auth",
        Component: CaregiverAuth,
      },
      {
        path: "caregiver/login",
        Component: CaregiverLogin,
      },
      {
        path: "caregiver/register",
        Component: CaregiverRegister,
      },
      {
        path: "caregiver/dashboard",
        Component: () => (
          <div className="h-full flex flex-col">
            <CaregiverDashboard />
            <CaregiverBottomNav />
          </div>
        ),
      },
      {
        path: "caregiver/register-elderly",
        Component: ElderlyRegistration,
      },
      {
        path: "caregiver/pills",
        Component: () => (
          <div className="h-full flex flex-col">
            <CaregiverPills />
            <CaregiverBottomNav />
          </div>
        ),
      },
      {
        path: "caregiver/vitals",
        Component: () => (
          <div className="h-full flex flex-col">
            <CaregiverVitals />
            <CaregiverBottomNav />
          </div>
        ),
      },
      {
        path: "caregiver/gps",
        Component: () => (
          <div className="h-full flex flex-col">
            <CaregiverGPS />
            <CaregiverBottomNav />
          </div>
        ),
      },
      {
        path: "caregiver/appointments",
        Component: () => (
          <div className="h-full flex flex-col">
            <CaregiverAppointments />
            <CaregiverBottomNav />
          </div>
        ),
      },
      {
        path: "caregiver/settings",
        Component: () => (
          <div className="h-full flex flex-col">
            <CaregiverSettings />
            <CaregiverBottomNav />
          </div>
        ),
      },
      {
        path: "caregiver/settings/account",
        Component: () => (
          <div className="h-full flex flex-col">
            <CaregiverAccountSecurity />
            <CaregiverBottomNav />
          </div>
        ),
      },
      {
        path: "caregiver/settings/preferences",
        Component: () => (
          <div className="h-full flex flex-col">
            <CaregiverPreferences />
            <CaregiverBottomNav />
          </div>
        ),
      },
      {
        path: "caregiver/settings/help",
        Component: () => (
          <div className="h-full flex flex-col">
            <CaregiverHelpCenter />
            <CaregiverBottomNav />
          </div>
        ),
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "home",
            Component: OlderAdultHome,
          },
          {
            path: "vitals",
            Component: VitalsRegistration,
          },
          {
            path: "medicines",
            Component: MedicinesList,
          },
          {
            path: "appointments",
            Component: AppointmentsList,
          },
          {
            path: "profile",
            Component: Profile,
          },
        ],
      },
    ],
  },
], {
  // Coincide con el "base" de Vite: "/" en desarrollo/deploy standalone,
  // o el subpath donde se monte la demo embebida (ver package.json → build:embed).
  // Sin slash final: react-router no matchea el basename si la URL visitada
  // no trae ese slash (ej. "/proyectos/amay/demo" vs. basename "/proyectos/amay/demo/").
  basename:
    import.meta.env.BASE_URL === "/"
      ? undefined
      : import.meta.env.BASE_URL.replace(/\/$/, ""),
});
