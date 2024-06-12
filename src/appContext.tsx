import React, { useState, useEffect } from "react";
import data from "./data/plantData";

interface appContextProviderProps {
  children: React.ReactNode;
}

interface AllItemsType {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  isFavorite: boolean;
  forBeginners: boolean;
  isPetSafe: boolean;
}

export interface CartType {
  id: number;
  quantity: number;
  price: number;
}

interface AppContextType {
  allItems: AllItemsType[];
  setAllItems: React.Dispatch<React.SetStateAction<AllItemsType[]>>;
  toggleFavorite: (id: number) => void;
  cart: CartType[] | null;
  setCart: React.Dispatch<React.SetStateAction<CartType[] | null>>;
  addToCart: (id: number, quantity: number, price: number) => void;
  plus: (id: number) => void;
  minus: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const AppContext = React.createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: appContextProviderProps) => {
  const [allItems, setAllItems] = useState(
    localStorage.getItem("items") ? JSON.parse(localStorage["items"]) : data
  );
  const [cart, setCart] = useState<CartType[] | null>(
    localStorage.getItem("cart") ? JSON.parse(localStorage["cart"]) : null
  );

  const addToCart = (id: number, quantity: number, price: number) => {
    let copyCart: CartType[] = [];
    cart?.forEach((item) => copyCart.push(item));
    copyCart.push({ id, quantity, price });
    setCart(copyCart);
  };

  const removeItem = (id: number) => {
    const copyCart: { id: number; quantity: number; price: number }[] = [];
    cart?.forEach((item) => copyCart.push(item));
    setCart(copyCart.filter((item) => item.id !== id));
  };

  const minus = (id: number, quantity: number) => {
    if (quantity > 1) {
      const copyCart: { id: number; quantity: number; price: number }[] = [];
      cart?.forEach((item) => copyCart.push(item));
      setCart(
        copyCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const plus = (id: number) => {
    const copyCart: { id: number; quantity: number; price: number }[] = [];
    cart?.forEach((item) => copyCart.push(item));
    setCart(
      copyCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const toggleFavorite = (id: number) => {
    const updatedArr = allItems.map((item: AllItemsType) => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    setAllItems(updatedArr);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(allItems));
  }, [allItems]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <AppContext.Provider
      value={{
        allItems,
        setAllItems,
        toggleFavorite,
        cart,
        setCart,
        addToCart,
        plus,
        minus,
        removeItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };