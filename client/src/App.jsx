// import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ProtectedRoute from '../components/ProtectedRoute';

// import layout
import Layout from '../layouts/Layout';
import AdminLayout from '../layouts/AdminLayout';

// import pages
import Login from '../pages/user/Login';
import Home from '../pages/user/Home';
import About from '../pages/user/About';
import Collection from '../pages/user/Collection';
import Product from '../pages/user/Product';
import AdminAdd from '../pages/admin/AdminAdd';
// import ServerError from '../pages/ServerError';
// import PageNotFound from '../pages/PageNotFound';

// Import context
import { AuthProvider } from '../auth/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/collection',
        element: <Collection />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '/about',
        element: <About />,
      },
      // {
      //   path: '/server-error',
      //   element: (
      //     // <ProtectedRoute>
      //       <ServerError />
      //     // </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: '*',
      //   element: <PageNotFound />,
      // },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'add',
        element: <AdminAdd />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={6000} hideProgressBar={false} />
      </AuthProvider>
    </div>
  );
};

export default App;
