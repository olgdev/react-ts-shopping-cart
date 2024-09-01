import { createContext, useContext, useState, type ReactNode } from "react";
import { ShoppingCart } from "../components/ShoppingCart.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number | string;
  quantity: number;
};

type ShoppingCartContext = {
  toggleCart: () => void;
  getItemQuantity: (id: number | string) => number;
  increaseCartQuantity: (id: number | string) => void;
  decreaseCartQuantity: (id: number | string) => void;
  removeFromCart: (id: number | string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shoppingCartItems", []);

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleCart = () => {
    setIsOpen((prev) =>!prev);
  };

  const getItemQuantity = (id: number | string) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number | string) => {
    setCartItems((prev) => {
      if (!prev.some((item) => item.id === id)) {
        return [...prev, { id, quantity: 1 }];
      } else {
        return prev.map((item) => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number | string) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.id === id && item.quantity === 1)) {
        return prev.filter((item) => item.id !== id);
      } else {
        return prev.map((item) => {
          if (item.id === id && item.quantity > 1) {
            return {...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    });
  };

  const removeFromCart = (id: number | string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider value={{
      cartItems,
      toggleCart,
      cartQuantity,
      getItemQuantity,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
    }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
