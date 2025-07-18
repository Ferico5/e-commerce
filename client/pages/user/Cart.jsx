import React, { useEffect, useState, useRef } from 'react';
import axios from '../../utils/axiosInstance.js';
import TitleBox from '../../components/user/TitleBox.jsx';
import bin_icon from '../../assets/frontend_assets/bin_icon.png';
import { useCart } from '../../auth/CartContext.jsx';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const debounceTimeout = useRef({});
  const { fetchCartCount } = useCart();

  const fetchCart = () => {
    axios
      .get('/get-cart')
      .then((response) => {
        const cartArray = response.data.cartItems || [];
        setCart(cartArray);

        const newQuantityMap = {};
        cartArray.forEach((item) => {
          const key = `${item.productId}_${item.size}`;
          newQuantityMap[key] = item.quantity;
        });
        setQuantityMap(newQuantityMap);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = (productId, size, newQty) => {
    if (newQty < 1) return;

    const key = `${productId}_${size}`;

    setQuantityMap((prev) => ({
      ...prev,
      [key]: newQty,
    }));

    clearTimeout(debounceTimeout.current[key]);
    debounceTimeout.current[key] = setTimeout(() => {
      axios
        .put(`/cart/${productId}`, { quantity: newQty, size })
        .then(() => {
          fetchCart();
          fetchCartCount();
        })
        .catch((err) => console.error('Error updating cart:', err));
    }, 600);
  };

  const handleDelete = (productId, size) => {
    axios
      .delete(`/cart/${productId}?size=${size}`)
      .then(() => {
        fetchCart();
        fetchCartCount();
      })
      .catch((err) => console.error('Error deleting cart item:', err));
  };

  return (
    <div className="content flex flex-col pt-9">
      <div className="flex mb-4">
        <TitleBox first="YOUR" second="CART" size="big" />
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="flex border-b border-t border-[#E5E7EB] py-4 font-outfit">
            <img src={item.image[0]} className="w-20 h-25 object-cover" />
            <div className="flex flex-col ml-5 w-3/7">
              <p className="font-semibold text-lg">{item.name}</p>
              <div className="flex items-center gap-5 mt-1">
                <p>Rp {item.price}</p>
                <p className="border border-[#E5E7EB] px-3 py-1 bg-[#F8FAFC]">{item.size}</p>
              </div>
            </div>
            <div className="w-2/7 flex items-center justify-center">
              <input
                type="number"
                className="w-1/4 border py-1 px-2 border-[#E5E7EB] focus:outline-none"
                value={quantityMap[`${item.productId}_${item.size}`] || 1}
                min={1}
                onChange={(e) => {
                  const newQty = parseInt(e.target.value);
                  handleQuantityChange(item.productId, item.size, newQty);
                }}
              />
            </div>
            <div className="w-2/7 flex items-center justify-center">
              <img src={bin_icon} className="w-5 hover:cursor-pointer" onClick={() => handleDelete(item.productId, item.size)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
