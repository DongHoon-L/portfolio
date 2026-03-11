"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

interface NewsDetail {
  id: string;
  title: string;
  date: string;
  content: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [locale, setLocale] = useState<"ko" | "en">("en");
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved === "ko" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    if (!slug) return;
    const fetchDetail = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/news/${slug}?lang=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug, locale]);

  const handleToggle = () => {
    const newLang = locale === "ko" ? "en" : "ko";
    localStorage.setItem("preferredLanguage", newLang);
    localStorage.setItem("preferredLanguageTime", new Date().getTime().toString());
    setLocale(newLang);
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
          <Link href="/news" className="hover:text-emerald-300 transition-colors flex items-center gap-2">
            <span>←</span> News List
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
        {loading ? (
          <div className="text-neutral-500 font-mono text-sm animate-pulse">Loading document...</div>
        ) : error || !news ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 font-mono text-sm mb-4">Document not found.</p>
            <Link href="/news" className="text-xs font-mono text-emerald-500 hover:text-emerald-400 transition-colors">
              ← Return to News List
            </Link>
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-10 pb-6 border-b border-neutral-800">
              <div className="text-xs text-emerald-500/70 font-mono mb-3">{news.date}</div>
              <h1 className="text-2xl md:text-3xl font-bold font-sans tracking-tight leading-snug text-white">
                {news.title}
              </h1>
            </div>

            {/* Markdown Content */}
            <div className="prose-custom font-sans text-[15px] leading-8 text-neutral-300">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold text-white mt-8 mb-3 tracking-tight">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-neutral-200 mt-6 mb-2">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-neutral-300 leading-8">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-1 text-neutral-400">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-1 text-neutral-400">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-neutral-300">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-emerald-400 font-semibold">{children}</strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-neutral-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-emerald-500/50 pl-4 my-4 text-neutral-400 italic">{children}</blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-emerald-400 underline decoration-emerald-500/30 hover:decoration-emerald-400 transition-colors" target="_blank" rel="noopener noreferrer">{children}</a>
                  ),
                  hr: () => (
                    <hr className="border-neutral-800 my-8" />
                  ),
                }}
              >
                {news.content}
              </ReactMarkdown>
            </div>

            {/* Back link */}
            <div className="mt-16 pt-6 border-t border-neutral-800">
              <Link href="/news" className="text-xs font-mono text-emerald-500/70 hover:text-emerald-400 uppercase tracking-widest transition-colors flex items-center gap-2">
                <span>←</span> {locale === "ko" ? "뉴스 목록으로" : "Back to News List"}
              </Link>
            </div>
          </motion.article>
        )}
      </main>
    </div>
  );
}
