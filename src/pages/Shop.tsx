import { useEffect, useState } from "react";
import { useSearch } from "wouter";
import { motion } from "framer-motion";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import api, { Product, Category } from "../lib/api";
import ProductCard from "../components/ProductCard";

const CATEGORY_FILTERS = [
  { label: "All Products", value: "" },
  { label: "Fertilizers", value: "fertilizers" },
  { label: "Pesticides", value: "pesticides" },
  { label: "Herbicides", value: "herbicides" },
  { label: "Growth Regulators", value: "growth-regulators" },
  { label: "Organic Products", value: "organic-products" },
];

export default function Shop() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialCategory = params.get("category") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProducts = () => {
    setLoading(true);
    const qp = new URLSearchParams();
    if (searchQuery) qp.set("search", searchQuery);
    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) qp.set("category", cat._id);
    }
    qp.set("page", String(page));
    qp.set("limit", "12");
    api.get(`/products?${qp.toString()}`)
      .then((res) => {
        setProducts(res.data?.products || []);
        setTotalPages(res.data?.pages || 1);
        setTotal(res.data?.total || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, page, categories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <div className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-heading font-bold text-3xl text-brand-dark mb-2">Our Products</h1>
          <p className="text-gray-500">{total > 0 ? `${total} products available` : "Browse our agricultural solutions"}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            />
            {searchQuery && (
              <button type="button" onClick={() => { setSearchQuery(""); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </form>
          <button onClick={fetchProducts} className="px-5 py-2.5 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                selectedCategory === cat.value
                  ? "bg-brand-primary text-white shadow-md"
                  : "bg-white text-gray-600 border border-green-200 hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (products || []).length === 0 ? (
          <div className="text-center py-20">
            <SlidersHorizontal className="w-16 h-16 text-green-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No products found</p>
            <p className="text-gray-400 text-sm">Try adjusting your filters or search query</p>
            <button onClick={() => { setSelectedCategory(""); setSearchQuery(""); }} className="mt-4 px-5 py-2 text-sm text-brand-primary border border-brand-primary rounded-xl hover:bg-brand-light transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(products || []).map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 text-sm font-medium rounded-xl border border-green-200 bg-white disabled:opacity-40 hover:border-brand-primary hover:text-brand-primary transition-colors">
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 text-sm font-medium rounded-xl transition-colors ${page === p ? "primary-gradient text-white" : "bg-white border border-green-200 hover:border-brand-primary"}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 text-sm font-medium rounded-xl border border-green-200 bg-white disabled:opacity-40 hover:border-brand-primary hover:text-brand-primary transition-colors">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
