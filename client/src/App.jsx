// import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProtectedRoute from '../components/ProtectedRoute';

// import pages
import Login from "../pages/Login";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Collection from "../pages/Collection";

// import ServerError from '../pages/ServerError';
// import PageNotFound from '../pages/PageNotFound';

// import components
import Header from "../components/Header";
import Footer from "../components/Footer";

// Import context
import { AuthProvider } from "../auth/AuthContext";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/collection",
        element: <Collection />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
]);

const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={false}
        />
      </AuthProvider>
    </div>
  );
};

export default App;
