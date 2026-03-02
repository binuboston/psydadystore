import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  selectedSize: string | null;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setSelectedSize: (size: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getCartSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedSize: null,
      
      addToCart: (item) => {
        // Check if item with same productId and size already exists
        const existingItem = get().items.find(
          (i) => i.productId === item.productId && i.size === item.size
        );

        if (existingItem) {
          // Update quantity if item exists
          set((state) => ({
            items: state.items.map((i) =>
              i.id === existingItem.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          }));
        } else {
          // Add new item
          const id = `${item.productId}-${item.size}-${Date.now()}`;
          set((state) => ({
            items: [...state.items, { ...item, id }],
          }));
        }
      },
      
      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
      
      setSelectedSize: (size) => {
        set({ selectedSize: size });
      },
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartSubtotal: () => {
        return get().getCartTotal();
      },
      
      getCartCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);