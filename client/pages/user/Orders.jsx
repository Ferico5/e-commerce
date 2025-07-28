import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
import { Link } from 'react-router-dom';
import TitleBox from '../../components/user/TitleBox.jsx';
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
    <div className="content flex flex-col items-start pt-12 border-t border-[#E5E7EB] font-outfit">
      <TitleBox first="MY" second="ORDERS" />
      {/* Product */}
      {orders.length === 0 ? (
        <p className="mt-6 text-gray-500">You haven't ordered yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="flex w-full justify-between border-b border-t border-[#E5E7EB] py-5">
            <div className="flex">
              <img src={order.items[0].image[0]} className="w-22" />
              <div className="ml-5">
                <p className="font-medium mb-1">{order.items[0].name}</p>
                <div className="flex gap-4 mb-1">
                  <p>Rp. {order.items[0].price}</p>
                  <p>Quantity: {order.items[0].quantity}</p>
                  <p>Size: {order.items[0].size}</p>
                </div>
                <p className="text-sm mb-1">
                  Date: <span className="text-[#A2A9B4]">{new Date(order.date).toDateString()}</span>
                </p>
                <p className="text-sm">
                  Payment: <span className="text-[#A2A9B4]">Bank {order.paymentMethod.toUpperCase()}</span>
                </p>
              </div>
            </div>
            <div className="w-1/4 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full mr-3 bg-green-500"></div>
              <p>{order.status}</p>
            </div>
            <div className="w-1/4 flex items-center justify-end">
              <Link to={`/orders/${order._id}`} className="border border-[#E5E7EB] px-4 py-2 text-sm hover:cursor-pointer">
                Detail Order
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
