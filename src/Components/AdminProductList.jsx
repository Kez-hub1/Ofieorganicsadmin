import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Eye,
  Package,
  DollarSign,
  Calendar,
  Tag,
  X,
  Save,
} from "lucide-react";
import { fetchProducts } from "../api/Client.js";
import axios from "axios";

// Fetch products from backend and display
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Products</h2>
      {safeProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {safeProducts.map((product) => (
            <li
              key={product?.id || product?._id || Math.random()}
              className="mb-2"
            >
              {product?.name || "(No Name)"} -{" "}
              {product?.category || "(No Category)"} - GH₵
              {product?.price ?? "-"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdminProductList = ({ products, onEditProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Get unique categories from products
  const safeProducts = Array.isArray(products) ? products : [];
  const categories = [
    ...new Set(safeProducts.map((product) => product?.category || "")),
  ];

  // Filter and sort products
  const filteredProducts = safeProducts
    .filter((product) => {
      const name = product?.name || "";
      const description = product?.description || "";
      const category = product?.category || "";
      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b?.dateAdded || 0) - new Date(a?.dateAdded || 0);
        case "oldest":
          return new Date(a?.dateAdded || 0) - new Date(b?.dateAdded || 0);
        case "name":
          return (a?.name || "").localeCompare(b?.name || "");
        case "price-high":
          return (b?.price ?? 0) - (a?.price ?? 0);
        case "price-low":
          return (a?.price ?? 0) - (b?.price ?? 0);
        default:
          return 0;
      }
    });

  const handleDelete = async (productId, productName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${productName}"? This action cannot be undone.`
      )
    )
      return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `https://keziah-api.onrender.com/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product deleted successfully!");
      window.location.reload(); // reload to update list
    } catch (error) {
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleEditClick = (product) => {
    // Simple alert for now - you can implement proper edit modal later
    alert(`Edit functionality for "${product.name}" will be implemented soon!`);
  };

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Products Yet
        </h3>
        <p className="text-gray-500 mb-6">
          You haven't added any products to your store yet.
        </p>
        <button
          onClick={() => (window.location.hash = "#add-product")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Add Your First Product
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your {products.length} product
            {products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search Products
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search by name or description..."
            />
          </div>

          {/* Category Filter */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="price-low">Price (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No products match your current filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id || product._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Product Image */}
              <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-green-600">
                      GH₵{product.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>
                    Added{" "}
                    {new Date(
                      product.dateAdded || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* Ingredients */}
                {/* {product.ingredients && product.ingredients.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      Key Ingredients:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.ingredients
                        .slice(0, 3)
                        .map((ingredient, index) => (
                          <span
                            key={index}
                            className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded"
                          >
                            {ingredient}
                          </span>
                        ))}
                      {product.ingredients.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{product.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )} */}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {/* <button
                    onClick={() =>
                      alert("View functionality will show detailed product view")
                    }
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button> */}
                  <button
                    onClick={() => handleEditClick(product)}
                    className="flex-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(product.id || product._id, product.name)
                    }
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
};

export default AdminProductList;
