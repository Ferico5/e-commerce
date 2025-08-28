import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleBox from '../../components/user/TitleBox.jsx';
import ResponsiveContainer from '../../components/ResponsiveContainer.jsx';
import bin_icon from '../../assets/frontend_assets/bin_icon.png';
import { useCart } from '../../auth/CartContext.jsx';
import axios from '../../utils/axiosInstance.js';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [quantityMap, setQuantityMap] = useState({});
  const debounceTimeout = useRef({});
  const { fetchCartCount } = useCart();
  const navigate = useNavigate();

  const calculateTotals = (cartItems, qtyMap) => {
    let sub = 0;

    cartItems.forEach((item) => {
      const key = `${item.productId}_${item.size}`;
      const quantity = qtyMap[key] || item.quantity || 1;
      sub += item.price * quantity;
    });

    const shipping = Math.ceil(sub * 0.1);
    const total = sub + shipping;

    setSubtotal(sub);
    setShippingFee(shipping);
    setTotal(total);
  };

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
        calculateTotals(cartArray, newQuantityMap);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      calculateTotals(cart, quantityMap);
    }
  }, [quantityMap]);

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
    <ResponsiveContainer className="flex flex-col pt-9">
      <div className="flex mb-4">
        <TitleBox first="YOUR" second="CART" size="big" />
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="flex border-b border-t border-[#E5E7EB] py-4 font-outfit">
            <img src={item.image[0]} className="w-30 h-30 sm:w-20 sm:h-25 object-cover" />
            <div className="flex flex-col ml-5 w-6/7 sm:w-3/7">
              <p className="font-semibold sm:text-lg">{item.name}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 mt-1">
                <p>Rp {item.price}</p>
                <p className="border border-[#E5E7EB] px-3 py-1 bg-[#F8FAFC] w-fit">{item.size}</p>
              </div>
            </div>
            <div className="w-full sm:w-2/7 flex items-center justify-center">
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

      <div className="flex flex-col items-end mt-20 font-outfit text-sm">
        <div className="w-full sm:w-3/7 flex">
          <TitleBox first="CART" second="TOTALS" size="big" />
        </div>
        <div className="w-full sm:w-3/7 flex justify-between pb-2 mt-3 border-b border-[#E5E7EB]">
          <p>Subtotal</p>
          <p>Rp {subtotal.toLocaleString('id-ID')}</p>
        </div>
        <div className="w-full sm:w-3/7 flex justify-between pb-2 mt-3 border-b border-[#E5E7EB]">
          <p>Shipping Fee</p>
          <p>Rp {shippingFee.toLocaleString('id-ID')}</p>
        </div>
        <div className="w-full sm:w-3/7 flex justify-between pb-2 mt-3 font-bold">
          <p>Total</p>
          <p>Rp {total.toLocaleString('id-ID')}</p>
        </div>
        <button onClick={() => navigate('/place-order')} className="bg-black text-white px-6 py-3 mt-5 hover:cursor-pointer">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </ResponsiveContainer>
  );
};

export default Cart;
