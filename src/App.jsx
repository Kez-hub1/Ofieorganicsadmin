import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import AddProduct from "./components/AddProduct";
import AdminProductList from "./Components/AdminProductList";
import AdminLogin from "./Pages/AdminLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/login",
    element: <AdminLogin />,
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
