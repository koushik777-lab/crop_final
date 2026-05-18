import { Link } from "wouter";
import { MapPin, Phone, Mail, FileText } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 relative overflow-hidden">
      {/* Decorative crop SVG bg */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <path d="M0 200 Q200 100 400 200 T800 200" stroke="#6FA23A" strokeWidth="2" fill="none" />
          <path d="M0 250 Q200 150 400 250 T800 250" stroke="#0FA958" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="180" r="40" stroke="#6FA23A" strokeWidth="1" fill="none" />
          <circle cx="700" cy="220" r="60" stroke="#0FA958" strokeWidth="1" fill="none" />
          <path d="M350 50 L370 150 M355 80 Q320 90 310 120 M365 80 Q400 90 410 120" stroke="#6FA23A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M650 100 L660 180 M652 130 Q630 138 625 160 M658 130 Q680 138 685 160" stroke="#0FA958" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-brand-primary/30 blur-sm" />
                <img
                  src="/croplogo.png"
                  alt="Energic Crop Science"
                  className="relative w-11 h-11 rounded-2xl object-cover shadow-lg"
                />
              </div>
              <div>
                <span
                  className="font-bold text-white text-lg leading-none block"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Energic
                </span>
                <span className="text-[10px] text-green-400 font-semibold tracking-[0.15em] uppercase leading-none">
                  Crop Science
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Manufacturer & Distributor of advanced agricultural solutions — fertilizers, pesticides, herbicides & plant growth regulators.
            </p>
            <div className="flex gap-2">
              <a href="https://wa.me/916292007000" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all">
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/energiccropscience/" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/energiccropscience/" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-all">
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 tracking-wide text-sm uppercase">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[["Home", "/"], ["Shop", "/shop"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-green-500 inline-block" />{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white mb-4 tracking-wide text-sm uppercase">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {["Fertilizers", "Pesticides", "Herbicides", "Growth Regulators", "Organic Products"].map((cat) => (
                <li key={cat}>
                  <Link href={`/shop?category=${cat.toLowerCase().replace(/ /g, "-")}`} className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-green-500 inline-block" />{cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 tracking-wide text-sm uppercase">Contact Us</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-400 leading-relaxed">P-186, Suren Sarkar Road, Beleghata, Kolkata - 700010</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+916292007000" className="text-gray-400 hover:text-green-400 transition-colors">+91 62920 07000</a>
                  <a href="tel:+916292008000" className="text-gray-400 hover:text-green-400 transition-colors">+91 62920 08000</a>
                  <a href="tel:+916292009000" className="text-gray-400 hover:text-green-400 transition-colors">+91 62920 09000</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:energiccropscience@gmail.com" className="text-gray-400 hover:text-green-400 transition-colors break-all">energiccropscience@gmail.com</a>
                </div>
              </li>
              <li className="flex gap-3">
                <FileText className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-xs">GSTIN: 19AAKFE1548D1ZI</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Energic Crop Science. All rights reserved.</p>
          <p>Manufacturer & Distributor | Beleghata, Kolkata, West Bengal</p>
        </div>
      </div>
    </footer>
  );
}
