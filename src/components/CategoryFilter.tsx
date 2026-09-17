import React from 'react';
import { 
  Code2, Cpu, Sparkles, Film, Palette, Database, Rocket, Bot, 
  SearchCode, BarChart3, MessageSquare, Presentation, Kanban, Terminal, 
  Layers 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types';

interface CategoryFilterProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  totalCount,
}) => {
  // Map category icon name to Lucide component
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Cpu': return Cpu;
      case 'Sparkles': return Sparkles;
      case 'Film': return Film;
      case 'Palette': return Palette;
      case 'Database': return Database;
      case 'Rocket': return Rocket;
      case 'Bot': return Bot;
      case 'SearchCode': return SearchCode;
      case 'BarChart3': return BarChart3;
      case 'MessageSquare': return MessageSquare;
      case 'Presentation': return Presentation;
      case 'Kanban': return Kanban;
      case 'Terminal': return Terminal;
      default: return Layers;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar py-1">
        {/* 'All Tools' pill */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 border ${
            selectedCategory === 'all'
              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-800 dark:text-emerald-300 font-semibold shadow-[0_0_15px_rgba(0,255,102,0.2)]'
              : 'bg-white dark:bg-[#101622]/60 border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 shadow-sm dark:shadow-none'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Categories</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 dark:bg-white/10 text-slate-700 dark:text-gray-300">
            {totalCount}
          </span>
        </button>

        {/* Individual Category Pills */}
        {CATEGORIES.map((cat) => {
          const Icon = getCategoryIcon(cat.iconName);
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-800 dark:text-emerald-300 font-semibold shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                  : 'bg-white dark:bg-[#101622]/60 border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 shadow-sm dark:shadow-none'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>{cat.name}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 dark:bg-white/10 text-slate-700 dark:text-gray-300">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
