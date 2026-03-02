import React from 'react';
import { useNavigate } from 'react-router';
import UnicornScene from 'unicornstudio-react';
import { ProgressLoader } from '../components/ProgressLoader';

/**
 * Landing screen: full-viewport Unicorn Studio embed (Framer/Unicorn embed).
 * Redirects to shop after loader completes.
 * Embed: https://framer.com/m/UnicornStudioEmbed-wWy9.js
 */
const LANDING_PROJECT_ID = 'M9jx21H97bfJTIFpvp9r';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <ProgressLoader duration={2200} height={2} onComplete={() => navigate('/shop')} />

      <div className="absolute inset-0">
        <UnicornScene
          projectId={LANDING_PROJECT_ID}
          width="100%"
          height="100%"
          className="absolute inset-0"
          lazyLoad={false}
          production={true}
          scale={1}
          dpi={1.5}
          fps={60}
        />
      </div>
    </div>
  );
}
