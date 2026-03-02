import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Heart, Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../store/useProductStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border"
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge
              variant={product.badge === 'sale' ? 'destructive' : 'default'}
              className="uppercase text-xs font-medium"
            >
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            // Add to wishlist functionality
          }}
        >
          <Heart className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
        </motion.button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="text-lg text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-[#ff8833] fill-[#ff8833]'
                      : 'text-border'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Quick View Button */}
          <Button
            className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              // Navigate is handled by Link
            }}
          >
            View Details
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
