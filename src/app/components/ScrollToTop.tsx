import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);
  const scale = useTransform(scrollY, [0, 300], [0.8, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      style={{ opacity, scale }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 p-4 bg-primary text-primary-foreground rounded-full hover:shadow-lg hover:opacity-90 transition-opacity z-40 backdrop-blur-sm"
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  );
}
