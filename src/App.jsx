import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import Sidebar from './Components/SideBar';
import Home from './Pages/Home';
import AddNewAd from './Pages/AddNewProduct';
// import AdminDashboard from './Pages/AdminDashboard';
import AddNewProduct from './Pages/AddNewProduct';
import Dashboard from './Pages/Dashboard';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/sidebar",
    element: <Sidebar/>,
  },
  {
    path: "/addnewproduct",
    element: <AddNewProduct/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },

]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App
