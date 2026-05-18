import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, Tags, MessageSquare, ShoppingCart, Plus, Pencil, Trash2, X, Check, ChevronRight, Loader, Database } from "lucide-react";
import api, { Product, Category, Inquiry, Order } from "../lib/api";
import { useAuth } from "../context/AuthContext";

type Tab = "dashboard" | "products" | "categories" | "inquiries" | "orders";

export default function Admin() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);
  const [showCatForm, setShowCatForm] = useState(false);
  const [catForm, setCatForm] = useState({ name: "", description: "" });
  const [productForm, setProductForm] = useState<{
    name: string; description: string; price: string; unit: string;
    category: string; benefits: string; usageGuide: string; safetyInstructions: string;
    featured: boolean; inStock: boolean; images: string[];
  }>({
    name: "", description: "", price: "", unit: "kg",
    category: "", benefits: "", usageGuide: "", safetyInstructions: "",
    featured: false, inStock: true, images: [],
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate("/login");
  }, [isAdmin, authLoading]);

  useEffect(() => {
    if (!isAdmin) return;
    fetchAll();
  }, [isAdmin]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [p, c, i, o] = await Promise.all([
        api.get("/products?limit=100"),
        api.get("/categories"),
        api.get("/inquiries"),
        api.get("/orders"),
      ]);
      setProducts(p.data.products);
      setCategories(c.data);
      setInquiries(i.data);
      setOrders(o.data);
    } catch {}
    setLoading(false);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try { await api.post("/seed"); await fetchAll(); } catch {}
    setSeeding(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await api.delete(`/categories/${id}`);
    setCategories(categories.filter((c) => c._id !== id));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c._id === productForm.category || c.name === productForm.category);
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      category: cat?._id || productForm.category,
      benefits: productForm.benefits.split("\n").filter(Boolean),
    };
    try {
      if (editProduct?._id) {
        await api.put(`/products/${editProduct._id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      setShowProductForm(false);
      setEditProduct(null);
      setProductForm({ name: "", description: "", price: "", unit: "kg", category: "", benefits: "", usageGuide: "", safetyInstructions: "", featured: false, inStock: true, images: [] });
      fetchAll();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error saving product");
    }
  };

  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/categories", catForm);
      setShowCatForm(false);
      setCatForm({ name: "", description: "" });
      fetchAll();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error saving category");
    }
  };

  const handleInquiryStatus = async (id: string, status: string) => {
    await api.patch(`/inquiries/${id}/status`, { status });
    setInquiries(inquiries.map((i) => i._id === id ? { ...i, status } : i));
  };

  const handleOrderStatus = async (id: string, status: string) => {
    await api.patch(`/orders/${id}/status`, { status });
    setOrders(orders.map((o) => o._id === id ? { ...o, status } : o));
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "products", label: "Products", icon: <Package className="w-4 h-4" /> },
    { id: "categories", label: "Categories", icon: <Tags className="w-4 h-4" /> },
    { id: "inquiries", label: "Inquiries", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "orders", label: "Orders", icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl text-brand-dark">Admin Panel</h1>
            <p className="text-sm text-gray-500">Manage products, categories, inquiries & orders</p>
          </div>
          <button onClick={handleSeed} disabled={seeding} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-primary bg-brand-light border border-brand-primary rounded-xl hover:bg-green-100 transition-colors disabled:opacity-60">
            {seeding ? <Loader className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            {seeding ? "Seeding..." : "Seed Sample Data"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as Tab)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${tab === t.id ? "primary-gradient text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-brand-primary hover:text-brand-primary"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <>
            {/* Dashboard */}
            {tab === "dashboard" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Products", value: products.length, icon: <Package className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
                  { label: "Categories", value: categories.length, icon: <Tags className="w-5 h-5" />, color: "bg-purple-50 text-purple-600" },
                  { label: "Inquiries", value: inquiries.length, icon: <MessageSquare className="w-5 h-5" />, color: "bg-yellow-50 text-yellow-600" },
                  { label: "Orders", value: orders.length, icon: <ShoppingCart className="w-5 h-5" />, color: "bg-green-50 text-green-600" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>{stat.icon}</div>
                    <p className="font-heading font-bold text-3xl text-brand-dark">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Products */}
            {tab === "products" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">{products.length} products</p>
                  <button onClick={() => { setEditProduct(null); setShowProductForm(true); }} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90">
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Price</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                        <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.map((p) => (
                        <tr key={p._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-brand-dark">{p.name}</td>
                          <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{p.category?.name}</td>
                          <td className="px-4 py-3 text-gray-500 hidden md:table-cell">₹{p.price}/{p.unit}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                              {p.inStock ? "In Stock" : "Out"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-1">
                              <button onClick={() => { setEditProduct(p); setProductForm({ name: p.name, description: p.description, price: String(p.price), unit: p.unit, category: p.category?._id || "", benefits: p.benefits?.join("\n") || "", usageGuide: p.usageGuide, safetyInstructions: p.safetyInstructions, featured: p.featured, inStock: p.inStock, images: p.images || [] }); setShowProductForm(true); }} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50"><Pencil className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteProduct(p._id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Categories */}
            {tab === "categories" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">{categories.length} categories</p>
                  <button onClick={() => setShowCatForm(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90">
                    <Plus className="w-4 h-4" /> Add Category
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((c) => (
                    <div key={c._id} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-brand-dark">{c.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{c.description}</p>
                      </div>
                      <button onClick={() => handleDeleteCategory(c._id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inquiries */}
            {tab === "inquiries" && (
              <div className="space-y-3">
                {inquiries.length === 0 && <p className="text-gray-400 text-sm">No inquiries yet.</p>}
                {inquiries.map((inq) => (
                  <div key={inq._id} className="bg-white rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div>
                        <p className="font-semibold text-brand-dark">{inq.name}</p>
                        <p className="text-sm text-gray-500">{inq.email} · {inq.phone}</p>
                        {inq.company && <p className="text-xs text-gray-400">{inq.company}</p>}
                        <p className="text-sm text-gray-600 mt-2">{inq.message}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{inq.type}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${inq.status === "new" ? "bg-yellow-100 text-yellow-700" : inq.status === "read" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{inq.status}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {inq.status !== "read" && <button onClick={() => handleInquiryStatus(inq._id, "read")} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">Mark Read</button>}
                        {inq.status !== "replied" && <button onClick={() => handleInquiryStatus(inq._id, "replied")} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-50 text-green-600 hover:bg-green-100">Mark Replied</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Orders */}
            {tab === "orders" && (
              <div className="space-y-3">
                {orders.length === 0 && <p className="text-gray-400 text-sm">No orders yet.</p>}
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div>
                        <p className="font-semibold text-brand-dark">{order.name}</p>
                        <p className="text-sm text-gray-500">{order.email} · {order.phone}</p>
                        <p className="text-xs text-gray-400 mt-1">{order.address}</p>
                        <div className="mt-2 space-y-1">
                          {order.items.map((item, i) => (
                            <p key={i} className="text-xs text-gray-600">• {item.name} — {item.quantity} {item.unit}</p>
                          ))}
                        </div>
                        <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${order.status === "pending" ? "bg-yellow-100 text-yellow-700" : order.status === "confirmed" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{order.status}</span>
                      </div>
                      <select value={order.status} onChange={(e) => handleOrderStatus(order._id, e.target.value)} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary">
                        {["pending", "confirmed", "processing", "shipped", "completed", "cancelled"].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading font-bold text-lg text-brand-dark">{editProduct?._id ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => { setShowProductForm(false); setEditProduct(null); }} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleProductSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Product Name *</label>
                  <input required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
                  <select required value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary">
                    <option value="">Select</option>
                    {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
                  <input value={productForm.unit} onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })} placeholder="kg, litre, etc" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Price (₹)</label>
                  <input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary" />
                </div>
                <div className="flex gap-3 items-center pt-4">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input type="checkbox" checked={productForm.featured} onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })} className="rounded" /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input type="checkbox" checked={productForm.inStock} onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })} className="rounded" /> In Stock
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description *</label>
                <textarea required value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} rows={3} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Benefits (one per line)</label>
                <textarea value={productForm.benefits} onChange={(e) => setProductForm({ ...productForm, benefits: e.target.value })} rows={3} placeholder="Increases yield&#10;Improves soil..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Usage Guide</label>
                <textarea value={productForm.usageGuide} onChange={(e) => setProductForm({ ...productForm, usageGuide: e.target.value })} rows={2} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Safety Instructions</label>
                <textarea value={productForm.safetyInstructions} onChange={(e) => setProductForm({ ...productForm, safetyInstructions: e.target.value })} rows={2} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary resize-none" />
              </div>
              
              <div className="pt-2">
                <label className="block text-xs font-medium text-gray-600 mb-2">Product Images</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {productForm.images.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl border border-gray-200 overflow-hidden group">
                      <img src={img} alt={`Product ${i}`} className="w-full h-full object-cover" />
                      {i === 0 && <div className="absolute bottom-0 inset-x-0 bg-brand-primary text-white text-[9px] text-center py-0.5">Primary</div>}
                      <button type="button" onClick={() => setProductForm({ ...productForm, images: productForm.images.filter((_, idx) => idx !== i) })} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                      {i !== 0 && (
                        <button type="button" onClick={() => {
                          const newImages = [...productForm.images];
                          const temp = newImages[0];
                          newImages[0] = newImages[i];
                          newImages[i] = temp;
                          setProductForm({ ...productForm, images: newImages });
                        }} className="absolute top-1 left-1 bg-brand-dark/70 text-white text-[9px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Make Primary
                        </button>
                      )}
                    </div>
                  ))}
                  <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-brand-primary hover:text-brand-primary transition-colors">
                    <Plus className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium">Upload</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length === 0) return;
                      Promise.all(files.map(file => new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.readAsDataURL(file);
                      }))).then(base64Images => {
                        setProductForm({ ...productForm, images: [...productForm.images, ...base64Images] });
                      });
                      e.target.value = '';
                    }} />
                  </label>
                </div>
                <p className="text-xs text-gray-400">The first image will be used as the primary display image on the shop card.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowProductForm(false); setEditProduct(null); }} className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {showCatForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading font-bold text-lg text-brand-dark">Add Category</h3>
              <button onClick={() => setShowCatForm(false)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCatSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                <input required value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <input value={catForm.description} onChange={(e) => setCatForm({ ...catForm, description: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowCatForm(false)} className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
