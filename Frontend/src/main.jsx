// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './components/Home/Home.jsx';
import Finance from './Finance.jsx';
import CalculateTax from './CalculateTax.jsx';
import { Navigate, Outlet } from 'react-router-dom';

// PrivateRoute component to protect routes
const PrivateRoute = () => {
  const session = localStorage.getItem('session');
  const isAuthenticated = session ? JSON.parse(session).isAuthenticated : false;
  const location = useLocation(); // Add this

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/Login" state={{ from: location.pathname }} replace />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App acts as the layout with Header
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/Footer",
        element: <Footer />,
      },
      {
        path: "/Finance",
        element: <Finance />,
      },
      {
        element: <PrivateRoute />, // Wrap CalculateTax in PrivateRoute
        children: [
          {
            path: "/CalculateTax",
            element: <CalculateTax />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);



// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//       <Route path='' element={<Home />} />
//       <Route path='/Login' element={<Login />} />
//       <Route path='/Signup' element={<Signup />} />
//     </Route>
//   )
// )