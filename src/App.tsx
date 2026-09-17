import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ToolGrid } from './components/ToolGrid';
import { ToolModal } from './components/ToolModal';
import { Workflow } from './components/Workflow';
import { StackGenerator } from './components/StackGenerator';
import { EssentialKit } from './components/EssentialKit';
import { FreeResources } from './components/FreeResources';
import { SurvivalMode } from './components/SurvivalMode';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';

import { TOOLS } from './data/tools';
import { CATEGORIES } from './data/categories';
import { Tool, CategoryId } from './types';

export const App: React.FC = () => {
  // State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('All Pricing');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recommended' | 'popular' | 'name'>('recommended');

  // Favorites in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hackathon_favorites');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    // Default favorites for new visitors
    return ['cursor', 'claude', 'supabase', 'vercel', 'groq', 'gamma'];
  });

  // Modal inspection tool
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  // Command palette state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Dark/Light theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  // Sync theme with DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Sync favorites with localStorage
  useEffect(() => {
    localStorage.setItem('hackathon_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TOOLS.forEach((tool) => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered & Sorted Tools
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      // 1. Category filter
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // 2. Favorites only
      if (showFavoritesOnly && !favorites.includes(tool.id)) {
        return false;
      }

      // 3. Pricing tier filter
      if (selectedPricing !== 'All Pricing') {
        if (selectedPricing === 'Free' && tool.pricing !== 'Free') return false;
        if (selectedPricing === 'Free Tier' && tool.pricing !== 'Free Tier') return false;
        if (selectedPricing === 'Open Source' && tool.pricing !== 'Open Source') return false;
        if (selectedPricing === 'Freemium' && tool.pricing !== 'Freemium') return false;
        if (selectedPricing === 'Paid' && tool.pricing !== 'Paid') return false;
      }

      // 4. Quick filter tags
      if (filterTag === 'popular' && !tool.popular) return false;
      if (filterTag === 'essential' && !tool.isEssential) return false;
      if (filterTag === 'new' && !tool.isNew) return false;
      if (filterTag === 'api' && !tool.apiAvailable) return false;

      // 5. Search query matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesCategory = tool.category.toLowerCase().includes(q);
        const matchesBestFor = tool.bestFor.toLowerCase().includes(q);
        const matchesSuperpower = tool.hackathonSuperpower.toLowerCase().includes(q);
        const matchesTags = tool.tags.some((tag) => tag.toLowerCase().includes(q));

        if (!matchesName && !matchesDesc && !matchesCategory && !matchesBestFor && !matchesSuperpower && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // default 'recommended': essential first, then popular, then id
      if (a.isEssential && !b.isEssential) return -1;
      if (!a.isEssential && b.isEssential) return 1;
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [selectedCategory, showFavoritesOnly, selectedPricing, filterTag, searchQuery, sortBy, favorites]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPricing('All Pricing');
    setShowFavoritesOnly(false);
    setFilterTag(null);
    setSortBy('recommended');
  };

  const scrollToToolkit = () => {
    document.getElementById('toolkit')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStack = () => {
    document.getElementById('stack-generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 dark:bg-[#06080d] dark:text-gray-200 bg-grid-cyber selection:bg-emerald-500/30 selection:text-emerald-300 transition-colors duration-200">
      {/* Sticky Navigation Header */}
      <Header
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        toolCount={TOOLS.length}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-grow">
        {/* Terminal Hero Section */}
        <Hero
          toolCount={TOOLS.length}
          categoryCount={CATEGORIES.length}
          onExploreClick={scrollToToolkit}
          onStackClick={scrollToStack}
        />

        {/* Essential Hackathon Kit Pillars */}
        <EssentialKit
          onSearchByKeyword={(keyword) => {
            setSearchQuery(keyword);
            scrollToToolkit();
          }}
        />

        {/* Free Resources Highlight */}
        <FreeResources
          onSelectTool={(tool) => setSelectedTool(tool)}
          onFilterFreeTier={() => {
            setSelectedPricing('Free Tier');
            scrollToToolkit();
          }}
        />

        {/* Core Toolkit Dashboard Section */}
        <section id="toolkit" className="py-16 sm:py-20 border-b border-gray-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-2 font-semibold">
                <span>DIRECTORY_HUD // MAIN_GRID</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                AI Hackathon Tool Command Center
              </h2>
              <p className="text-sm text-slate-600 dark:text-gray-400 max-w-xl font-sans mt-2">
                Explore {TOOLS.length} verified developer tools, APIs, frameworks, and deployment engines. Instant search and one-click access.
              </p>
            </div>

            {/* Global Search & Filters Bar */}
            <div className="max-w-4xl mx-auto w-full">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedPricing={selectedPricing}
                onPricingChange={setSelectedPricing}
                showFavoritesOnly={showFavoritesOnly}
                onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
                favoritesCount={favorites.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
                resultCount={filteredTools.length}
                totalCount={TOOLS.length}
                filterTag={filterTag}
                onFilterTagChange={setFilterTag}
              />
            </div>

            {/* Category Ribbon Filter */}
            <div id="categories">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
                totalCount={TOOLS.length}
              />
            </div>

            {/* Responsive Tool Card Grid */}
            <ToolGrid
              tools={filteredTools}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onSelectTool={(tool) => setSelectedTool(tool)}
              onResetFilters={handleResetFilters}
            />
          </div>
        </section>

        {/* 10-Step Hackathon Workflow */}
        <Workflow onSelectTool={(tool) => setSelectedTool(tool)} />

        {/* Interactive "Build My Hackathon Stack" Generator */}
        <StackGenerator onSelectTool={(tool) => setSelectedTool(tool)} />

        {/* Hackathon Survival HUD & Checklist */}
        <SurvivalMode />
      </main>

      {/* Terminal Minimalist Footer */}
      <Footer />

      {/* Tool Deep-Dive Modal */}
      <ToolModal
        tool={selectedTool}
        isOpen={Boolean(selectedTool)}
        onClose={() => setSelectedTool(null)}
        isFavorite={selectedTool ? favorites.includes(selectedTool.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Raycast-style Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        tools={TOOLS}
        favorites={favorites}
        onSelectTool={(tool) => setSelectedTool(tool)}
        onSelectCategory={(categoryId) => {
          setSelectedCategory(categoryId as CategoryId);
          scrollToToolkit();
        }}
        onToggleTheme={toggleTheme}
        isDark={isDark}
      />
    </div>
  );
};
