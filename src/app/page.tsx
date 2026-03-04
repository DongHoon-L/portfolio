import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#eee] selection:bg-emerald-500/30">
      {/* 배경 그리드 효과 */}
      <div className="fixed inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* 1. 상단 상태 바 */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-emerald-500/20 p-2">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-[10px] tracking-[0.2em] font-mono uppercase text-emerald-400">
          <div>Access Level: <span className="text-white">UNSW_ADV_STUDENT</span></div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Identity Verified
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20">
        
        {/* 2. Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1">
            <p className="font-mono text-emerald-500 text-sm mb-4 tracking-tight">// Security Engineering @ UNSW</p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-6">
              Designing <span className="text-neutral-500">resilient</span> systems for a <span className="text-emerald-500">secure</span> future.
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              시스템 설계 단계부터 보안을 내재화하는 **Security Architect** 지망생입니다. 
              복잡한 인프라의 취약점을 분석하고, 제로 트러스트 모델 기반의 방어 체계를 구축합니다.
            </p>
          </div>
          
          <div className="order-1 md:order-2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] flex items-center justify-center">
              {/* 실제 사진을 넣으려면 public/me.png 저장 후 아래 주석 해제 */}
              {/* <Image src="/me.png" alt="Profile" fill className="object-cover" /> */}
              <span className="text-neutral-700 font-mono">[ PROFILE_IMAGE ]</span>
            </div>
          </div>
        </section>

        {/* 3. Terminal Identity */}
        <section className="mb-32">
          <div className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-neutral-800/50 px-4 py-2 border-b border-white/5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 ml-2 italic">whoami.sh — zsh</span>
            </div>
            <div className="p-8 font-mono text-sm space-y-4">
              <div className="flex gap-3 text-emerald-500">
                <span>➜</span>
                <span className="text-white">whoami</span>
              </div>
              <div className="text-neutral-400 ml-6 leading-7">
                UNSW Sydney에서 **Advanced Computer Science(Security Engineering)**를 전공하고 있으며, <br />
                시스템 무결성과 가용성을 보장하는 **보안 아키텍처**를 연구하고 설계합니다. <br />
                현재 한국에서 실무 프로젝트 중심의 부트캠프를 통해 기술적 완성도를 높이고 있습니다.
              </div>
            </div>
          </div>
        </section>

        {/* 4. Projects & Education (간략화) */}
        <div className="grid md:grid-cols-2 gap-16">
          <section>
            <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-8 underline decoration-emerald-500/20 underline-offset-8">Education</h2>
            <div className="border-l border-emerald-500/30 pl-6 relative">
              <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-emerald-500"></div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tighter">UNSW Sydney</h3>
              <p className="text-sm text-emerald-500 font-mono mb-2">Advanced Computer Science</p>
            </div>
          </section>

          <section>
            <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-8 underline decoration-emerald-500/20 underline-offset-8">Certifications</h2>
            <div className="space-y-4">
              <div className="bg-neutral-900/40 border border-white/10 p-4 rounded-lg flex justify-between items-center">
                <span className="text-sm font-bold uppercase tracking-tight">AWS Security Specialty</span>
                <span className="text-[10px] font-mono text-emerald-500/50">Target 2024</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center text-neutral-600 font-mono text-[10px] tracking-widest">
        ENCRYPTED CONNECTION : 256-BIT AES
      </footer>
    </div>
  );
}