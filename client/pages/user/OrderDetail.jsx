import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import TitleBox from '../../components/user/TitleBox.jsx';
import ResponsiveContainer from '../../components/ResponsiveContainer.jsx';
import axios from '../../utils/axiosInstance';

const OrderDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/order-detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDetail(res.data.order);
      } catch (error) {
        console.error('Failed to fetch order:', error);
        navigate('/', { replace: true });
      }
    };
    fetchOrder();
  }, [id, token, navigate]);

  if (!detail) {
    return <div className="content-mobile sm:content-tablet pt-12">Loading...</div>;
  }

  const item = detail.items[0];

  return (
    <ResponsiveContainer className="pt-12 border-t border-[#E5E7EB]">
      <TitleBox first="ORDER" second="DETAIL" />

      <div className="mt-8 bg-white p-6 mt-[-2%] rounded-xl shadow-md border border-[#E5E7EB]">
        {/* Product */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {detail.items.map((item, index) => (
            <div key={index} className="flex gap-6 items-start py-4">
              <img src={item.image[0]} className="w-40 object-cover rounded-lg" />
              <div>
                <p className="text-xl font-medium mb-2">{item.name}</p>
                <p className="text-gray-800 font-medium mb-3">Rp {item.price.toLocaleString()}</p>
                <p className="mb-1">
                  <span className="text-[#A2A9B4]">Size: </span>
                  {item.size}
                </p>
                <p className="mb-1">
                  <span className="text-[#A2A9B4]">Qty: </span>
                  {item.quantity}
                </p>
                <p className="mb-1">
                  <span className="text-[#A2A9B4]">Category: </span>
                  {item.category} / {item.subCategory}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#E5E7EB] pt-4">
          <div>
            <h3 className="font-medium text-lg mb-2">Payment & Status</h3>
            <p>
              Status: <span className="font-medium">{detail.status}</span>
            </p>
            <p>
              Payment: <span className="uppercase">{detail.paymentMethod}</span>
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Shipping Info</h3>
            <p>
              {detail.street}, {detail.city}
            </p>
            <p>{detail.country}</p>
            <p>Phone: {detail.phone}</p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Price Breakdown</h3>
            <p>Subtotal: Rp {detail.amount.toLocaleString()}</p>
            <p>Shipping Fee: Rp {detail.shipping_fee.toLocaleString()}</p>
            <p className="font-semibold mt-1">Total: Rp {detail.total_fee.toLocaleString()}</p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Order Info</h3>
            <p>Date: {new Date(detail.date).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default OrderDetail;
