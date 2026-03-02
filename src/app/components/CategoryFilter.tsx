import { motion } from 'motion/react';
import { useSearchParams } from 'react-router';
import { useProductStore } from '../store/useProductStore';
import { Button } from './ui/button';

export function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useProductStore((state) => state.categories);
  const selectedCategory = useProductStore((state) => state.selectedCategory);
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);

  const handleCategoryClick = (category: string) => {
    const value = category === 'All' ? null : category;
    setSelectedCategory(value);
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('category', value);
    } else {
      next.delete('category');
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap gap-2"
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category || (category === 'All' && !selectedCategory);

        return (
          <Button
            key={category}
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryClick(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        );
      })}
    </motion.div>
  );
}
