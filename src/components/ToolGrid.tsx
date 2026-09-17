import React from 'react';
import { ToolCard } from './ToolCard';
import { Tool } from '../types';
import { Terminal, SearchX, RotateCcw } from 'lucide-react';

interface ToolGridProps {
  tools: Tool[];
  favorites: string[];
  onToggleFavorite: (toolId: string) => void;
  onSelectTool: (tool: Tool) => void;
  onResetFilters: () => void;
}

export const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  favorites,
  onToggleFavorite,
  onSelectTool,
  onResetFilters,
}) => {
  if (tools.length === 0) {
    return (
      <div className="w-full py-16 sm:py-24 px-4 text-center rounded-3xl border border-dashed border-white/15 dark:border-white/15 light:border-gray-300 bg-[#0b0f17]/50 dark:bg-[#0b0f17]/50 light:bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-gray-400">
          <SearchX className="w-7 h-7 text-emerald-400" />
        </div>
        <div className="font-mono text-xs text-emerald-400 mb-1">
          ERROR 404 // QUERY_NOT_FOUND
        </div>
        <h3 className="text-xl font-bold font-mono text-white dark:text-white light:text-gray-900 mb-2">
          No matching tools found
        </h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
          We couldn’t find any tools matching your active search terms or category filters. Try clearing your search or switching categories.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_15px_rgba(0,255,102,0.25)]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          isFavorite={favorites.includes(tool.id)}
          onToggleFavorite={onToggleFavorite}
          onSelectTool={onSelectTool}
        />
      ))}
    </div>
  );
};
