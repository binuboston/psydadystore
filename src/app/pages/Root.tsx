import { Outlet, useLocation, ScrollRestoration } from 'react-router';
import { LayoutGroup } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { ScrollToTop } from '../components/ScrollToTop';
import { Toaster } from '../components/ui/sonner';

export function Root() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <LayoutGroup>
    <ScrollRestoration
      getKey={(loc) => loc.pathname}
    />
    <div className="min-h-screen bg-gradient-to-br from-white via-muted/30 to-[#f5e0e8]/20">
      {!isLanding && (
        <>
          <div
            className="fixed inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(71 85 105) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          <Navigation />
        </>
      )}
      <main className="relative">
        <Outlet />
      </main>

      <ScrollToTop />
      <Toaster position="bottom-right" />
    </div>
    </LayoutGroup>
  );
}
