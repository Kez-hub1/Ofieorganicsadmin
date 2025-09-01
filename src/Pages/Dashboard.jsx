import React, { useState, useEffect } from "react";
import AddProduct from "../Components/AddProduct";
import AdminProductList from "../Components/AdminProductList";
import { Package, Plus, List, User } from "lucide-react";
import { fetchProducts, deleteProduct, editProduct } from "../api/Client.js";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock admin check - in a real app, this would check authentication
  const isAdmin = true;


  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [refreshTrigger]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleProductAdded = () => {
    setRefreshTrigger((prev) => prev + 1); // Trigger refresh
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      alert("Product deleted successfully!");
      setRefreshTrigger((prev) => prev + 1); // Refresh list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      await updateProduct(productId);
      setRefreshTrigger((prev) => prev + 1); // Refresh list
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your organic beauty products</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? "-" : products.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Admin Status
                  </p>
                  <p className="text-2xl font-bold text-gray-900">Active</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100">
                  <List className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading
                      ? "-"
                      : [...new Set(products.map((p) => p.category))].length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "overview"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("add-product")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === "add-product"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === "products"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  My Products ({products.length})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Dashboard Overview
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-green-900 mb-2">
                        Quick Actions
                      </h3>
                      <div className="space-y-3">
                        <button
                          onClick={() => setActiveTab("add-product")}
                          className="w-full text-left p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-3"
                        >
                          <Plus className="w-5 h-5 text-green-600" />
                          <span className="font-medium">Add New Product</span>
                        </button>
                        <button
                          onClick={() => setActiveTab("products")}
                          className="w-full text-left p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-3"
                        >
                          <Package className="w-5 h-5 text-green-600" />
                          <span className="font-medium">View My Products</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-blue-900 mb-2">
                        Recent Activity
                      </h3>
                      <div className="space-y-2">
                        {loading ? (
                          <p className="text-sm text-blue-600">Loading...</p>
                        ) : products.length === 0 ? (
                          <p className="text-sm text-blue-600">
                            No products added yet
                          </p>
                        ) : (
                          <div>
                            <p className="text-sm text-blue-600">
                              Latest: {products[0]?.name || "No products"}
                            </p>
                            <p className="text-xs text-blue-500">
                              Total products: {products.length}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "add-product" && (
                <AddProduct onAddProduct={handleProductAdded} />
              )}

              {activeTab === "products" &&
                (loading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : (
                  <AdminProductList
                    products={products}
                    onDeleteProduct={handleDeleteProduct}
                    onEditProduct={handleEditProduct}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
