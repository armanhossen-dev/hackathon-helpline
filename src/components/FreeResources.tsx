import React from 'react';
import { Gift, ExternalLink } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { Tool } from '../types';

interface FreeResourcesProps {
  onSelectTool: (tool: Tool) => void;
  onFilterFreeTier: () => void;
}

export const FreeResources: React.FC<FreeResourcesProps> = ({
  onSelectTool,
  onFilterFreeTier,
}) => {
  // Filter tools with free or generous tiers
  const freeTools = TOOLS.filter(
    (t) => t.pricing === 'Free' || t.pricing === 'Free Tier' || t.pricing === 'Open Source'
  ).slice(0, 8);

  return (
    <section className="py-14 sm:py-18 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-2 font-semibold">
              <Gift className="w-3.5 h-3.5" />
              <span>ZERO_COST_TIER // FREE_RESOURCES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
              100% Free & Open-Source Stack
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 font-sans mt-1">
              Never enter a credit card. Build, deploy, and win with these battle-tested free tiers and open-source models.
            </p>
          </div>

          <button
            onClick={onFilterFreeTier}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-300 dark:border-white/15 text-emerald-700 dark:text-emerald-400 shadow-sm dark:shadow-none transition-colors"
          >
            <span>View All Free Tools ({TOOLS.filter(t => t.pricing === 'Free' || t.pricing === 'Free Tier' || t.pricing === 'Open Source').length})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Free Tools Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {freeTools.map((tool) => {
            const domain = new URL(tool.url).hostname;
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="group p-4 rounded-2xl border border-gray-200 dark:border-white/10 
                  bg-white dark:bg-[#0f1522] 
                  hover:border-emerald-500/50 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(0,255,102,0.1)] 
                  shadow-sm dark:shadow-none transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 flex items-center justify-center p-1">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                        alt=""
                        className="w-6 h-6 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                      {tool.pricing.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm font-mono text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400">
                  <span className="text-emerald-700 dark:text-emerald-400 truncate max-w-[150px] font-medium">
                    ★ {tool.bestFor.slice(0, 24)}...
                  </span>
                  <span className="text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    Inspect ›
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
