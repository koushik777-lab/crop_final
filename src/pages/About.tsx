import { motion } from "framer-motion";
import { Leaf, Users, Award, TrendingUp, MapPin, Factory, FlaskConical, Handshake, Lightbulb } from "lucide-react";

const stats = [
  { icon: <Users className="w-6 h-6" />, value: "1000+", label: "Farmers Served" },
  { icon: <Award className="w-6 h-6" />, value: "50+", label: "Products" },
  { icon: <TrendingUp className="w-6 h-6" />, value: "10+", label: "Years Experience" },
  { icon: <MapPin className="w-6 h-6" />, value: "15+", label: "States Covered" },
];

const values = [
  { title: "Quality First", desc: "Every batch is tested in our laboratory to ensure consistency, purity, and effectiveness before dispatch.", icon: <FlaskConical className="w-7 h-7" /> },
  { title: "Sustainable Agriculture", desc: "We develop products that protect crops while preserving soil health and environmental balance.", icon: <Leaf className="w-7 h-7" /> },
  { title: "Farmer Partnership", desc: "We work directly with farmers to understand real field challenges and develop solutions that work.", icon: <Handshake className="w-7 h-7" /> },
  { title: "Innovation", desc: "Our R&D team continuously develops new formulations to address emerging agricultural challenges.", icon: <Lightbulb className="w-7 h-7" /> },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-light border border-green-200 rounded-full px-4 py-1.5 mb-4">
              <Factory className="w-3.5 h-3.5 text-brand-primary" />
              <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">About Us</span>
            </div>
            <h1 className="font-heading font-bold text-4xl text-brand-dark mb-4">
              Rooted in Agriculture,<br />
              <span className="text-brand-primary">Driven by Science</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Energic Crop Science is a Kolkata-based manufacturer and distributor providing advanced agricultural solutions including fertilizers, pesticides, herbicides, and plant growth regulators to farmers and distributors across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl primary-gradient flex items-center justify-center mx-auto mb-3 text-white">
                  {s.icon}
                </div>
                <p className="font-heading font-bold text-3xl text-brand-primary mb-1">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading font-bold text-3xl text-brand-dark mb-5">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in Kolkata, West Bengal, Energic Crop Science began with a simple mission: to provide Indian farmers with access to high-quality, affordable, and scientifically validated agricultural inputs.
                </p>
                <p>
                  Located at 117B, Near Phoolbagan Kali Mandir, Beliaghata, our manufacturing facility produces a comprehensive range of fertilizers, pesticides, herbicides, and plant growth regulators that meet international quality standards.
                </p>
                <p>
                  Today, we serve thousands of farmers across multiple states, maintaining strong partnerships with agricultural distributors, cooperatives, and farming communities throughout India.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 p-4 bg-white rounded-xl border border-green-200">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                <p className="text-sm text-gray-600">117B, Near Phoolbagan Kali Mandir, Hem Chandra Naskar Road, Beliaghata, Kolkata - 700010</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl primary-gradient flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-brand-dark">Energic Crop Science</p>
                    <p className="text-xs text-brand-secondary">Manufacturer & Distributor</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Fertilizers & Nutrients", "Crop Protection", "Herbicides & Weed Control", "Plant Growth Regulators", "Organic & Bio Products"].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-brand-bg rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-brand-accent" />
                      <span className="text-sm text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-brand-dark mb-3">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center relative overflow-hidden"
              >
                {/* Agriculture leaf SVG watermark */}
                <svg className="absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.07] pointer-events-none" viewBox="0 0 100 100" fill="none">
                  <path d="M50 90 Q10 60 15 20 Q50 0 85 20 Q90 60 50 90Z" fill="#3F6B2A" />
                  <line x1="50" y1="90" x2="48" y2="18" stroke="#3F6B2A" strokeWidth="2" />
                  <line x1="48" y1="40" x2="25" y2="28" stroke="#3F6B2A" strokeWidth="1.5" />
                  <line x1="48" y1="55" x2="72" y2="42" stroke="#3F6B2A" strokeWidth="1.5" />
                  <line x1="48" y1="68" x2="28" y2="58" stroke="#3F6B2A" strokeWidth="1.5" />
                </svg>
                {/* Decorative wheat sprig SVG top-left */}
                <svg className="absolute top-2 left-2 w-10 h-10 opacity-[0.06] pointer-events-none" viewBox="0 0 40 50" fill="none">
                  <line x1="20" y1="48" x2="20" y2="4" stroke="#4D8B2A" strokeWidth="2" strokeLinecap="round" />
                  {[10, 18, 26, 34].map((y, j) => (
                    <ellipse key={j} cx={j % 2 === 0 ? 12 : 28} cy={y} rx="7" ry="3.5"
                      fill="#4D8B2A"
                      transform={`rotate(${j % 2 === 0 ? -25 : 25} ${j % 2 === 0 ? 12 : 28} ${y})`}
                    />
                  ))}
                </svg>
                <div className="w-14 h-14 rounded-2xl primary-gradient flex items-center justify-center mx-auto mb-4 text-white shadow-md relative z-10">
                  {v.icon}
                </div>
                <h3 className="font-heading font-semibold text-brand-dark mb-2 relative z-10">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed relative z-10">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
