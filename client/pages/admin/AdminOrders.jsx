import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import parcel_icon from '../../assets/admin_assets/parcel_icon.svg';
import axios from '../../utils/axiosInstance.js';
import ResponsiveContainerAdmin from '../../components/admin/ResponsiveContainerAdmin';

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUsersOrders = async () => {
      try {
        const res = await axios.get(`/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchUsersOrders();
  }, [token]);

  const handleUpdateStatus = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      await axios.put(
        `/orders/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  return (
    <ResponsiveContainerAdmin>
      <div className="font-outfit text-[#4B5563]">
        <p className="mb-3">Order Page</p>
        <div className="flex flex-col gap-3">
          {orders.map((order) => {
            const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);
            const formattedDate = new Date(order.date).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            return (
              <div key={order._id} className="flex flex-col md:flex-row justify-between items-start border border-[#E5E7EB] px-4 py-5 mb-2">
                <img src={parcel_icon} alt="Parcel Icon" loading="lazy" className="hidden lg:inline w-13" />
                <div className="w-full md:w-2/6">
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.name} x {item.quantity} {item.size},
                    </p>
                  ))}

                  <p className="my-2">{order.userName}</p>
                  <p>{order.street},</p>
                  <p>
                    {order.city}, {order.state}, {order.country}, {order.zipcode}
                  </p>
                  <p>{order.phone}</p>
                </div>

                <div className="w-full md:w-1/6 my-2 md:my-0">
                  <p className="mb-2">Items: {totalItems}</p>
                  <p>
                    Method: <span className="uppercase">{order.paymentMethod}</span>
                  </p>
                  <p>Payment: {order.payment ? 'Paid' : 'Pending'}</p>
                  <p>Date: {formattedDate}</p>
                </div>

                <div className="w-full md:w-[35%] xl:w-[25%] flex flex-col 2xl:flex-row">
                  <div className="w-full flex md:mb-2 2xl:mb-0">
                    <p>Rp {order.total_fee.toLocaleString('id-ID')}</p>
                  </div>

                  <select className="w-full my-2 md:my-0 border border-[#E5E7EB] hover:cursor-pointer px-3 py-1" value={order.status} onChange={(e) => handleUpdateStatus(e, order._id)}>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ResponsiveContainerAdmin>
  );
};

export default AdminOrders;
