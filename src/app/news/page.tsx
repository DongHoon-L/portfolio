"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface NewsItem {
  id: string;
  title: string;
  date: string;
}

export default function NewsListPage() {
  const [locale, setLocale] = useState<"ko" | "en">("en");
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved === "ko" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/news?lang=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setNewsList(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [locale]);

  const handleToggle = () => {
    const newLang = locale === "ko" ? "en" : "ko";
    localStorage.setItem("preferredLanguage", newLang);
    localStorage.setItem("preferredLanguageTime", new Date().getTime().toString());
    setLocale(newLang);
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#eee] relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(16,185,129,0.03)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[500px] bg-emerald-500/10 blur-[120px] rounded-[100%]"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/60 backdrop-blur-xl border-b border-neutral-800 p-3">
        <div className="max-w-3xl mx-auto flex justify-between items-center text-[10px] tracking-[0.2em] font-mono uppercase text-emerald-400">
          <Link href="/" className="hover:text-emerald-300 transition-colors flex items-center gap-2">
            <span>←</span> Back to Main
          </Link>
          <button
            onClick={handleToggle}
            className="border border-neutral-800 bg-neutral-900/50 hover:border-emerald-500/50 px-3 py-1.5 rounded-sm transition-all text-neutral-400 hover:text-emerald-400 uppercase tracking-widest flex items-center gap-2"
          >
            {locale === "ko" ? "EN" : "KR"}
            <span className="text-[8px] opacity-50">/ Switch</span>
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h1 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-2">
            {locale === "ko" ? "보안 뉴스 아카이브" : "Security News Archive"}
          </h1>
          <p className="text-neutral-500 text-sm mb-12 font-sans">
            {locale === "ko"
              ? "최신 보안 동향과 분석 리포트를 확인하세요."
              : "Browse latest security trends and analysis reports."}
          </p>

          {loading ? (
            <div className="text-neutral-500 font-mono text-sm animate-pulse">Loading...</div>
          ) : newsList.length > 0 ? (
            <div className="space-y-4">
              {newsList.map((news, idx) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={`/news/${news.id}`}
                    className="block bg-neutral-900/40 border border-neutral-800 p-5 rounded-lg border-l-2 border-l-emerald-500/50 hover:bg-neutral-800/30 hover:translate-x-1 transition-all group"
                  >
                    <div className="flex justify-between items-start overflow-hidden">
                      <h2 className="font-sans font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors leading-relaxed truncate pr-4">
                        {news.title}
                      </h2>
                      <span className="text-[10px] font-mono text-emerald-500/50 whitespace-nowrap ml-4 mt-1 shrink-0">
                        {news.date}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 italic">
              {locale === "ko" ? "게시된 뉴스가 없습니다." : "No news published yet."}
            </p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
