import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { CartItem } from '../components/CartItem';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

export function Cart() {
  const items = useCartStore((state) => state.items);
  const cartSubtotal = useCartStore((state) => state.getCartSubtotal());
  const navigate = useNavigate();

  const shipping = cartSubtotal >= 100 ? 0 : 12;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="inline-flex p-6 bg-muted rounded-full mb-6">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-3xl text-foreground mb-4">Your cart is empty</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start shopping to add items to your cart
          </p>
          <Link to="/shop">
            <Button size="lg">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl tracking-tight text-foreground mb-2">Shopping Cart</h1>
        <p className="text-lg text-muted-foreground">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <CartItem item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
            <h2 className="text-xl text-foreground mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xl text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="mb-6 p-4 bg-accent rounded-lg">
                <p className="text-sm text-foreground">
                  Add ${(100 - cartSubtotal).toFixed(2)} more to get free shipping!
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full h-12 rounded-xl"
              >
                Proceed to Checkout
              </Button>
              <Link to="/shop">
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-border hover:border-muted-foreground/30 rounded-xl"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
