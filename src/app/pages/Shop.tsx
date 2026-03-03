import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router';
import { useProductStore } from '../store/useProductStore';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { UnicornStudioBanner } from '../components/UnicornStudioBanner';

export function Shop() {
  const [searchParams] = useSearchParams();
  const selectedCategory = useProductStore((s) => s.selectedCategory);
  const setSelectedCategory = useProductStore((s) => s.setSelectedCategory);
  const getFilteredProducts = useProductStore((s) => s.getFilteredProducts);
  const filteredProducts = getFilteredProducts();

  // Sync URL -> store when navigating with ?category=
  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategory(category || null);
  }, [searchParams, setSelectedCategory]);

  return (
    <>
      <UnicornStudioBanner />
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-16">
        <div className="mb-8">
          <CategoryFilter />
        </div>

        {filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </>
  );
}