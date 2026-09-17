import React, { useRef, useEffect } from 'react';
import { Search, X, Star, ArrowUpDown } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPricing: string;
  onPricingChange: (pricing: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
  sortBy: 'recommended' | 'name' | 'popular';
  onSortChange: (sort: 'recommended' | 'name' | 'popular') => void;
  resultCount: number;
  totalCount: number;
  filterTag: string | null;
  onFilterTagChange: (tag: string | null) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedPricing,
  onPricingChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  sortBy,
  onSortChange,
  resultCount,
  totalCount,
  filterTag,
  onFilterTagChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keydown listener for '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const pricingOptions = ['All Pricing', 'Free', 'Free Tier', 'Open Source', 'Freemium', 'Paid'];

  const quickFilterTags = [
    { label: 'Popular', id: 'popular' },
    { label: 'Essential', id: 'essential' },
    { label: 'New', id: 'new' },
    { label: 'API Available', id: 'api' },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Primary Search Input Field */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-emerald-500 dark:text-emerald-400 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-300 transition-colors" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search ${totalCount}+ AI hackathon tools (e.g., Cursor, vector db, audio, deployment, free)...`}
          className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl font-mono text-sm sm:text-base 
            border border-gray-300 dark:border-white/15 
            bg-white dark:bg-[#101622]/90 
            text-slate-900 dark:text-white 
            placeholder-gray-400 dark:placeholder-gray-500 
            focus:outline-none focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 
            shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all"
        />

        {/* Clear Search & Keyboard Shortcut Pill */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 rounded-md text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded">
            /
          </kbd>
        </div>
      </div>

      {/* Filter Chips & Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Quick Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Favorites Filter Button */}
          <button
            onClick={onToggleFavoritesOnly}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              showFavoritesOnly
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-600 dark:text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'bg-white dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 shadow-sm dark:shadow-none'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-500' : ''}`} />
            <span>★ Favorites ({favoritesCount})</span>
          </button>

          {/* Quick Tags */}
          {quickFilterTags.map((t) => {
            const isActive = filterTag === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onFilterTagChange(isActive ? null : t.id)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'bg-white dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 shadow-sm dark:shadow-none'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Right: Pricing Filter & Sort Dropdown */}
        <div className="flex items-center gap-2.5 ml-auto">
          {/* Pricing Selector */}
          <select
            value={selectedPricing}
            onChange={(e) => onPricingChange(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-gray-300 dark:border-white/10 
              bg-white dark:bg-[#101622] 
              text-slate-800 dark:text-gray-300 
              focus:outline-none focus:border-emerald-500/50 cursor-pointer shadow-sm dark:shadow-none"
          >
            {pricingOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-white dark:bg-[#101622] text-slate-900 dark:text-gray-200">
                {opt}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#101622] shadow-sm dark:shadow-none">
            <ArrowUpDown className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-slate-800 dark:text-gray-300 focus:outline-none cursor-pointer"
            >
              <option value="recommended" className="bg-white dark:bg-[#101622] text-slate-900 dark:text-gray-200">Recommended</option>
              <option value="popular" className="bg-white dark:bg-[#101622] text-slate-900 dark:text-gray-200">Most Popular</option>
              <option value="name" className="bg-white dark:bg-[#101622] text-slate-900 dark:text-gray-200">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count Status Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400 pt-1">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-emerald-600 dark:text-emerald-400">{resultCount}</strong> of {totalCount} tools</span>
          {(searchQuery || filterTag || showFavoritesOnly || selectedPricing !== 'All Pricing') && (
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Filters Active
            </span>
          )}
        </div>

        {(searchQuery || filterTag || showFavoritesOnly || selectedPricing !== 'All Pricing') && (
          <button
            onClick={() => {
              onSearchChange('');
              onPricingChange('All Pricing');
              if (showFavoritesOnly) onToggleFavoritesOnly();
              onFilterTagChange(null);
            }}
            className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-4"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};
