import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 dark:border-white/10 light:border-gray-200 bg-[#04060a] dark:bg-[#04060a] light:bg-gray-100 py-12 font-mono text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Boxed Layout */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/10 dark:border-white/10 light:border-gray-300 bg-[#080c14] dark:bg-[#080c14] light:bg-white flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400 font-bold">[AI]</span>
              <span className="font-bold text-white dark:text-white light:text-gray-900 text-sm tracking-wide">
                AI HACKATHON TOOLKIT
              </span>
            </div>
            <div className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-1">
              Build → Ship → Demo → Submit
            </div>
            <div className="text-gray-500 text-[11px]">
              The one-stop developer command center for hackathon victors.
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-300 dark:text-gray-300 light:text-gray-700">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>[GitHub]</span>
            </a>
            <a
              href="https://devpost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              <span>[Devpost]</span>
            </a>
            <button
              onClick={() => alert('To suggest a tool or submit an update, please open a PR on GitHub!')}
              className="hover:text-emerald-400 transition-colors"
            >
              <span>[Submit a Tool]</span>
            </button>
            <button
              onClick={() => alert('Feedback received! Thank you for building with the AI Hackathon Toolkit.')}
              className="hover:text-emerald-400 transition-colors"
            >
              <span>[Suggest an Update]</span>
            </button>
          </div>

          {/* Right Back to Top */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
              title="Return to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px]">Top</span>
            </button>
            <span className="text-[10px] text-gray-500">
              © 2026 AI Hackathon Toolkit
            </span>
          </div>
        </div>

        {/* Bottom Minimal Signature */}
        <div className="mt-8 text-center text-gray-500 text-[11px] flex items-center justify-center gap-1">
          <span>Engineered with terminal grit for hackers worldwide</span>
          <span className="text-emerald-400">●</span>
          <span>Never stop shipping</span>
        </div>
      </div>
    </footer>
  );
};
