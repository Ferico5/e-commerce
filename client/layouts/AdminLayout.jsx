import AdminHeader from '../components/admin/AdminHeader';
import AdminNavbar from '../components/admin/AdminNavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <div className='flex'>
        <AdminNavbar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
