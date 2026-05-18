import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Leaf, Droplets, Award, Users, TrendingUp, ArrowRight, CheckCircle, Phone, ChevronRight, Sprout, FlaskConical, Microscope, TreePine } from "lucide-react";
import api, { Product, Category } from "../lib/api";
import ProductCard from "../components/ProductCard";

const cropSolutions = [
  { problem: "Yellow Leaves", cause: "Nitrogen Deficiency", solution: "EnergicN Nitrogen Booster", icon: <Leaf className="w-6 h-6" />, color: "text-green-600 bg-green-50" },
  { problem: "Pest Attack", cause: "Insect Infestation", solution: "CropShield Organic Pesticide", icon: <Shield className="w-6 h-6" />, color: "text-red-600 bg-red-50" },
  { problem: "Slow Growth", cause: "Hormonal Imbalance", solution: "GrowMax Plant Regulator", icon: <TrendingUp className="w-6 h-6" />, color: "text-purple-600 bg-purple-50" },
  { problem: "Weed Overgrowth", cause: "Invasive Weeds", solution: "WeedOut Pro Herbicide", icon: <Sprout className="w-6 h-6" />, color: "text-orange-600 bg-orange-50" },
  { problem: "Poor Soil", cause: "Low Organic Matter", solution: "EarthCare Organic Compost", icon: <TreePine className="w-6 h-6" />, color: "text-amber-700 bg-amber-50" },
  { problem: "Stunted Roots", cause: "Phosphorus Deficiency", solution: "PhosMax NPK 20-20-20", icon: <Microscope className="w-6 h-6" />, color: "text-sky-600 bg-sky-50" },
];

const testimonials = [
  { name: "Ramesh Yadav", role: "Wheat Farmer, Punjab", text: "Energic's NPK fertilizer doubled my wheat yield in one season. Highly recommended for any serious farmer.", rating: 5 },
  { name: "Suresh Patel", role: "Distributor, Gujarat", text: "Best supplier I've worked with. Quality is consistent and delivery is always on time. My customers love these products.", rating: 5 },
  { name: "Meena Devi", role: "Vegetable Grower, UP", text: "The organic pesticide is amazing — no harm to my family, yet it controls pests perfectly.", rating: 5 },
];

const categories = [
  { name: "Fertilizers", slug: "fertilizers", icon: <Sprout className="w-7 h-7" />, color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  { name: "Pesticides", slug: "pesticides", icon: <Shield className="w-7 h-7" />, color: "bg-red-50 text-red-600 border-red-200" },
  { name: "Herbicides", slug: "herbicides", icon: <Leaf className="w-7 h-7" />, color: "bg-orange-50 text-orange-600 border-orange-200" },
  { name: "Growth Regulators", slug: "growth-regulators", icon: <TrendingUp className="w-7 h-7" />, color: "bg-purple-50 text-purple-600 border-purple-200" },
  { name: "Organic Products", slug: "organic-products", icon: <TreePine className="w-7 h-7" />, color: "bg-green-50 text-green-600 border-green-200" },
];

const whyUs = [
  { icon: <FlaskConical className="w-6 h-6" />, title: "Tested Formulations", desc: "Every product undergoes rigorous quality testing before reaching your field." },
  { icon: <Leaf className="w-6 h-6" />, title: "Organic Options", desc: "Wide range of organic and eco-friendly products for sustainable farming." },
  { icon: <Users className="w-6 h-6" />, title: "Wholesale Distribution", desc: "Flexible bulk pricing for distributors and large-scale farmers." },
  { icon: <Microscope className="w-6 h-6" />, title: "R&D Backed", desc: "Formulations backed by agricultural research for maximum crop yield." },
];

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products?featured=true&limit=4")
      .then((res) => setFeatured(res.data?.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-brand-light border border-green-200 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">Trusted by 1000+ Farmers</span>
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-dark leading-tight mb-5">
                Advanced Crop Protection &{" "}
                <span className="text-brand-primary">Growth Solutions</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                High-quality fertilizers, pesticides, and organic solutions designed to maximize crop yield and ensure plant health.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90 transition-opacity shadow-md">
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact?type=distributor" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-brand-primary border-2 border-brand-primary rounded-xl hover:bg-brand-light transition-colors">
                  Become Distributor
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {["Organic Options", "Tested Formulations", "Wholesale Distribution"].map((b) => (
                  <div key={b} className="flex items-center gap-1.5 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-brand-accent" />
                    {b}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero SVG Illustration — Fully Animated */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-80 md:w-96 md:h-96" style={{ isolation: "isolate" }}>

                {/* ── Static base rings ── */}
                <svg viewBox="0 0 320 320" fill="none" className="w-full h-full absolute inset-0">
                  <circle cx="160" cy="160" r="140" fill="#DCFCE7" opacity="0.55" />
                  <circle cx="160" cy="160" r="110" fill="#BBF7D0" opacity="0.45" />
                </svg>

                {/* ── Slowly spinning dashed ring ── */}
                <motion.svg viewBox="0 0 320 320" fill="none" className="absolute inset-0 w-full h-full"
                  animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                  <circle cx="160" cy="160" r="135" stroke="#6FA23A" strokeWidth="1.2" strokeDasharray="6 14" opacity="0.3" />
                </motion.svg>

                {/* ── Counter-spinning inner ring ── */}
                <motion.svg viewBox="0 0 320 320" fill="none" className="absolute inset-0 w-full h-full"
                  animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                  <circle cx="160" cy="160" r="148" stroke="#0FA958" strokeWidth="1" strokeDasharray="3 18" opacity="0.2" />
                </motion.svg>

                {/* ── Shield body ── */}
                <svg viewBox="0 0 320 320" fill="none" className="absolute inset-0 w-full h-full">
                  <path d="M160 60 L230 95 L230 175 Q230 220 160 250 Q90 220 90 175 L90 95 Z" fill="#3F6B2A" opacity="0.1" />
                  <path d="M160 70 L220 102 L220 172 Q220 212 160 240 Q100 212 100 172 L100 102 Z" fill="#3F6B2A" opacity="0.18" />
                  <path d="M160 80 L210 108 L210 170 Q210 205 160 230 Q110 205 110 170 L110 108 Z" fill="#3F6B2A" />
                </svg>

                {/* ── Breathing plant group ── */}
                <motion.svg viewBox="0 0 320 320" fill="none" className="absolute inset-0 w-full h-full"
                  style={{ originX: "160px", originY: "228px" }}
                  animate={{ rotate: [0, 2.5, -2.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  {/* stem */}
                  <line x1="160" y1="228" x2="160" y2="143" stroke="#4D8B2A" strokeWidth="4" strokeLinecap="round" />
                  {/* left leaf */}
                  <ellipse cx="140" cy="172" rx="24" ry="13" fill="#6FA23A" transform="rotate(-30 140 172)" />
                  <line x1="160" y1="178" x2="127" y2="163" stroke="#3F6B2A" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
                  {/* right leaf */}
                  <ellipse cx="180" cy="160" rx="24" ry="13" fill="#0FA958" transform="rotate(30 180 160)" />
                  <line x1="160" y1="166" x2="197" y2="151" stroke="#3F6B2A" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
                  {/* top leaf — slightly bigger breathe */}
                  <ellipse cx="160" cy="142" rx="19" ry="11" fill="#6FA23A" />
                  <line x1="160" y1="143" x2="160" y2="153" stroke="#3F6B2A" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
                </motion.svg>

                {/* ── WIND-BLOWN LEAVES (absolute positioned, truly airborne) ── */}
                {/* Each leaf is a real DOM element with its own transform-origin so it tumbles as it floats */}

                {/* Leaf A — drifts upper-left with tumble */}
                <motion.div
                  className="absolute"
                  style={{ left: "38%", top: "30%", originX: "50%", originY: "50%" }}
                  animate={{
                    x:       [0, -28, -18, -42, -10, 0],
                    y:       [0, -18, -40, -62, -80, -95],
                    rotate:  [0, 40, -20, 60, 10, -30],
                    opacity: [0, 0.9, 1, 0.85, 0.5, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 0 }}
                >
                  <svg width="22" height="12" viewBox="0 0 22 12">
                    <ellipse cx="11" cy="6" rx="11" ry="6" fill="#4ADE80" />
                    <line x1="11" y1="2" x2="11" y2="10" stroke="#166534" strokeWidth="1" opacity="0.5" />
                  </svg>
                </motion.div>

                {/* Leaf B — drifts upper-right with roll */}
                <motion.div
                  className="absolute"
                  style={{ left: "54%", top: "28%", originX: "50%", originY: "50%" }}
                  animate={{
                    x:       [0, 20, 35, 18, 42, 10],
                    y:       [0, -15, -35, -55, -75, -90],
                    rotate:  [10, -50, 30, -70, 20, 80],
                    opacity: [0, 1, 1, 0.8, 0.4, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
                >
                  <svg width="18" height="10" viewBox="0 0 18 10">
                    <ellipse cx="9" cy="5" rx="9" ry="5" fill="#22C55E" />
                    <line x1="9" y1="1" x2="9" y2="9" stroke="#14532D" strokeWidth="1" opacity="0.5" />
                  </svg>
                </motion.div>

                {/* Leaf C — tiny, fast, curls right */}
                <motion.div
                  className="absolute"
                  style={{ left: "26%", top: "42%", originX: "50%", originY: "50%" }}
                  animate={{
                    x:       [0, -15, -30, -10, -38],
                    y:       [0, -20, -50, -72, -100],
                    rotate:  [0, 60, 120, 180, 270],
                    opacity: [0, 0.7, 1, 0.6, 0],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <svg width="14" height="8" viewBox="0 0 14 8">
                    <ellipse cx="7" cy="4" rx="7" ry="4" fill="#86EFAC" />
                    <line x1="7" y1="1" x2="7" y2="7" stroke="#166534" strokeWidth="0.8" opacity="0.5" />
                  </svg>
                </motion.div>

                {/* Leaf D — right side, lazy spiral */}
                <motion.div
                  className="absolute"
                  style={{ left: "64%", top: "38%", originX: "50%", originY: "50%" }}
                  animate={{
                    x:       [0, 22, 12, 32, 5, 25],
                    y:       [0, -12, -32, -54, -72, -88],
                    rotate:  [-20, 30, -60, 40, -90, 20],
                    opacity: [0, 0.8, 1, 0.9, 0.5, 0],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                >
                  <svg width="20" height="10" viewBox="0 0 20 10">
                    <ellipse cx="10" cy="5" rx="10" ry="5" fill="#16A34A" />
                    <line x1="10" y1="1" x2="10" y2="9" stroke="#052e16" strokeWidth="1" opacity="0.45" />
                  </svg>
                </motion.div>

                {/* Leaf E — medium size, upper-center tumble */}
                <motion.div
                  className="absolute"
                  style={{ left: "44%", top: "20%", originX: "50%", originY: "50%" }}
                  animate={{
                    x:       [0, 10, -8, 15, 0],
                    y:       [0, -20, -45, -70, -95],
                    rotate:  [0, -45, 90, -135, -200],
                    opacity: [0, 1, 1, 0.6, 0],
                  }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeOut", delay: 3.5 }}
                >
                  <svg width="16" height="9" viewBox="0 0 16 9">
                    <ellipse cx="8" cy="4.5" rx="8" ry="4.5" fill="#4ADE80" />
                    <line x1="8" y1="1" x2="8" y2="8" stroke="#166534" strokeWidth="0.9" opacity="0.5" />
                  </svg>
                </motion.div>

                {/* ── Pulsing glow dots ── */}
                {[
                  { x: "22%", y: "60%", size: 8, color: "#0FA958", delay: 0 },
                  { x: "74%", y: "62%", size: 6, color: "#6FA23A", delay: 0.9 },
                  { x: "18%", y: "46%", size: 5, color: "#22C55E", delay: 1.8 },
                  { x: "78%", y: "40%", size: 5, color: "#0FA958", delay: 2.7 },
                ].map((d, i) => (
                  <motion.div key={i}
                    className="absolute rounded-full"
                    style={{ left: d.x, top: d.y, width: d.size, height: d.size, background: d.color }}
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
                  />
                ))}

                {/* ── Twinkling sparkles ── */}
                {[
                  { x: "34%", y: "22%", size: 5 },
                  { x: "60%", y: "20%", size: 4 },
                  { x: "20%", y: "52%", size: 3.5 },
                  { x: "75%", y: "30%", size: 4 },
                ].map((s, i) => (
                  <motion.div key={i}
                    className="absolute rounded-full bg-green-400"
                    style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
                    animate={{ opacity: [0.1, 1, 0.1], scale: [0.5, 1.4, 0.5] }}
                    transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
                  />
                ))}

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-brand-dark mb-3">Product Categories</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything your crops need, from nutrition to protection.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/shop?category=${cat.slug}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all ${cat.color}`}
                >
                  {cat.icon}
                  <span className="font-heading font-semibold text-sm text-center">{cat.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading font-bold text-3xl text-brand-dark mb-2">Featured Products</h2>
              <p className="text-gray-500">Our best-selling agricultural solutions</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : (featured || []).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(featured || []).map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <Leaf className="w-16 h-16 text-brand-light mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No products yet.</p>
              <button
                onClick={() => api.post("/seed").then(() => window.location.reload())}
                className="px-6 py-2.5 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90"
              >
                Load Sample Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-brand-dark mb-3">Why Choose Energic?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We combine science with agriculture to deliver solutions that truly work.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <motion.div key={item.title} whileHover={{ y: -4 }} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-2xl primary-gradient flex items-center justify-center mx-auto mb-4 text-white shadow-md">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Crop Solution Finder */}
      <section className="py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-brand-dark mb-3">Crop Solution Finder</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Identify your crop problem and we'll recommend the right product.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {cropSolutions.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03, y: -3 }}
                onClick={() => setSelectedProblem(selectedProblem === i ? null : i)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedProblem === i ? "border-brand-primary bg-brand-light shadow-md" : "border-transparent bg-white hover:border-brand-secondary hover:shadow-sm"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
                  {item.icon}
                </div>
                <p className="font-heading font-semibold text-sm text-brand-dark">{item.problem}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.cause}</p>
              </motion.button>
            ))}
          </div>
          {selectedProblem !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-brand-secondary flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Recommended Solution for <strong>{cropSolutions[selectedProblem].problem}</strong>:</p>
                <p className="font-heading font-bold text-xl text-brand-primary">{cropSolutions[selectedProblem].solution}</p>
              </div>
              <Link href="/shop" className="px-5 py-2.5 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90 transition-opacity">
                Find This Product
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-brand-dark mb-3">What Farmers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-heading font-semibold text-brand-dark text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributor CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a3a0f 0%, #2d5a1b 50%, #0FA958 100%)" }}>
        {/* Decorative SVG crop elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large leaf top-left */}
          <motion.svg
            animate={{ rotate: [0, 8, 0], y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 w-64 h-64 opacity-10"
            viewBox="0 0 200 200"
          >
            <path d="M100 180 Q20 120 30 40 Q80 10 160 60 Q180 130 100 180Z" fill="#6FA23A" />
            <line x1="100" y1="180" x2="95" y2="40" stroke="white" strokeWidth="2" opacity="0.5" />
            <line x1="95" y1="80" x2="50" y2="60" stroke="white" strokeWidth="1.5" opacity="0.4" />
            <line x1="95" y1="100" x2="140" y2="80" stroke="white" strokeWidth="1.5" opacity="0.4" />
            <line x1="95" y1="120" x2="55" y2="105" stroke="white" strokeWidth="1.5" opacity="0.4" />
            <line x1="95" y1="140" x2="135" y2="125" stroke="white" strokeWidth="1.5" opacity="0.4" />
          </motion.svg>

          {/* Wheat stalks right */}
          <motion.svg
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -right-8 w-56 h-56 opacity-10"
            viewBox="0 0 200 250"
          >
            <line x1="100" y1="240" x2="100" y2="20" stroke="white" strokeWidth="3" strokeLinecap="round" />
            {[40, 60, 80, 100, 120, 140].map((y, i) => (
              <ellipse key={i} cx={i % 2 === 0 ? 75 : 125} cy={y} rx="20" ry="9" fill="white" transform={`rotate(${i % 2 === 0 ? -30 : 30} ${i % 2 === 0 ? 75 : 125} ${y})`} />
            ))}
          </motion.svg>

          {/* Floating circles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
              className="absolute rounded-full border border-white/20"
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              <span className="text-xs font-bold text-green-200 uppercase tracking-widest">Pan India Distribution Network</span>
            </div>

            <h2 className="font-bold text-4xl md:text-5xl text-white mb-4 leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Become an Authorized
              <span className="block text-green-300">Distributor</span>
            </h2>
            <p className="text-green-100/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join our growing network across India. Get exclusive pricing, marketing support, and priority supply.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact?type=distributor"
                className="group px-8 py-4 bg-white text-brand-primary text-sm font-bold rounded-2xl hover:bg-green-50 transition-all shadow-xl shadow-black/20 flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+916292007000"
                className="px-8 py-4 border-2 border-white/30 text-white text-sm font-bold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> +91 62920 07000
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
