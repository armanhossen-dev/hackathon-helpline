import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Layers, Sparkles, Flame, ShieldAlert, Sun, Moon } from 'lucide-react';
import { Tool } from '../types';
import { CATEGORIES } from '../data/categories';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  tools: Tool[];
  favorites: string[];
  onSelectTool: (tool: Tool) => void;
  onSelectCategory: (categoryId: string) => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  tools,
  favorites,
  onSelectTool,
  onSelectCategory,
  onToggleTheme,
  isDark,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Global keydown for ⌘K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build searchable items list
  const filteredTools = query.trim()
    ? tools
        .filter(
          (t) =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.description.toLowerCase().includes(query.toLowerCase()) ||
            t.category.toLowerCase().includes(query.toLowerCase()) ||
            t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 8)
    : tools.filter((t) => t.popular || favorites.includes(t.id)).slice(0, 6);

  const filteredCategories = query.trim()
    ? CATEGORIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const navigationActions = [
    { id: 'nav-workflow', title: 'Go to 10-Step Workflow', href: '#workflow', icon: Sparkles },
    { id: 'nav-stack', title: 'Go to Stack Generator', href: '#stack-generator', icon: Flame },
    { id: 'nav-survival', title: 'Go to Survival HUD & Checklist', href: '#survival-mode', icon: ShieldAlert },
    { id: 'toggle-theme', title: isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme (Hacker)', action: onToggleTheme, icon: isDark ? Sun : Moon },
  ];

  const totalItemsCount = filteredTools.length + filteredCategories.length + navigationActions.length;

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalItemsCount));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalItemsCount) % Math.max(1, totalItemsCount));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeSelectedItem();
    }
  };

  const executeSelectedItem = () => {
    let cursor = 0;

    // Check tools
    if (selectedIndex < filteredTools.length) {
      onSelectTool(filteredTools[selectedIndex]);
      onClose();
      return;
    }
    cursor += filteredTools.length;

    // Check categories
    if (selectedIndex < cursor + filteredCategories.length) {
      const cat = filteredCategories[selectedIndex - cursor];
      onSelectCategory(cat.id);
      onClose();
      return;
    }
    cursor += filteredCategories.length;

    // Check actions
    const actionIndex = selectedIndex - cursor;
    if (actionIndex >= 0 && actionIndex < navigationActions.length) {
      const act = navigationActions[actionIndex];
      if (act.action) {
        act.action();
      } else if (act.href) {
        window.location.href = act.href;
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity" />

      {/* Command Palette Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-gray-300 dark:border-white/20 
        bg-white dark:bg-[#0c101a] 
        shadow-2xl dark:shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,255,102,0.15)] 
        z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-200 dark:border-white/10">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a tool name, category, or command..."
            className="w-full bg-transparent font-mono text-sm sm:text-base text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 font-mono text-xs">
          {/* Tools Group */}
          {filteredTools.length > 0 && (
            <div className="mb-3">
              <div className="px-3 py-1 text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
                Tools & Services
              </div>
              {filteredTools.map((tool, idx) => {
                const isSelected = selectedIndex === idx;
                const domain = new URL(tool.url).hostname;
                return (
                  <div
                    key={tool.id}
                    onClick={() => {
                      onSelectTool(tool);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40'
                        : 'hover:bg-gray-100 dark:hover:bg-white/5 text-slate-800 dark:text-gray-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 flex items-center justify-center p-0.5">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                          alt=""
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {tool.name}
                      </span>
                      <span className="text-gray-500 text-[11px] truncate max-w-[200px]">
                        {tool.description}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 uppercase">
                        {tool.category.replace('-', ' ')}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Categories Group */}
          {filteredCategories.length > 0 && (
            <div className="mb-3">
              <div className="px-3 py-1 text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
                Categories
              </div>
              {filteredCategories.map((cat, idx) => {
                const itemIndex = filteredTools.length + idx;
                const isSelected = selectedIndex === itemIndex;
                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-500/40'
                        : 'hover:bg-gray-100 dark:hover:bg-white/5 text-slate-800 dark:text-gray-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500">
                      Filter Category
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Actions / Navigation */}
          <div>
            <div className="px-3 py-1 text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
              Quick Actions & Navigation
            </div>
            {navigationActions.map((action, idx) => {
              const itemIndex = filteredTools.length + filteredCategories.length + idx;
              const isSelected = selectedIndex === itemIndex;
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  onClick={() => {
                    if (action.action) action.action();
                    else if (action.href) window.location.href = action.href;
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(itemIndex)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-purple-500/15 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-500/40'
                      : 'hover:bg-gray-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-400 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-slate-900 dark:text-white">{action.title}</span>
                  </div>
                  <span className="text-[10px] text-gray-500">Action</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-[#080c14] border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>ESC to close</span>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">COMMAND_PALETTE // v2.6</span>
        </div>
      </div>
    </div>
  );
};
