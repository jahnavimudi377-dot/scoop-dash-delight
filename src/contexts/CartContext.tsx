import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, IceCream } from '@/types';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (iceCream: IceCream) => void;
  removeFromCart: (iceCreamId: string) => void;
  updateQuantity: (iceCreamId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (iceCream: IceCream) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.iceCream.id === iceCream.id);
      if (existingItem) {
        toast.success(`Added more ${iceCream.name} to cart`);
        return prev.map((item) =>
          item.iceCream.id === iceCream.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${iceCream.name} added to cart`);
      return [...prev, { iceCream, quantity: 1 }];
    });
  };

  const removeFromCart = (iceCreamId: string) => {
    setCart((prev) => prev.filter((item) => item.iceCream.id !== iceCreamId));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (iceCreamId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(iceCreamId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.iceCream.id === iceCreamId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.iceCream.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
