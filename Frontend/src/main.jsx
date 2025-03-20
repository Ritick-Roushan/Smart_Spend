import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './components/Home/Home.jsx'
import Finance from './Finance.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/Login",
            element: < Login/>
        },
        {
            path: "/Signup",
            element:  <Signup />
        },
        {
          path: "/Footer",
          element:  <Footer />
        },
        {
          path: "/Finance",
          element:  <Finance />
        },     
    ],
},
])



// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//       <Route path='' element={<Home />} />
//       <Route path='/Login' element={<Login />} />
//       <Route path='/Signup' element={<Signup />} />
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)