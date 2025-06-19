// import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
// import ProtectedRoute from '../components/ProtectedRoute';

// import pages
import Login from '../pages/Login'
// import ServerError from '../pages/ServerError';
// import PageNotFound from '../pages/PageNotFound';

// import components
import Header from '../components/Header'

// Import context
import { AuthProvider } from '../auth/AuthContext';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // {
      //   path: '/',
      //   element: <Navigate to="/dashboard" replace />,
      // },
      {
        path: '/login',
        element: <Login />,
      },
      // {
      //   path: '/dashboard',
      //   element: (
      //     // <ProtectedRoute>
      //       <Dashboard />
      //     // </ProtectedRoute>
      //   ),
      // },
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
]);

const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
};

export default App;