"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import LanguageGate from "@/components/LanguageGate";
import { ko } from "@/locales/ko";
import { en } from "@/locales/en";

interface NewsItem {
  id: string;
  title: string;
  date: string;
}

export default function Home() {
  const [locale, setLocale] = useState<"ko" | "en" | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    const savedTime = localStorage.getItem("preferredLanguageTime");
    const now = new Date().getTime();
    
    // 24시간 동안 유지
    if (saved && savedTime && now - parseInt(savedTime) < 24 * 60 * 60 * 1000) {
      setLocale(saved as "ko" | "en");
    }
    setIsInitializing(false);
  }, []);

  const fetchNews = async (currentLocale: "ko" | "en") => {
    try {
      const res = await fetch(`/api/news?lang=${currentLocale}`);
      if (res.ok) {
        const data = await res.json();
        setNewsList(data.slice(0, 2));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (locale) {
      fetchNews(locale);
    }
  }, [locale]);

  const handleSelectLanguage = (lang: "ko" | "en") => {
    localStorage.setItem("preferredLanguage", lang);
    localStorage.setItem("preferredLanguageTime", new Date().getTime().toString());
    setLocale(lang);
  };

  const handleManualToggle = () => {
    const newLang = locale === "ko" ? "en" : "ko";
    handleSelectLanguage(newLang);
  };

  if (isInitializing) return null;

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
          <LanguageGate key="language-gate" onSelectLanguage={handleSelectLanguage} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {locale !== null && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="contents"
          >
            {/* 배경 그리드 효과 (보안 아키텍처 느낌) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(16,185,129,0.03)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[500px] bg-emerald-500/10 blur-[120px] rounded-[100%]"></div>
              <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full"></div>
            </div>

            {/* 1. 상단 상태 바 */}
            <nav className="fixed top-0 w-full z-50 bg-[#050505]/60 backdrop-blur-xl border-b border-neutral-800 p-3 transition-all duration-300">
              <div className="max-w-5xl mx-auto flex justify-between items-center text-[10px] tracking-[0.2em] font-mono uppercase text-emerald-400">
                <div>{t.nav.accessLevel} <span className="text-white">UNSW_ADV_STUDENT</span></div>
                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {t.nav.identityVerified}
                  </div>
                  <button 
                    onClick={handleManualToggle}
                    className="border border-neutral-800 bg-neutral-900/50 hover:border-emerald-500/50 px-3 py-1.5 rounded-sm transition-all text-neutral-400 hover:text-emerald-400 uppercase tracking-widest flex items-center gap-2"
                  >
                    {locale === "ko" ? "EN" : "KR"} 
                    <span className="text-[8px] opacity-50">/ Switch</span>
                  </button>
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
                className="grid md:grid-cols-2 gap-12 items-center mb-32"
              >
                <div className="order-2 md:order-1">
                  <p className="font-mono text-emerald-500 text-sm mb-4 tracking-tight">{t.hero.tagline}</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight mb-6 font-sans">
                    {t.hero.title.part1}<span className="text-neutral-500">{t.hero.title.highlight1}</span>{t.hero.title.part2}<span className="text-emerald-500">{t.hero.title.highlight2}</span>{t.hero.title.part3}
                  </h1>
                  <p className="font-sans text-lg text-neutral-400 leading-relaxed mb-8 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: t.hero.description.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                </div>
                
                <div className="order-1 md:order-2 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] flex items-center justify-center">
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
                className="mb-40"
              >
                <div className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-neutral-800 rounded-xl overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
                  <div className="bg-neutral-800/30 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 ml-2 italic">{t.terminal.title}</span>
                  </div>
                  <div className="p-8 text-sm space-y-4">
                    <div className="flex gap-3 text-emerald-500 font-mono">
                      <span>➜</span>
                      <span className="text-white">{t.terminal.command}</span>
                    </div>
                    <div className="text-neutral-400 ml-6 leading-8 font-sans text-[15px]" dangerouslySetInnerHTML={{ __html: t.terminal.output.replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-400 font-medium">$1</strong>') }} />
                  </div>
                </div>
              </motion.section>

              {/* 4. Projects, News & Education */}
              <div className="grid md:grid-cols-2 gap-20 mb-20">
                
                {/* Left Column: Projects & Education */}
                <div className="space-y-20">
                  <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                  >
                    <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-8 underline decoration-emerald-500/20 underline-offset-8">{t.projects.title}</h2>
                    <div className="space-y-6">
                      {t.projects.list.map((proj, idx) => (
                        <div key={idx} className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-lg border-l-2 border-l-emerald-500/50 hover:bg-neutral-800/30 transition-all hover:translate-x-1 group">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-sans font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors">{proj.name}</h3>
                            <span className="text-[10px] font-mono text-emerald-500/50 uppercase whitespace-nowrap ml-2">{proj.status}</span>
                          </div>
                          <p className="font-sans text-[14px] text-neutral-400 leading-relaxed">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.section>

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
                </div>

                {/* Right Column: News & Certifications */}
                <div className="space-y-20">
                  <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                  >
                    <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-8 underline decoration-emerald-500/20 underline-offset-8">{t.news.title}</h2>
                    <div className="space-y-6">
                      {newsList.length > 0 ? (
                        <>
                          {newsList.map((news) => (
                            <Link href={`/news/${news.id}`} key={news.id} className="block relative pl-8 py-2 group cursor-pointer hover:bg-emerald-950/20 rounded-lg transition-colors">
                              <div className="absolute left-2 top-[1.1rem] w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all flex items-center justify-center">
                                <div className="w-1 h-1 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              </div>
                              <div className="text-xs text-emerald-500/70 font-mono mb-1">{news.date}</div>
                              <h3 className="text-[15px] font-semibold text-neutral-300 group-hover:text-emerald-300 transition-colors leading-relaxed">{news.title}</h3>
                            </Link>
                          ))}
                          <div className="pt-4 flex justify-end">
                            <Link href="/news" className="text-xs font-mono text-emerald-500/70 hover:text-emerald-400 uppercase tracking-widest transition-colors flex items-center gap-2">
                              View All <span>→</span>
                            </Link>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-neutral-500 italic">{t.news.empty}</p>
                      )}
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
                      <div className="bg-neutral-900/40 border border-neutral-800 p-5 rounded-lg flex justify-between items-center border-l-2 border-l-emerald-500/50 hover:bg-neutral-800/30 transition-colors">
                        <span className="font-sans text-sm font-semibold text-neutral-200 uppercase tracking-tight">{t.certifications.cert1}</span>
                        <span className="text-[10px] font-mono text-emerald-500/50">{t.certifications.target1}</span>
                      </div>
                    </div>
                  </motion.section>
                </div>

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