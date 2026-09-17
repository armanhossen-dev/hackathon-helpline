import React, { useEffect } from 'react';
import { X, ExternalLink, BookOpen, Star, CheckCircle2, Zap } from 'lucide-react';
import { Tool } from '../types';
import { GithubIcon } from './icons/GithubIcon';

interface ToolModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({
  tool,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !tool) return null;

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  };

  const domain = getDomain(tool.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-gray-300 dark:border-white/15 
        bg-white dark:bg-[#0c101a] p-6 sm:p-8 
        shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,255,102,0.15)] 
        z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Close Button & Favorite Toggle */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
              COMMAND_CENTER // TOOL_INSPECTOR
            </span>
            <span className="text-gray-400">/</span>
            <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
              {tool.category.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(tool.id)}
              className={`p-2 rounded-lg border transition-all ${
                isFavorite
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-500'
                  : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 hover:text-amber-500'
              }`}
              title={isFavorite ? 'Remove favorite' : 'Add to favorites'}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Header */}
        <div className="flex items-start gap-4 sm:gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl p-2.5 bg-gray-50 dark:bg-[#151c2d] border border-gray-200 dark:border-white/15 flex-shrink-0 flex items-center justify-center shadow-sm dark:shadow-[0_0_20px_rgba(0,255,102,0.1)]">
            <img
              src={faviconUrl}
              alt={tool.name}
              className="w-10 h-10 object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h2 className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {tool.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                {tool.pricing}
              </span>
              {tool.apiAvailable && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30">
                  API Available
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
              {tool.description}
            </p>
          </div>
        </div>

        {/* Use Case & Hackathon Superpower Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 font-sans">
          {/* Best For */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121826]/70">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2 font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Best Use Case</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
              {tool.bestFor}
            </p>
          </div>

          {/* Hackathon Superpower */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 mb-2 font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Hackathon Superpower</span>
            </div>
            <p className="text-xs text-slate-800 dark:text-gray-200 leading-relaxed">
              {tool.hackathonSuperpower}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2 font-semibold">
            Keywords & Capabilities:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all"
          >
            <span>Open Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {tool.docsUrl && (
            <a
              href={tool.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-medium border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-slate-800 dark:text-white shadow-sm dark:shadow-none transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Documentation</span>
            </a>
          )}

          {tool.githubUrl && (
            <a
              href={tool.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-medium border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-slate-800 dark:text-white shadow-sm dark:shadow-none transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>GitHub Repo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
