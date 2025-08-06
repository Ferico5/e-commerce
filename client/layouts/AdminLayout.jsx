import AdminHeader from '../components/admin/AdminHeader';
import AdminNavbar from '../components/admin/AdminNavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminNavbar />
        <div className="admin-content flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
