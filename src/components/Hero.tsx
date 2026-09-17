import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface HeroProps {
  toolCount: number;
  categoryCount: number;
  onExploreClick: () => void;
  onStackClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  toolCount,
  categoryCount,
  onExploreClick,
  onStackClick,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-gray-200 dark:border-white/10">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Header Bar */}
        <div className="flex flex-col items-center text-center">
          {/* Status HUD Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(0,255,102,0.1)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
            <span className="font-semibold">STATUS: ONLINE</span>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <span>SYSTEM: READY</span>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <span className="text-emerald-600 dark:text-emerald-300 font-semibold">MODE: HACKATHON</span>
          </div>

          {/* Terminal Prompt Animation */}
          <div className="font-mono text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
            <span className="text-emerald-500 dark:text-emerald-400 font-bold">&gt;</span>
            <span>initialize hackathon_mode...</span>
            <span className="inline-block w-2 h-4 bg-emerald-500 dark:bg-emerald-400 animate-terminal-blink" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-mono text-slate-900 dark:text-white max-w-4xl leading-[1.1] mb-5">
            AI HACKATHON <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 text-glow-green">
              TOOLKIT
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-gray-300 max-w-2xl font-sans mb-3">
            <span className="font-semibold text-slate-900 dark:text-white">
              Build faster. Ship smarter. Win your next hackathon.
            </span>
          </p>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mb-8 font-mono">
            Everything you need to ship an AI hackathon project — in one command center.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold 
                bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(0,255,102,0.3)] 
                hover:shadow-[0_0_25px_rgba(0,255,102,0.45)] transition-all duration-200 group"
            >
              <span>[ Explore Toolkit ]</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onStackClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-medium 
                border border-gray-300 dark:border-white/15 
                bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 
                text-slate-800 dark:text-white shadow-sm dark:shadow-none transition-all duration-200"
            >
              <Zap className="w-4 h-4 text-amber-500 dark:text-terminal-amber" />
              <span>[ Build My Stack ]</span>
            </button>

            <a
              href="#workflow"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-sm font-medium 
                text-slate-600 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              <span>View 10-Step Workflow</span>
            </a>
          </div>

          {/* Live HUD Counter Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl w-full">
            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101622]/60 shadow-sm dark:shadow-none backdrop-blur-sm flex flex-col items-center">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {toolCount}+
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
                Curated Tools
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101622]/60 shadow-sm dark:shadow-none backdrop-blur-sm flex flex-col items-center">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {categoryCount}
              </span>
              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                Categories
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101622]/60 shadow-sm dark:shadow-none backdrop-blur-sm flex flex-col items-center">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                10
              </span>
              <span className="text-[11px] font-mono text-purple-600 dark:text-terminal-purple uppercase tracking-wider font-semibold">
                Workflow Steps
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101622]/60 shadow-sm dark:shadow-none backdrop-blur-sm flex flex-col items-center">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                ∞
              </span>
              <span className="text-[11px] font-mono text-amber-600 dark:text-terminal-amber uppercase tracking-wider font-semibold">
                Project Ideas
              </span>
            </div>
          </div>
        </div>

        {/* Quick Highlight Cards */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-white/5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-400 dark:text-gray-500">POPULAR STACK:</span>
          <span className="px-2.5 py-1 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 shadow-sm dark:shadow-none">Cursor</span>
          <span className="text-gray-400 dark:text-gray-600">+</span>
          <span className="px-2.5 py-1 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 shadow-sm dark:shadow-none">Next.js</span>
          <span className="text-gray-400 dark:text-gray-600">+</span>
          <span className="px-2.5 py-1 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 shadow-sm dark:shadow-none">Claude 3.5 Sonnet</span>
          <span className="text-gray-400 dark:text-gray-600">+</span>
          <span className="px-2.5 py-1 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 shadow-sm dark:shadow-none">Supabase</span>
          <span className="text-gray-400 dark:text-gray-600">+</span>
          <span className="px-2.5 py-1 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 shadow-sm dark:shadow-none">Vercel</span>
        </div>
      </div>
    </section>
  );
};
