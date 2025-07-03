import AdminHeader from '../components/admin/AdminHeader';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default AdminLayout;
