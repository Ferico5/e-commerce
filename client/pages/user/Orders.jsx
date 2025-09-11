import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
import { Link } from 'react-router-dom';
import TitleBox from '../../components/user/TitleBox.jsx';
import ResponsiveContainer from '../../components/ResponsiveContainer.jsx';
import axios from '../../utils/axiosInstance.js';

const Orders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(`orders/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    if (user) {
      fetchUserOrders();
    }
  }, [user, token]);

  return (
    <ResponsiveContainer className="flex flex-col items-start pt-12 border-t border-[#E5E7EB]">
      <TitleBox first="MY" second="ORDERS" />
      {/* Product */}
      {orders.length === 0 ? (
        <p className="mt-6 text-gray-500">You haven't ordered yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="flex w-full justify-between border-b border-t border-[#E5E7EB] py-5">
            <div className="w-full flex mr-10">
              <div className="relative w-[88px] h-[88px] mr-3">
                <img src={order.items[0].image[0]} className="w-22 object-cover rounded border border-gray-200 z-10 relative" />
                {order.items.length > 1 && <img src={order.items[1].image[0]} className="w-22 object-cover rounded border border-gray-200 absolute top-2 left-2 z-0 opacity-80" />}
              </div>
              <div className="ml-5">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{order.items[0].name}</p>
                  {order.items.length > 1 && <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">+{order.items.length - 1}</span>}
                </div>

                <div className="flex gap-4 mb-1">
                  <p>Rp. {order.total_fee.toLocaleString()}</p>
                  {order.items.length > 1 ? <p>Items: {order.items.length}</p> : <p>Quantity: {order.items[0].quantity}</p>}
                  {order.items.length > 1 ? null : <p>Size: {order.items[0].size}</p>}
                </div>
                <p className="text-sm mb-1">
                  Date: <span className="text-[#A2A9B4]">{new Date(order.date).toDateString()}</span>
                </p>
                <p className="text-sm">
                  Payment: <span className="text-[#A2A9B4]">Bank {order.paymentMethod.toUpperCase()}</span>
                </p>
              </div>
            </div>
            <div className="w-3/5 flex items-center">
              <div className="w-2 h-2 rounded-full mr-3 bg-green-500"></div>
              <p>{order.status}</p>
            </div>
            <div className="w-3/5 flex items-center justify-end">
              <Link to={`/orders/${order._id}`} className="border border-[#E5E7EB] px-4 py-2 text-sm hover:cursor-pointer">
                Detail Order
              </Link>
            </div>
          </div>
        ))
      )}
    </ResponsiveContainer>
  );
};

export default Orders;
