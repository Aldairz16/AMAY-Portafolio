import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, ChevronRight, User, Pill, HeartHandshake, Sparkles, Smile } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loginCode, setLoginCode] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginCode.trim()) {
      setIsLoginSuccess(true);
      // For mock purposes, if it's a known code, we could set a specific name
      if (loginCode === "AMA-482391") {
        localStorage.setItem("amay_user_name", "María García");
      }
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  };

  const saveName = (val: string) => {
    setName(val);
    localStorage.setItem("amay_user_name", val);
  };

  const renderStep = () => {
    if (showLogin) {
      if (isLoginSuccess) {
        return (
          <motion.div 
            key="login-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full items-center justify-center text-center space-y-8"
          >
            <div className="w-32 h-32 bg-green-50 text-green-500 rounded-[2.5rem] flex items-center justify-center shadow-lg shadow-green-100 border-2 border-green-100">
              <CheckCircle size={64} strokeWidth={2.5} />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">
                ¡Bienvenido <br />
                <span className="text-[#2B59FF]">de vuelta!</span>
              </h2>
              <p className="text-xl font-bold text-slate-400 max-w-[280px] mx-auto">
                Estamos preparando todo para ti...
              </p>
            </div>
          </motion.div>
        );
      }

      return (
        <motion.div 
          key="login-form"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col h-full"
        >
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-[2rem] flex items-center justify-center text-[#2B59FF]">
                <User size={48} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 leading-tight">
                Inicia <span className="text-[#2B59FF]">Sesión</span>
              </h2>
              <p className="text-xl font-bold text-slate-400">
                Escribe tu código personal para entrar a AMAY.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="bg-slate-50 p-6 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
                <input 
                  type="text" 
                  placeholder="AMA-000000" 
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value.toUpperCase())}
                  className="w-full bg-transparent border-none rounded-[1.5rem] p-4 text-3xl font-black focus:outline-none text-slate-900 placeholder:text-slate-300 tracking-wider"
                  autoFocus
                />
              </div>
              
              <button
                type="submit"
                disabled={!loginCode.trim()}
                className="w-full bg-[#2B59FF] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-[2rem] py-6 text-2xl font-black shadow-lg shadow-blue-200/50 transition-all active:scale-[0.98] flex items-center justify-center gap-4"
              >
                Entrar ahora
              </button>
            </form>
          </div>

          <button 
            onClick={() => setShowLogin(false)}
            className="mt-8 py-4 text-slate-400 font-bold text-lg hover:text-[#2B59FF] transition-colors"
          >
            No tengo código, <span className="text-[#2B59FF]">crear cuenta</span>
          </button>
        </motion.div>
      );
    }

    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-[2rem] flex items-center justify-center text-[#2B59FF]">
                  <Smile size={48} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 leading-tight">
                  ¡Hola! <br />
                  <span className="text-[#2B59FF]">¿Cómo te llamas?</span>
                </h2>
                <p className="text-xl font-bold text-slate-400">
                  Nos gustaría saber cómo dirigirte a ti.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
                <input 
                  type="text" 
                  placeholder="Escribe tu nombre" 
                  value={name}
                  onChange={(e) => saveName(e.target.value)}
                  className="w-full bg-transparent border-none rounded-[1.5rem] p-4 text-3xl font-black focus:outline-none text-slate-900 placeholder:text-slate-300"
                  autoFocus
                />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={nextStep}
                disabled={!name.trim()}
                className="w-full bg-[#2B59FF] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-[2rem] py-6 text-2xl font-black shadow-lg shadow-blue-200/50 transition-all active:scale-[0.98] flex items-center justify-center gap-4"
              >
                Continuar 
                <ChevronRight size={32} strokeWidth={3} />
              </button>
              
              <button 
                onClick={() => setShowLogin(true)}
                className="w-full py-4 text-slate-400 font-bold text-lg hover:text-[#2B59FF] transition-colors"
              >
                ¿Ya tienes una cuenta? <span className="text-[#2B59FF]">Inicia sesión</span>
              </button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="step2"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-[2rem] flex items-center justify-center text-[#2B59FF]">
                  <Pill size={48} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 leading-tight">
                  ¿Tomas medicinas <span className="text-[#2B59FF]">a diario?</span>
                </h2>
                <p className="text-xl font-bold text-slate-400">
                  {name}, esto nos ayudará a recordarte tus tomas.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={nextStep}
                  className="w-full bg-white border-2 border-slate-100 text-slate-900 rounded-[2.5rem] p-6 flex items-center gap-6 transition-all active:scale-[0.98] shadow-lg shadow-slate-200/50 group"
                >
                  <div className="w-16 h-16 bg-blue-50 text-[#2B59FF] rounded-[1.5rem] flex items-center justify-center border-2 border-blue-100 shrink-0">
                    <CheckCircle size={32} strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-black block leading-tight">Sí, tomo medicinas</span>
                    <p className="text-base font-bold text-slate-400">Configuraremos tus alertas</p>
                  </div>
                </button>

                <button 
                  onClick={nextStep}
                  className="w-full bg-white border-2 border-slate-100 text-slate-900 rounded-[2.5rem] p-6 flex items-center gap-6 transition-all active:scale-[0.98] shadow-lg shadow-slate-200/50 group"
                >
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-[1.5rem] flex items-center justify-center border-2 border-slate-100 shrink-0">
                    <User size={32} strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-black block leading-tight">No tomo medicinas</span>
                    <p className="text-base font-bold text-slate-400">Solo quiero monitorear</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            key="step3"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-[2rem] flex items-center justify-center text-[#2B59FF]">
                  <HeartHandshake size={48} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 leading-tight">
                  ¿Quieres ayuda de un <span className="text-[#2B59FF]">familiar?</span>
                </h2>
                <p className="text-xl font-bold text-slate-400 leading-relaxed">
                  Podrá ver tu salud y ayudarte si lo necesitas. Es más seguro para ti.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={nextStep}
                  className="w-full bg-[#2B59FF] text-white rounded-[2.5rem] p-6 flex items-center gap-6 transition-all shadow-lg shadow-blue-200/50 active:scale-[0.98] group"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center border-2 border-white/30 shrink-0">
                    <Sparkles size={32} strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-black block leading-tight">Vincular a alguien</span>
                    <p className="text-base font-bold text-blue-100/80">Compartir mi salud</p>
                  </div>
                </button>

                <button 
                  onClick={nextStep}
                  className="w-full bg-white border-2 border-slate-100 text-slate-500 rounded-[2.5rem] py-6 flex items-center justify-center transition-all active:scale-[0.98] shadow-sm font-black text-xl"
                >
                  Omitir por ahora
                </button>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full items-center justify-center text-center space-y-8"
          >
            <div className="relative">
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 bg-green-50 text-green-500 rounded-[2.5rem] flex items-center justify-center shadow-lg shadow-green-100 border-2 border-green-100"
              >
                <CheckCircle size={64} strokeWidth={2.5} />
              </motion.div>
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-3 rounded-full shadow-lg">
                <Sparkles size={24} />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">
                ¡Todo listo, <br />
                <span className="text-[#2B59FF]">{name}!</span>
              </h2>
              <p className="text-xl font-bold text-slate-400 max-w-[280px] mx-auto">
                Tu salud está en las mejores manos.
              </p>
            </div>
            
            <button
              onClick={() => navigate("/home")}
              className="w-full bg-[#2B59FF] text-white rounded-[2rem] py-6 text-2xl font-black shadow-lg shadow-blue-200/50 transition-all active:scale-[0.98] mt-8"
            >
              Comenzar ahora
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header with back button & progress */}
      {step < 4 && !isLoginSuccess && (
        <div className="p-8 pt-12 flex items-center justify-between bg-white z-10">
          <button 
            onClick={() => {
              if (showLogin) {
                setShowLogin(false);
              } else if (step === 1) {
                navigate(-1);
              } else {
                prevStep();
              }
            }}
            className="w-16 h-16 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] flex items-center justify-center active:bg-slate-100 transition-colors shadow-sm"
          >
            <ArrowLeft size={36} strokeWidth={3} className="text-slate-700" />
          </button>
          
          {!showLogin && (
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i} 
                  initial={false}
                  animate={{
                    width: i === step ? 48 : 16,
                    backgroundColor: i === step ? "#2B59FF" : i < step ? "#BFDBFE" : "#F1F5F9"
                  }}
                  className="h-4 rounded-full transition-all duration-300"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 px-8 pb-12 overflow-y-auto pt-4">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}
