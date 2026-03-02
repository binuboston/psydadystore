import { motion } from 'motion/react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItemProps {
  item: {
    id: string;
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
  };
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <motion.div
      layout
      className="bg-card rounded-2xl border border-border p-6 flex gap-6 group"
    >
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg text-foreground mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(item.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </Button>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-foreground w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg text-foreground">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            {item.quantity > 1 && (
              <p className="text-sm text-muted-foreground">${item.price} each</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
