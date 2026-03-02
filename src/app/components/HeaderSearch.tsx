import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Command, TrendingUp } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { Input } from './ui/input';

type HeaderSearchVariant = 'header' | 'banner';

interface HeaderSearchProps {
  variant?: HeaderSearchVariant;
}

const POPULAR_SEARCHES = ['Chronograph', 'Minimalist', 'Leather', 'Sale', 'New arrivals'];

/**
 * Search input for header or banner. Uses product store (Zustand) for global search state.
 */
export function HeaderSearch({ variant = 'header' }: HeaderSearchProps) {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchQuery = useProductStore((s) => s.searchQuery);
  const setSearchQuery = useProductStore((s) => s.setSearchQuery);
  const categories = useProductStore((s) => s.categories);
  const setSelectedCategory = useProductStore((s) => s.setSelectedCategory);

  const isBanner = variant === 'banner';
  const categoryChips = categories.filter((c) => c !== 'All');

  useEffect(() => {
    if (!isBanner) return;
    const t = setTimeout(() => setShowSuggestions(focused), focused ? 0 : 150);
    return () => clearTimeout(t);
  }, [focused, isBanner]);

  useEffect(() => {
    if (!isBanner || !showSuggestions || !containerRef.current) {
      if (!showSuggestions) setDropdownRect(null);
      return;
    }
    const updateRect = () => {
      if (containerRef.current) {
        setDropdownRect(containerRef.current.getBoundingClientRect());
      }
    };
    updateRect();
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);
    return () => {
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
    };
  }, [isBanner, showSuggestions]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  const handlePopularClick = (term: string) => {
    setSearchQuery(term);
    setSelectedCategory(null);
  };

  if (isBanner) {
    return (
      <div ref={containerRef} className="relative w-full">
        <motion.div
          className="relative w-full"
          initial={false}
          animate={{ scale: focused ? 1.02 : 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="relative flex items-center rounded-2xl bg-black/40 backdrop-blur-xl border border-white/25 overflow-hidden">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/90 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search by product, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="h-14 pl-14 pr-14 text-base bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]"
              aria-label="Search products"
              aria-expanded={showSuggestions}
              aria-haspopup="listbox"
            />
            {searchQuery ? (
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-white/25 transition-colors text-white"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </motion.button>
            ) : (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-white/70 pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">
                  <Command className="w-3 h-3" />K
                </kbd>
              </span>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {showSuggestions &&
            dropdownRect &&
            createPortal(
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="fixed z-[100] p-4 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/25"
                style={{
                  top: dropdownRect.bottom + 12,
                  left: dropdownRect.left,
                  width: dropdownRect.width,
                }}
              >
                <p className="text-xs font-medium text-white/80 uppercase tracking-wider mb-3">
                  Shop by category
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categoryChips.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      onMouseDown={(e) => e.preventDefault()}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-white/25 text-white hover:bg-white/35 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <p className="text-xs font-medium text-white/80 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handlePopularClick(term)}
                      onMouseDown={(e) => e.preventDefault()}
                      className="px-3 py-1.5 rounded-lg text-sm text-white hover:bg-white/25 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>,
              document.body
            )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative flex-1 min-w-0 max-w-md hidden sm:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60 pointer-events-none" />
      <Input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-9 pl-9 pr-9 text-sm bg-muted/50 border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-2"
        aria-label="Search products"
      />
      {searchQuery ? (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/10 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-foreground/70" />
        </button>
      ) : null}
    </div>
  );
}
