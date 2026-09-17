import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle, className = '' }) => {
  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme (Hacker Mode)'}
      className={`relative p-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 
        ${isDark
          ? 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300'
          : 'border-gray-300 bg-white hover:bg-gray-100 text-gray-700 shadow-sm'
        } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-emerald-600 hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};
