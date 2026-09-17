import React, { useState } from 'react';
import { Search, Menu, X, Flame, ShieldAlert, Layers, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { GithubIcon } from './icons/GithubIcon';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  toolCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  toolCount,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Toolkit', href: '#toolkit', icon: Layers },
    { label: 'Categories', href: '#categories', icon: Layers },
    { label: 'Workflow', href: '#workflow', icon: Sparkles },
    { label: 'Stack Generator', href: '#stack-generator', icon: Flame },
    { label: 'Survival Mode', href: '#survival-mode', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#06080d]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-500/60 transition-all duration-300 shadow-[0_0_12px_rgba(0,255,102,0.15)]">
              <span className="font-mono text-xs font-bold text-emerald-500 dark:text-emerald-400">[AI]</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-slate-900 dark:text-white text-sm sm:text-base font-mono">
                  AI Hackathon Toolkit
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  v2.6
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 hidden sm:inline">
                COMMAND_CENTER // ONLINE
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-md hover:text-slate-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Search Trigger Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-300 dark:border-white/10 
              bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 
              text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all group shadow-sm dark:shadow-none"
            title="Search tools (⌘K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search {toolCount}+ tools</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10 rounded border border-gray-300 dark:border-white/15">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

          {/* GitHub Repository Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex p-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors shadow-sm dark:shadow-none"
            title="View on GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#06080d]/95 px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 font-mono"
              >
                <Icon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                {link.label}
              </a>
            );
          })}
          <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-mono">
            <span>STATUS: ONLINE</span>
            <span>{toolCount} TOOLS LOADED</span>
          </div>
        </div>
      )}
    </header>
  );
};
