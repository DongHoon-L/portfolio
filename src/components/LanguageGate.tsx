"use client";

import { motion } from "framer-motion";

interface LanguageGateProps {
  onSelectLanguage: (lang: "ko" | "en") => void;
}

export default function LanguageGate({ onSelectLanguage }: LanguageGateProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] text-emerald-400 font-mono overflow-hidden"
    >
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(16,185,129,0.05)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-black/60 backdrop-blur-md border border-emerald-500/30 rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-emerald-500/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/50 border border-amber-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/50 border border-emerald-500/50"></div>
          </div>
          <span className="text-xs text-emerald-500/70 tracking-widest ml-2">SYSTEM ACCESS REQUEST</span>
        </div>

        <div className="space-y-6">
          <div className="text-sm">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2"
            >
              <span className="text-white">Connecting...</span> [OK]
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <span className="text-white">Establishing secure link...</span> [OK]
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="text-white mb-2"
            >
              Please select your preferred communication protocol:
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={() => onSelectLanguage("ko")}
              className="group relative w-full p-4 border border-emerald-500/50 rounded bg-emerald-950/20 hover:bg-emerald-500/10 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <div className="relative flex justify-between items-center">
                <span className="font-bold text-emerald-400 group-hover:text-emerald-300 shadow-emerald-500/50 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">한국어 (Korean)</span>
                <span className="text-xs opacity-50 font-mono group-hover:opacity-100 transition-opacity">PROTOCOL_KO</span>
              </div>
            </button>
            <button
              onClick={() => onSelectLanguage("en")}
              className="group relative w-full p-4 border border-emerald-500/50 rounded bg-emerald-950/20 hover:bg-emerald-500/10 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <div className="relative flex justify-between items-center">
                <span className="font-bold text-emerald-400 group-hover:text-emerald-300 shadow-emerald-500/50 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">English</span>
                <span className="text-xs opacity-50 font-mono group-hover:opacity-100 transition-opacity">PROTOCOL_EN</span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
