import AdminHeader from '../components/admin/AdminHeader';
import AdminNavbar from '../components/admin/AdminNavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <div className="flex">
        <AdminNavbar />
        <div className='admin-content flex-1'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
