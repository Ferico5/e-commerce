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
    <div className="flex justify-end w-[50%] sm:w-[39%] md:w-[32%] lg:w-[24%] xl:w-[19%] h-screen border-r-2 border-[#E5E7EB]">
      <ul className="font-outfit w-[78%]">
        {/* Add */}
        <li>
          <Link to="add" className={`flex gap-3 pl-3 py-2 mt-6 border-b border-t border-l rounded-l-md text-[0.938rem] ${location.pathname === '/admin/add' ? 'bg-[#FFEBF5] border-[#C586A5]' : 'border-[#E5E7EB]'}`}>
            <img src={add_icon} className="w-5 h-5" />
            Add Items
          </Link>
        </li>

        {/* Lists */}
        <li>
          <Link to="list" className={`flex gap-3 pl-3 py-2 mt-6 border-b border-t border-l rounded-l-md text-[0.938rem] ${location.pathname === '/admin/list' ? 'bg-[#FFEBF5] border-[#C586A5]' : 'border-[#E5E7EB]'}`}>
            <img src={order_icon} className="w-5 h-5" />
            List Items
          </Link>
        </li>

        {/* Orders */}
        <li>
          <Link to="orders" className={`flex gap-3 pl-3 py-2 mt-6 border-b border-t border-l rounded-l-md text-[0.938rem] ${location.pathname === '/admin/orders' ? 'bg-[#FFEBF5] border-[#C586A5]' : 'border-[#E5E7EB]'}`}>
            <img src={order_icon} className="w-5 h-5" />
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
