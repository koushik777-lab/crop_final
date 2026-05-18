import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  benefits: string[];
  usageGuide: string;
  safetyInstructions: string;
  category: Category;
  images: string[];
  price: number;
  unit: string;
  inStock: boolean;
  featured: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pages: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  product?: Product;
  type: string;
  status: string;
  createdAt: string;
}

export interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  items: { product: string; name: string; quantity: number; unit: string }[];
  status: string;
  notes?: string;
  createdAt: string;
}
