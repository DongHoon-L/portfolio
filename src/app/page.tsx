"use client";

import { useState } from "react";
// import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import LanguageGate from "@/components/LanguageGate";
import { ko } from "@/locales/ko";
import { en } from "@/locales/en";

export default function Home() {
  const [locale, setLocale] = useState<"ko" | "en" | null>(null);

  const t = locale === "ko" ? ko : en;

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#eee] selection:bg-emerald-500/30 relative overflow-hidden">
      
      <AnimatePresence>
        {locale === null && (
          <LanguageGate key="language-gate" onSelectLanguage={setLocale} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {locale !== null && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="contents"
          >
            {/* 배경 그리드 효과 (보안 아키텍처 느낌) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              {/* 미세한 격자 패턴 */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(16,185,129,0.03)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
              {/* 미세한 그라데이션 빛 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[500px] bg-emerald-500/10 blur-[120px] rounded-[100%]"></div>
              <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full"></div>
            </div>

            {/* 1. 상단 상태 바 */}
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-emerald-500/20 p-2">
              <div className="max-w-5xl mx-auto flex justify-between items-center text-[10px] tracking-[0.2em] font-mono uppercase text-emerald-400">
                <div>{t.nav.accessLevel} <span className="text-white">UNSW_ADV_STUDENT</span></div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {t.nav.identityVerified}
                </div>
              </div>
            </nav>

            <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20">
              
              {/* 2. Hero Section */}
              <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="grid md:grid-cols-2 gap-12 items-center mb-24"
              >
                <div className="order-2 md:order-1">
                  <p className="font-mono text-emerald-500 text-sm mb-4 tracking-tight">{t.hero.tagline}</p>
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-6">
                    {t.hero.title.part1}<span className="text-neutral-500">{t.hero.title.highlight1}</span>{t.hero.title.part2}<span className="text-emerald-500">{t.hero.title.highlight2}</span>{t.hero.title.part3}
                  </h1>
                  <p className="text-lg text-neutral-400 leading-relaxed mb-8 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: t.hero.description.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                </div>
                
                <div className="order-1 md:order-2 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] flex items-center justify-center">
                    {/* 실제 사진을 넣으려면 public/me.png 저장 후 아래 주석 해제 */}
                    {/* <Image src="/me.png" alt="Profile" fill className="object-cover" /> */}
                    <span className="text-neutral-700 font-mono">[ PROFILE_IMAGE ]</span>
                  </div>
                </div>
              </motion.section>

              {/* 3. Terminal Identity */}
              <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="mb-32"
              >
                <div className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
                  <div className="bg-neutral-800/50 px-4 py-2 border-b border-white/5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 ml-2 italic">{t.terminal.title}</span>
                  </div>
                  <div className="p-8 font-mono text-sm space-y-4">
                    <div className="flex gap-3 text-emerald-500">
                      <span>➜</span>
                      <span className="text-white">{t.terminal.command}</span>
                    </div>
                    <div className="text-neutral-400 ml-6 leading-7" dangerouslySetInnerHTML={{ __html: t.terminal.output.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                  </div>
                </div>
              </motion.section>

              {/* 4. Projects & Education */}
              <div className="grid md:grid-cols-2 gap-16">
                <motion.section
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionVariants}
                >
                  <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-8 underline decoration-emerald-500/20 underline-offset-8">{t.education.title}</h2>
                  <div className="border-l border-emerald-500/30 pl-6 relative">
                    <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-emerald-500"></div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tighter">{t.education.school}</h3>
                    <p className="text-sm text-emerald-500 font-mono mb-2">{t.education.degree}</p>
                  </div>
                </motion.section>

                <motion.section
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionVariants}
                >
                  <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-8 underline decoration-emerald-500/20 underline-offset-8">{t.certifications.title}</h2>
                  <div className="space-y-4">
                    <div className="bg-neutral-900/40 border border-white/10 p-4 rounded-lg flex justify-between items-center border-l-2 border-l-emerald-500/50 hover:bg-neutral-800/50 transition-colors">
                      <span className="text-sm font-bold uppercase tracking-tight">{t.certifications.cert1}</span>
                      <span className="text-[10px] font-mono text-emerald-500/50">{t.certifications.target1}</span>
                    </div>
                  </div>
                </motion.section>
              </div>
            </main>

            <footer className="py-20 border-t border-white/5 text-center text-neutral-600 font-mono text-[10px] tracking-widest relative z-10 bg-[#050505]/50 backdrop-blur-sm">
              {t.footer}
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}