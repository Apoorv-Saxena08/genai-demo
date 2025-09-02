import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  couponCode: string | null;
  discountAmount: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "aangan_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { items: CartItem[]; couponCode: string | null };
        setItems(parsed.items || []);
        setCouponCode(parsed.couponCode || null);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ items, couponCode })
    );
  }, [items, couponCode]);

  const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (id, quantity) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const applyCoupon = (code: string) => {
    // Simple demo: FLAT10 => 10% off, SAVE50 => ₹50 off
    const normalized = code.trim().toUpperCase();
    if (normalized === "FLAT10" || normalized === "SAVE50") {
      setCouponCode(normalized);
    } else {
      setCouponCode(null);
    }
  };

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const discountAmount = useMemo(() => {
    if (!couponCode) return 0;
    if (couponCode === "FLAT10") return Math.round(subtotal * 0.1);
    if (couponCode === "SAVE50") return Math.min(50, subtotal);
    return 0;
  }, [couponCode, subtotal]);

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    couponCode,
    discountAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


