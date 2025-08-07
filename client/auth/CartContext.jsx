import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/get-cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const count = res.data.cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
      setCartCount(count);
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  };

  const resetCart = () => {
    setCartCount(0);
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount, resetCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
