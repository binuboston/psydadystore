import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface ProgressLoaderProps {
  /** Duration in ms for the bar to fill */
  duration?: number;
  /** Callback when progress completes */
  onComplete?: () => void;
  /** Height of the bar in pixels */
  height?: number;
  className?: string;
}

/**
 * Minimal white progress bar. Fills left-to-right using Framer Motion.
 */
export function ProgressLoader({
  duration = 2000,
  onComplete,
  height = 2,
  className = '',
}: ProgressLoaderProps) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), duration);
    return () => clearTimeout(t);
  }, [duration, onComplete]);

  return (
    <div
      className={`absolute top-0 left-0 right-0 z-50 overflow-hidden ${className}`}
      style={{ height }}
      role="progressbar"
      aria-label="Loading"
    >
      <motion.div
        className="h-full bg-white"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: duration / 1000, ease: 'easeInOut' }}
      />
    </div>
  );
}
