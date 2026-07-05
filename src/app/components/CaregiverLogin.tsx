import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function CaregiverLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Por favor completa todos los campos.");
      return;
    }
    // Simulación de login para la demo
    toast.success("¡Bienvenido de vuelta!");
    navigate("/caregiver/dashboard");
  };

  const handleSocialLogin = (provider: string) => {
    toast.success(`Sesión iniciada con ${provider}`, { description: "Entrando a tu panel... (Demo)" });
    setTimeout(() => navigate("/caregiver/dashboard"), 800);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-y-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#2B59FF] text-white px-6 pt-10 pb-12 rounded-b-[2.5rem] shadow-lg relative z-20">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Iniciar Sesión</h1>
          <div className="w-12 h-12" />
        </div>
        <p className="text-blue-100 text-base leading-relaxed opacity-90">
          Ingresa tus credenciales para acceder a tu panel de control.
        </p>
      </div>

      <div className="px-6 -mt-6 relative z-30 space-y-6 pb-12">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 flex flex-col gap-5">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B59FF]">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Correo electronico"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-base font-medium focus:outline-none focus:border-[#2B59FF] transition-all placeholder:text-sm placeholder:font-bold placeholder:text-slate-400"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B59FF]">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Contraseña"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-12 py-4 text-base font-medium focus:outline-none focus:border-[#2B59FF] transition-all placeholder:text-sm placeholder:font-bold placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2B59FF] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => toast.info("Correo de recuperación enviado", { description: "Revisa tu bandeja de entrada. (Demo)" })}
                className="text-sm font-bold text-[#2B59FF] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2B59FF] text-white rounded-xl py-4 text-xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all flex justify-center items-center gap-2 mt-2"
            >
              <LogIn size={20} strokeWidth={2.5} />
              Entrar
            </button>
          </div>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-50 px-4 text-sm font-bold text-slate-400">O entra con</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleSocialLogin("Google")} className="bg-white border border-slate-200 rounded-xl py-3 px-4 flex items-center justify-center gap-3 active:scale-95 transition-all shadow-sm">
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-bold text-slate-700">Google</span>
          </button>

          <button onClick={() => handleSocialLogin("Microsoft")} className="bg-white border border-slate-200 rounded-xl py-3 px-4 flex items-center justify-center gap-3 active:scale-95 transition-all shadow-sm">
            <svg viewBox="0 0 23 23" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H12z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
            <span className="text-sm font-bold text-slate-700">Microsoft</span>
          </button>
        </div>
        
        <p className="text-center mt-4 text-sm font-semibold text-slate-400">
          ¿No tienes una cuenta?{" "}
          <button onClick={() => navigate("/caregiver/register")} className="text-[#2B59FF] font-bold">
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
