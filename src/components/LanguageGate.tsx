"use client";

import { motion } from "framer-motion";

interface LanguageGateProps {
  onSelectLanguage: (lang: "ko" | "en") => void;
}

export default function LanguageGate({ onSelectLanguage }: LanguageGateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] text-emerald-500 font-mono tracking-wide"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.05)_0%,transparent_60%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm p-8 bg-[#0a0a0a] border border-neutral-800 shadow-2xl rounded-sm">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-800">
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
          <span className="text-xs text-neutral-400 uppercase tracking-widest">Access Request</span>
        </div>

        <div className="space-y-8">
          <div className="text-[13px] text-neutral-500 space-y-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Establishing secure connection...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Please verify your communication protocol.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col gap-4"
          >
            <button
              onClick={() => onSelectLanguage("ko")}
              className="group relative w-full px-4 py-3 border border-neutral-800 bg-neutral-900/50 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all text-left flex justify-between items-center"
            >
              <span className="text-sm font-medium text-neutral-300 group-hover:text-emerald-400 transition-colors">한국어</span>
              <span className="text-[10px] text-neutral-600 group-hover:text-emerald-500/50 transition-colors">KO_KR</span>
            </button>
            <button
              onClick={() => onSelectLanguage("en")}
              className="group relative w-full px-4 py-3 border border-neutral-800 bg-neutral-900/50 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all text-left flex justify-between items-center"
            >
              <span className="text-sm font-medium text-neutral-300 group-hover:text-emerald-400 transition-colors">English</span>
              <span className="text-[10px] text-neutral-600 group-hover:text-emerald-500/50 transition-colors">EN_US</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
