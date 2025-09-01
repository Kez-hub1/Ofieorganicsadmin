import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminProductList from "./Components/AdminProductList";
import AdminLogin from "./Pages/AdminLogin";
import Edit from "./Components/Edit";
import AddProduct from "./Components/AddProduct";
import Dashboard from "./Pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
    path: "/login",
    element: <AdminLogin />,
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
