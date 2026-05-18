import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle, Leaf } from "lucide-react";
import api from "../lib/api";

const INQUIRY_TYPES = [
  { value: "general", label: "General Inquiry" },
  { value: "quote", label: "Request Quote" },
  { value: "distributor", label: "Distributor Application" },
];

export default function Contact() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const defaultType = params.get("type") || "general";
  const defaultProduct = params.get("product") || "";

  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    message: "", type: defaultType,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (defaultType) {
      setForm(prev => ({ ...prev, type: defaultType }));
    }
  }, [defaultType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/inquiries", { ...form, product: defaultProduct || undefined });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <div className="hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl text-brand-dark mb-3">Get In Touch</h1>
          <p className="text-gray-600 text-lg max-w-xl">Have a question? Want to become a distributor? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-brand-dark mb-1">Address</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">P-186, Suren Sarkar Road, Beleghata, Kolkata - 700010</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-brand-dark mb-1">Phone</h3>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+916292007000" className="text-sm text-brand-primary hover:underline">+91 62920 07000</a>
                    <a href="tel:+916292008000" className="text-sm text-brand-primary hover:underline">+91 62920 08000</a>
                    <a href="tel:+916292009000" className="text-sm text-brand-primary hover:underline">+91 62920 09000</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-brand-dark mb-1">Email</h3>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:energiccropscience@gmail.com" className="text-sm text-brand-primary hover:underline">energiccropscience@gmail.com</a>
                    <a href="mailto:energiccropscience56@gmail.com" className="text-sm text-brand-primary hover:underline">energiccropscience56@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/916292007000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md"
            >
              <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
            </a>

            <div className="rounded-2xl overflow-hidden h-48 bg-brand-light border border-green-200 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs font-medium">P-186, Suren Sarkar Road</p>
                <p className="text-xs">Beleghata, Kolkata - 700010</p>
                <p className="text-xs mt-1 text-brand-primary font-semibold">GSTIN: 19AAKFE1548D1ZI</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-8">
              {success ? (
                <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="text-center py-12 px-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-100 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 primary-gradient" />
                  {/* Decorative background SVGs */}
                  <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
                    <Leaf className="w-40 h-40 text-brand-primary" />
                  </div>
                  
                  <motion.div 
                    initial={{ rotate: -20, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-green-400/20"
                  >
                    <CheckCircle className="w-10 h-10 text-brand-accent" />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-heading font-bold text-2xl text-brand-dark mb-3"
                  >
                    Message Sent Successfully!
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed"
                  >
                    Thank you for reaching out to <span className="font-bold text-brand-primary">Energic Crop Science</span>. Our team will review your inquiry and get back to you within 24 hours.
                  </motion.p>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSuccess(false); setForm({ name: "", email: "", phone: "", company: "", message: "", type: "general" }); }} 
                    className="px-8 py-3 text-sm font-semibold text-white primary-gradient rounded-2xl hover:opacity-90 shadow-lg shadow-green-200 transition-all"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-heading font-bold text-xl text-brand-dark mb-6">Send us a Message</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Inquiry Type</label>
                    <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-2.5 text-sm bg-white border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary">
                      {INQUIRY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input required type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ramesh Yadav" className="w-full px-4 py-2.5 text-sm bg-white border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                      <input required type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full px-4 py-2.5 text-sm bg-white border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                      <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-2.5 text-sm bg-white border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company / Farm Name</label>
                      <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Your company (optional)" className="w-full px-4 py-2.5 text-sm bg-white border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea required name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your requirements, crop type, acreage, or any specific product you're interested in..." className="w-full px-4 py-2.5 text-sm bg-white border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary resize-none" />
                  </div>

                  {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}

                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity shadow-md">
                    {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
