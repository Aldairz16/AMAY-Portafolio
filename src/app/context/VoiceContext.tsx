import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface VoiceContextType {
  isNarratorActive: boolean;
  toggleNarrator: () => void;
  speak: (text: string) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [isNarratorActive, setIsNarratorActive] = useState(() => {
    const saved = localStorage.getItem("amay_narrator_active");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    // Unblock speech synthesis on first user interaction
    const unblockSpeech = () => {
      try {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          window.speechSynthesis.resume();
          
          // El secreto para desbloquear es hablar algo real aunque sea un espacio
          const utterance = new SpeechSynthesisUtterance(" ");
          utterance.lang = "es-ES";
          utterance.volume = 0.01;
          window.speechSynthesis.speak(utterance);
          
          console.log("Audio desbloqueado por usuario");
        }
      } catch (e) {
        // Fallback silencioso
      }
      // Una vez desbloqueado, quitamos los listeners para ahorrar recursos
      window.removeEventListener('click', unblockSpeech);
      window.removeEventListener('touchstart', unblockSpeech);
      window.removeEventListener('mousedown', unblockSpeech);
    };

    window.addEventListener('click', unblockSpeech);
    window.addEventListener('touchstart', unblockSpeech);
    window.addEventListener('mousedown', unblockSpeech);
    
    return () => {
      window.removeEventListener('click', unblockSpeech);
      window.removeEventListener('touchstart', unblockSpeech);
      window.removeEventListener('mousedown', unblockSpeech);
    };
  }, []);

  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      let availableVoices = window.speechSynthesis.getVoices();
      
      if (availableVoices.length === 0) {
        // Reintento agresivo para navegadores lentos
        const retryInterval = setInterval(() => {
          availableVoices = window.speechSynthesis.getVoices();
          if (availableVoices.length > 0) {
            setBestVoice(availableVoices);
            clearInterval(retryInterval);
          }
        }, 200);
        return;
      }
      setBestVoice(availableVoices);
    };

    const setBestVoice = (voices: SpeechSynthesisVoice[]) => {
      // Priorizamos voces locales en español
      const preferredVoice = voices.find(v => 
        v.lang.includes("es") && v.name.includes("Google")
      ) || voices.find(v => 
        v.lang.includes("es")
      ) || voices[0];
      
      if (preferredVoice) {
        setVoice(preferredVoice);
        console.log("Voz seleccionada:", preferredVoice.name);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("amay_narrator_active", JSON.stringify(isNarratorActive));
  }, [isNarratorActive]);

  const speak = useCallback((text: string) => {
    if (!isNarratorActive || !window.speechSynthesis) return;

    // Resetear estado
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Pequeño hack para forzar el inicio en algunos navegadores
    setTimeout(() => {
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    }, 0);
  }, [isNarratorActive, voice]);

  const toggleNarrator = () => {
    const newState = !isNarratorActive;
    setIsNarratorActive(newState);
    
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
      window.speechSynthesis.cancel();
      if (newState) {
        const msg = new SpeechSynthesisUtterance("Narrador activado");
        msg.lang = voice?.lang || "es-ES";
        msg.volume = 1.0;
        window.speechSynthesis.speak(msg);
      }
    }
  };

  return (
    <VoiceContext.Provider value={{ isNarratorActive, toggleNarrator, speak }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
}
