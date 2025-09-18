import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import add_icon from '../../assets/admin_assets/add_icon.png';
import order_icon from '../../assets/admin_assets/order_icon.png';

const AdminNavbar = () => {
  const { token, user } = useAuth();
  const location = useLocation();

  if (!token || !user || user.role !== 'admin') return null;

  return (
    <div className="flex justify-end w-[15%] md:w-[23%] lg:w-[24%] xl:w-[19%] h-screen border-r-2 border-[#E5E7EB] bg-[#F9FAFB]">
      <ul className="font-outfit w-[80%] md:w-[78%]">
        {/* Add */}
        <li>
          <Link
            to="add"
            className={`flex gap-3 md:pl-3 py-2 mt-6 border-b border-t border-l rounded-l-md text-[0.938rem] justify-center md:justify-start ${location.pathname === '/admin/add' ? 'bg-[#FFEBF5] border-[#C586A5]' : 'border-[#E5E7EB]'}`}
          >
            <img src={add_icon} alt='add_icon' className="w-5 h-5" />
            <p className="hidden md:inline">Add Items</p>
          </Link>
        </li>

        {/* Lists */}
        <li>
          <Link
            to="list"
            className={`flex gap-3 md:pl-3 py-2 mt-6 border-b border-t border-l rounded-l-md text-[0.938rem] justify-center md:justify-start ${location.pathname === '/admin/list' ? 'bg-[#FFEBF5] border-[#C586A5]' : 'border-[#E5E7EB]'}`}
          >
            <img src={order_icon} alt='order_icon' className="w-5 h-5" />
            <p className="hidden md:inline">List Items</p>
          </Link>
        </li>

        {/* Orders */}
        <li>
          <Link
            to="orders"
            className={`flex gap-3 md:pl-3 py-2 mt-6 border-b border-t border-l rounded-l-md text-[0.938rem] justify-center md:justify-start ${location.pathname === '/admin/orders' ? 'bg-[#FFEBF5] border-[#C586A5]' : 'border-[#E5E7EB]'}`}
          >
            <img src={order_icon} alt='order_icon' className="w-5 h-5" />
            <p className="hidden md:inline">Orders</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
