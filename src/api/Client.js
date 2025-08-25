// Fetch all products
export const fetchProducts = async () => {
  const token = localStorage.getItem("adminToken");
  const response = await apiClient.get("/api/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const apifetcher = async (url) => {
  const response = await apiClient.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    },
  });
  return response.data;
};

export const adminLogin = async (email, password) => {
  const response = await apiClient.post("/api/auth/admin-login", {
    email,
    password,
  });
  return response.data;
};

export const adminAddProduct = async (payload) => {
  const token = localStorage.getItem("adminToken");
  return apiClient.post("/api/products", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("adminToken");
  return apiClient.delete(`/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editProduct = async (id, payload) => {
  const token = localStorage.getItem("adminToken");
  return apiClient.put(`/api/products/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
