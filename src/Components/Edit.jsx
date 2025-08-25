import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Save, X, Upload } from "lucide-react";
import { fetchProducts, apiClient } from "../api/Client";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    inStock: true,
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories and product details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const catRes = await fetch("/api/categories");
        const catData = await catRes.json();
        setCategories(Array.isArray(catData) ? catData : []);

        // Fetch product details
        const products = await fetchProducts();
        const product = Array.isArray(products)
          ? products.find((p) => (p.id || p._id) === id)
          : null;
        if (product) {
          setFormData({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            category: product.category || "",
            image: null,
            inStock: product.inStock ?? true,
          });
          if (product.image) setImagePreview(product.image);
        }
      } catch (error) {
        // handle error
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: null }));
    const fileInput = document.getElementById("image-upload");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("category", formData.category);
      payload.append("inStock", formData.inStock);
      if (formData.image) payload.append("image", formData.image);


      // PATCH or PUT to update product
      const token = localStorage.getItem("adminToken");
      await apiClient.put(`/api/products/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product updated successfully!");
      navigate(-1); // Go back
    } catch (error) {
      alert("Error updating product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Enter product name"
                  required
                />
              </div>
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  required
                >
                 <option value="">Select a category</option>
                    <option>Face Care</option>
                    <option>Body Care</option>
                    <option>Hair Care</option>
                    <option>Makeup</option>
                    <option>Fragrance</option>
                </select>
              </div>
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (GH₵) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                  required
                />
              </div>
              {/* In Stock */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">In Stock</label>
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Describe your product..."
                  required
                />
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-48 w-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <span className="block text-sm font-medium text-gray-900">
                            Upload an image
                          </span>
                          <span className="block text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </span>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
          {/* Submit */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
