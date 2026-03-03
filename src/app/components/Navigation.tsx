import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, User, Heart } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useCartStore } from '../store/useCartStore';
import { HeaderSearch } from './HeaderSearch';

const SCROLL_THRESHOLD = 120;
const NAV_HEIGHT_PX = 64;
const SCROLL_UP_SHOW_THRESHOLD = 60;
const LOGO = 'psyDady';

const isBannerPage = (path: string) => path === '/shop';

export function Navigation() {
  const cartCount = useCartStore((s) => s.getCartCount());
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const [logoInHeader, setLogoInHeader] = useState(!isBannerPage(location.pathname));
  const [headerHidden, setHeaderHidden] = useState(false);
  const isBanner = isBannerPage(location.pathname);
  const [navY, setNavY] = useState(() => (isBanner ? -NAV_HEIGHT_PX : 0));

  useEffect(() => {
    if (!isBanner) setNavY(0);
    else {
      const v = scrollY.get();
      if (v <= SCROLL_THRESHOLD) setNavY(-NAV_HEIGHT_PX + (v / SCROLL_THRESHOLD) * NAV_HEIGHT_PX);
      else setNavY(0);
    }
    lastScrollY.current = scrollY.get();
  }, [location.pathname, isBanner]);

  useMotionValueEvent(scrollY, 'change', (v) => {
    setLogoInHeader(!isBannerPage(location.pathname) || v > SCROLL_THRESHOLD);
    if (!isBanner) {
      setNavY(0);
      return;
    }
    const prev = lastScrollY.current;
    lastScrollY.current = v;
    if (v <= SCROLL_THRESHOLD) {
      setHeaderHidden(false);
      setNavY(-NAV_HEIGHT_PX + (v / SCROLL_THRESHOLD) * NAV_HEIGHT_PX);
      return;
    }
    const nextHidden = v > prev ? true : prev - v >= SCROLL_UP_SHOW_THRESHOLD ? false : headerHidden;
    setHeaderHidden(nextHidden);
    setNavY(nextHidden ? -NAV_HEIGHT_PX : 0);
  });

  const displayY = isBanner ? navY : 0;

  return (
    <motion.nav
      initial={false}
      animate={{ y: displayY }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] flex items-center bg-white border-b border-[#eaeaea]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 md:gap-8 shrink-0">
          {logoInHeader ? (
            <Link to="/shop">
              <motion.div
                layoutId="main-logo"
                className="text-2xl font-semibold tracking-tight text-[#444444] cursor-pointer hover:text-[#ea4c89] transition-colors"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              >
                {LOGO}
              </motion.div>
            </Link>
          ) : (
            <Link to="/shop" className="text-2xl font-semibold tracking-tight text-[#444444] hover:text-[#ea4c89] transition-colors invisible">
              {LOGO}
            </Link>
          )}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-sm text-[#444444] hover:text-[#ea4c89] transition-colors">
              Shop
            </Link>
            <a href="#" className="text-sm text-[#444444] hover:text-[#ea4c89] transition-colors">
              Collections
            </a>
            <a href="#" className="text-sm text-[#444444] hover:text-[#ea4c89] transition-colors">
              About
            </a>
            <a href="#" className="text-sm text-[#444444] hover:text-[#ea4c89] transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <HeaderSearch />

        <div className="flex items-center shrink-0">
          <button type="button" className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors" aria-label="Account">
            <User className="w-5 h-5 text-[#444444]" />
          </button>
          <button type="button" className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors" aria-label="Wishlist">
            <Heart className="w-5 h-5 text-[#444444]" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="relative p-2 hover:bg-[#f5f5f5] rounded-full transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#444444]" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center"
              >
                <motion.span
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {cartCount}
                </motion.span>
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}