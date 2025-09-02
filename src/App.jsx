import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Dashboard from "./Pages/Dashboard";
import AdminProductList from "./Components/AdminProductList";
import AdminLogin from "./Pages/AdminLogin";
import Edit from "./Components/Edit";
import AddProduct from "./Components/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLogin />,
  },
  {
    path: "/addproduct",
    element: <AddProduct />,
  },
  {
    path: "/adminproductlist",
    element: <AdminProductList />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
