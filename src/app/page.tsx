"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import LanguageGate from "@/components/LanguageGate";
import SideNav from "@/components/SideNav";
import { ko } from "@/locales/ko";
import { en } from "@/locales/en";
import { experienceDataKo, certDataKo, projectDataKo } from "@/data/ko";
import { experienceDataEn, certDataEn, projectDataEn } from "@/data/en";

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
  const expData = locale === "ko" ? experienceDataKo : experienceDataEn;
  const certData = locale === "ko" ? certDataKo : certDataEn;
  const projData = locale === "ko" ? projectDataKo : projectDataEn;

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
            <SideNav />

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
              
              {/* 2. Hero Section (About) */}
              <motion.section 
                id="about"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="grid md:grid-cols-2 gap-12 items-center mb-32 scroll-mt-32"
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

              {/* 4. Sections Container */}
              <div className="flex flex-col gap-32 mb-20">
                
                {/* 4-1. Experience (Vertical Timeline) */}
                <motion.section
                  id="experience"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionVariants}
                  className="scroll-mt-32"
                >
                  <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-12 underline decoration-emerald-500/20 underline-offset-8">
                    {t.experience.title}
                  </h2>
                  <div className="relative border-l border-emerald-500/30 ml-3 pl-8 py-2 space-y-12">
                    {expData.map((exp, idx) => (
                      <div key={idx} className="relative group">
                        {/* Timeline dot */}
                        <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#050505] border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors shadow-[0_0_10px_rgba(52,211,153,0.3)]"></div>
                        <div className="text-sm font-mono text-emerald-500 mb-2">{exp.date}</div>
                        <h3 className="text-xl font-bold font-sans text-white tracking-tight mb-1">{exp.school}</h3>
                        <p className="text-base text-neutral-300 font-sans mb-3">{exp.major}</p>
                        <p className="text-sm text-neutral-500 font-sans leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* 4-2. Certifications (3x2 Grid) */}
                <motion.section
                  id="certification"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionVariants}
                  className="scroll-mt-32"
                >
                  <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-12 underline decoration-emerald-500/20 underline-offset-8">
                    {t.certifications.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certData.map((cert, idx) => (
                      <div key={idx} className="bg-neutral-900/40 border border-emerald-800/30 p-6 rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-500/50 transition-all group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-10 h-10 rounded bg-[#050505] border border-neutral-800 flex items-center justify-center font-mono text-[10px] text-neutral-500 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
                            {cert.logo}
                          </div>
                          <span className="text-xs font-mono text-emerald-500/70">{cert.date}</span>
                        </div>
                        <h3 className="text-lg font-bold font-sans text-neutral-200 mb-2 group-hover:text-white transition-colors">{cert.name}</h3>
                        <p className="text-xs text-neutral-400 font-mono mb-3 uppercase tracking-wider">{cert.issuer}</p>
                        <p className="text-sm text-neutral-500 mt-auto leading-relaxed">{cert.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* 4-3. Projects (Featured Card Layout) */}
                <motion.section
                  id="projects"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={sectionVariants}
                  className="scroll-mt-32"
                >
                  <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-12 underline decoration-emerald-500/20 underline-offset-8">
                    {t.projects.title}
                  </h2>
                  <div className="space-y-16">
                    {projData.map((proj, idx) => (
                      <div key={idx} className="grid md:grid-cols-12 gap-8 items-center group">
                        
                        {/* Thumbnail */}
                        <div className="md:col-span-5 relative h-64 md:h-full min-h-[250px] bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 group-hover:border-emerald-500/30 transition-colors flex items-center justify-center">
                          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="text-neutral-600 font-mono text-sm tracking-widest">{proj.thumbnail}</span>
                        </div>

                        {/* Detail */}
                        <div className="md:col-span-7 flex flex-col justify-center">
                          <h3 className="text-2xl font-bold font-sans text-white mb-4 group-hover:text-emerald-400 transition-colors">{proj.title}</h3>
                          
                          <ul className="space-y-3 mb-6">
                            {proj.achievements.map((ach, achIdx) => (
                              <li key={achIdx} className="flex items-start text-sm text-neutral-300 font-sans leading-relaxed">
                                <span className="text-emerald-500 mr-3 mt-1 text-xs">▹</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 mb-8">
                            {proj.techStack.map((tech, techIdx) => (
                              <span key={techIdx} className="px-2 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-400/10 rounded-sm">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-4">
                            <a href={proj.githubUrl} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
                              GitHub ↗
                            </a>
                            <a href={proj.demoUrl} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
                              Live Demo ↗
                            </a>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* 4-4. News (Minimalist List Style) */}
                <motion.section
                  id="news"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionVariants}
                  className="scroll-mt-32"
                >
                  <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-8 underline decoration-emerald-500/20 underline-offset-8">
                    {t.news.title}
                  </h2>
                  <div className="border-t border-neutral-800">
                    {newsList.length > 0 ? (
                      <>
                        {newsList.map((news) => (
                          <Link href={`/news/${news.id}`} key={news.id} className="group flex flex-col md:flex-row md:items-center py-6 border-b border-neutral-800 hover:bg-[#0a0a0a] transition-colors px-2 -mx-2">
                            <div className="text-sm font-mono text-emerald-500 w-36 shrink-0 mb-2 md:mb-0 transition-opacity opacity-80 group-hover:opacity-100">
                              {news.date}
                            </div>
                            <h3 className="text-lg font-sans font-medium text-neutral-200 group-hover:text-emerald-400 transition-colors relative flex-1 min-w-0">
                              <span className="relative z-10 truncate block w-full">{news.title}</span>
                              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                            </h3>
                          </Link>
                        ))}
                        <div className="pt-8">
                          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-emerald-500 hover:text-emerald-400 transition-colors uppercase tracking-wider">
                            {t.news.viewAll} 
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="py-6 border-b border-neutral-800 text-sm text-neutral-500 italic font-sans flex items-center h-full">
                        {t.news.empty}
                      </div>
                    )}
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