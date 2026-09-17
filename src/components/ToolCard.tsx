import React, { useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
  onSelectTool: (tool: Tool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  onSelectTool,
}) => {
  const [imageError, setImageError] = useState(false);

  // Extract hostname for favicon retrieval
  const getDomain = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname;
    } catch {
      return '';
    }
  };

  const domain = getDomain(tool.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  // First letter fallback monogram
  const initial = tool.name.charAt(0).toUpperCase();

  // Pricing badge colors
  const getPricingBadge = (pricing: string) => {
    switch (pricing) {
      case 'Free':
      case 'Open Source':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Free Tier':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30';
      case 'Freemium':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/30';
      case 'Paid':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div
      onClick={() => onSelectTool(tool)}
      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl cursor-pointer 
        border border-gray-200 dark:border-white/10 
        bg-white dark:bg-[#101622]/80 
        hover:border-emerald-500/50 
        shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_24px_rgba(0,255,102,0.12)] 
        transition-all duration-300 transform hover:-translate-y-1"
    >
      <div>
        {/* Top Header Row: Favicon + Badges + Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Favicon Container (48px × 48px rounded-xl) */}
          <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center p-1.5 
            border border-gray-200 dark:border-white/15 
            bg-gray-50 dark:bg-[#090d15] 
            shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] 
            group-hover:border-emerald-500/40 transition-colors">
            {!imageError ? (
              <img
                src={faviconUrl}
                alt={`${tool.name} logo`}
                onError={() => setImageError(true)}
                className="w-8 h-8 rounded-lg object-contain"
                loading="lazy"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center justify-center text-base">
                {initial}
              </div>
            )}
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-1.5">
            {/* Keyboard shortcut indicator if present */}
            {tool.keyboardShortcut && (
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                {tool.keyboardShortcut}
              </span>
            )}

            {/* Favorite Star Button */}
            <button
              type="button"
              aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(tool.id);
              }}
              className={`p-1.5 rounded-lg border transition-all duration-200 ${
                isFavorite
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                  : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 hover:text-amber-500 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
              title={isFavorite ? 'Starred in Favorites' : 'Star this tool'}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-500' : ''}`} />
            </button>

            {/* Direct External Link Trigger */}
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10 
                bg-gray-100 dark:bg-white/5 
                text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
              title={`Open ${tool.name} in new tab`}
              aria-label={`Open ${tool.name} in new tab`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Name + Status Badges */}
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {tool.name}
          </h3>

          {tool.popular && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              Popular
            </span>
          )}

          {tool.isNew && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
              New
            </span>
          )}

          {tool.isEssential && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              Essential
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>
      </div>

      {/* Card Footer: Category + Pricing Tag */}
      <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-2 text-[11px] font-mono">
        <span className="text-slate-500 dark:text-gray-400 uppercase tracking-wider truncate max-w-[120px]">
          {tool.category.replace('-', ' ')}
        </span>

        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium tracking-tight whitespace-nowrap ${getPricingBadge(tool.pricing)}`}>
          {tool.pricing}
        </span>
      </div>
    </div>
  );
};
