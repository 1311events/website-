"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { InventoryItem } from "@/data/inventory";
import {
  computeRentalQuote,
  type RentalQuote,
} from "@/lib/rental-quote";

export {
  formatMoney,
  lineTotal,
  parsePrice,
} from "@/lib/rental-quote";

export type CartLine = {
  id: string;
  name: string;
  price: string;
  category: string;
  availableQty: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  estimatedTotal: number | null;
  quote: RentalQuote;
  ready: boolean;
  addItem: (item: InventoryItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getLineQuantity: (item: Pick<InventoryItem, "category" | "name">) => number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "1311-inventory-cart";

export function itemId(
  item: Pick<InventoryItem, "category" | "name"> | Pick<CartLine, "category" | "name">
) {
  return `${item.category}::${item.name}`;
}

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredCart(items: CartLine[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore quota errors */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Load once — never write empty cart before this finishes
  useEffect(() => {
    setItems(readStoredCart());
    setReady(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setItems(readStoredCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const commit = useCallback((updater: (prev: CartLine[]) => CartLine[]) => {
    setItems((prev) => {
      const next = updater(prev);
      writeStoredCart(next);
      return next;
    });
  }, []);

  const addItem = useCallback(
    (item: InventoryItem, quantity = 1) => {
      const id = itemId(item);
      commit((prev) => {
        const existing = prev.find((line) => line.id === id);
        if (existing) {
          return prev.map((line) =>
            line.id === id ? { ...line, quantity: line.quantity + quantity } : line
          );
        }
        return [
          ...prev,
          {
            id,
            name: item.name,
            price: item.price,
            category: item.category,
            availableQty: item.qty,
            quantity,
          },
        ];
      });
      setIsOpen(true);
    },
    [commit]
  );

  const removeItem = useCallback(
    (id: string) => {
      commit((prev) => prev.filter((line) => line.id !== id));
    },
    [commit]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      commit((prev) => {
        if (quantity < 1) return prev.filter((line) => line.id !== id);
        return prev.map((line) => (line.id === id ? { ...line, quantity } : line));
      });
    },
    [commit]
  );

  const clearCart = useCallback(() => {
    writeStoredCart([]);
    setItems([]);
  }, []);

  const getLineQuantity = useCallback(
    (item: Pick<InventoryItem, "category" | "name">) => {
      const id = itemId(item);
      return items.find((line) => line.id === id)?.quantity ?? 0;
    },
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items]
  );

  const quote = useMemo(() => computeRentalQuote(items), [items]);
  const estimatedTotal = quote.hasPricedItems ? quote.total : null;

  const value = useMemo(
    () => ({
      items,
      itemCount,
      estimatedTotal,
      quote,
      ready,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getLineQuantity,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((v) => !v),
    }),
    [
      items,
      itemCount,
      estimatedTotal,
      quote,
      ready,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getLineQuantity,
      isOpen,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
