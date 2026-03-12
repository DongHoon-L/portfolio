"use client";

import { useEffect, useState } from "react";
import { User, GraduationCap, ShieldCheck, FolderGit2, Rss } from "lucide-react";

export default function SideNav() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "education", "certification", "projects", "news"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about", icon: User, label: "About" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "certification", icon: ShieldCheck, label: "Certification" },
    { id: "projects", icon: FolderGit2, label: "Projects" },
    { id: "news", icon: Rss, label: "News" },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 bg-[#050505]/40 backdrop-blur-md p-3 rounded-full border border-neutral-800">
      {navItems.map(({ id, icon: Icon, label }) => (
        <div key={id} className="relative group">
          <button
            onClick={() => scrollToSection(id)}
            className={`p-2 rounded-full transition-all duration-300 ${
              activeId === id 
                ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]" 
                : "text-neutral-500 hover:text-emerald-400 hover:bg-neutral-800/50"
            }`}
          >
            <Icon size={20} />
          </button>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded bg-opacity-90 backdrop-blur text-xs font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
