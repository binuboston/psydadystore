import { Star, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Separator } from './ui/separator';
import { useCartStore } from '../store/useCartStore';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductInfoProps {
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  sizes: string[];
  features: string[];
  image: string;
  inStock: boolean;
}

export function ProductInfo({
  productId,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  description,
  sizes,
  features,
  image,
  inStock,
}: ProductInfoProps) {
  const { selectedSize, setSelectedSize, addToCart } = useCartStore();
  const [quantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addToCart({
      productId,
      name,
      price,
      size: selectedSize,
      quantity,
      image,
    });

    toast.success('Added to cart!', {
      description: `${name} - Size ${selectedSize}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      className="space-y-6"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-primary text-sm rounded-full">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          New Arrival
        </span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-4xl tracking-tight text-foreground mb-2">{name}</h1>
        <p className="text-muted-foreground">Premium Collection</p>
      </motion.div>

      {/* Rating */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2"
      >
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-border'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {rating} ({reviewCount} reviews)
        </span>
      </motion.div>

      {/* Price */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex items-baseline gap-3"
      >
        <span className="text-4xl text-foreground">${price}</span>
        {originalPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">${originalPrice}</span>
            <span className="px-2 py-1 bg-red-50 text-red-600 text-sm rounded-md">
              Save ${originalPrice - price}
            </span>
          </>
        )}
      </motion.div>

      <Separator className="my-6" />

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </motion.div>

      {/* Size Picker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <label className="text-sm text-foreground">
            Select Size
          </label>
          <button className="text-sm text-primary hover:opacity-80">
            Size Guide
          </button>
        </div>
        
        <ToggleGroup
          type="single"
          value={selectedSize || ''}
          onValueChange={(value) => value && setSelectedSize(value)}
          className="justify-start gap-2"
        >
          {sizes.map((size) => (
            <ToggleGroupItem
              key={size}
              value={size}
              className="h-12 w-16 rounded-xl border-2 data-[state=on]:border-primary data-[state=on]:bg-accent data-[state=on]:text-foreground hover:border-border transition-all"
            >
              {size}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </motion.div>

      {/* Add to Cart Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="space-y-3"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleAddToCart}
            className="w-full h-14 bg-primary hover:opacity-90 text-primary-foreground rounded-xl text-base hover:shadow-lg transition-all"
          >
            Add to Cart
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full h-14 border-2 border-border hover:border-muted-foreground/30 rounded-xl text-base"
          >
            Buy Now
          </Button>
        </motion.div>
      </motion.div>

      <Separator className="my-6" />

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="space-y-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + index * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="p-1 bg-accent rounded-full mt-0.5">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      <Separator className="my-6" />

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-muted rounded-xl">
            <Truck className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">Free Shipping</p>
        </div>
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-muted rounded-xl">
            <RotateCcw className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">30-Day Returns</p>
        </div>
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-muted rounded-xl">
            <Shield className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">2-Year Warranty</p>
        </div>
      </motion.div>
    </motion.div>
  );
}