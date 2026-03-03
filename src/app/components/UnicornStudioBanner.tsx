import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import UnicornScene from 'unicornstudio-react';
import { HeaderSearch } from './HeaderSearch';
import { useBannerStore } from '../store/useBannerStore';

/** Unicorn Studio project ID for banner motion. Embed: https://framer.com/m/UnicornStudioEmbed-wWy9.js */
const UNICORN_PROJECT_ID = '4qnDP5XucTA8EjxnCers';
const PARALLAX_FACTOR = 0.4;
const SCROLL_THRESHOLD = 120; // header / logo transition (unchanged)

const LOGO = 'psyDady';

export function UnicornStudioBanner() {
  const heroContent = useBannerStore((s) => s.heroContent);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, (v) => v * PARALLAX_FACTOR);
  // Fade out title/search when banner is fully scrolled (banner is 80vh)
  const bannerSearchOpacity = useTransform(scrollY, (v) => {
    const hideBy = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600;
    return Math.max(0, 1 - v / hideBy);
  });

  const [logoInBanner, setLogoInBanner] = useState(true);
  useMotionValueEvent(scrollY, 'change', (v) => setLogoInBanner(v <= SCROLL_THRESHOLD));

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      aria-label="Hero banner"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: parallaxY }}
      >
        <UnicornScene
          projectId={UNICORN_PROJECT_ID}
          width="100%"
          height="100%"
          className="absolute inset-0 object-cover"
          lazyLoad={false}
          production={true}
          scale={1}
          dpi={1.5}
          fps={60}
        />
      </motion.div>

      <div className="relative z-10 flex min-h-[400px] h-[70vh] w-full flex-col items-center justify-center p-6 md:p-10">
        {/* Banner logo - participates in shared layout transition to header */}
        {logoInBanner && (
          <Link
            to="/shop"
            className="absolute left-4 top-6 md:left-8 md:top-8 z-20"
            aria-label="Home"
          >
            <motion.div
              layoutId="main-logo"
              className="text-2xl font-semibold tracking-tight text-white cursor-pointer hover:text-white/90 transition-colors"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            >
              {LOGO}
            </motion.div>
          </Link>
        )}

        <motion.div
          className="w-full max-w-md pointer-events-auto flex flex-col gap-4"
          style={{ opacity: bannerSearchOpacity }}
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-[76px] font-bold tracking-tight text-white">
              {heroContent.title}
            </h1>
            <p className="mt-2 text-base md:text-lg text-white/80">
              {heroContent.subtitle}
            </p>
          </div>
          <HeaderSearch variant="banner" />
        </motion.div>
      </div>
    </section>
  );
}
