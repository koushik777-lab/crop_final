import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Settings, LogOut, PhoneCall } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg shadow-green-900/10" : ""}`}
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.85)"
          : "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(134,197,107,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/croplogo.png"
              alt="Energic Crop Science Logo"
              className="w-11 h-11 object-contain drop-shadow-md"
            />
            <div>
              <span
                className="font-bold text-brand-dark text-lg leading-none block tracking-tight"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Energic
              </span>
              <span className="text-[10px] text-brand-secondary font-semibold tracking-[0.15em] uppercase leading-none">
                Crop Science
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  location === link.href
                    ? "text-brand-primary"
                    : "text-gray-600 hover:text-brand-primary"
                }`}
              >
                {location === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-brand-light rounded-xl"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-light text-brand-primary text-sm font-semibold hover:bg-green-100 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" /> Admin
                  </Link>
                )}
                <span className="text-sm text-gray-600 font-medium px-2">{user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="tel:+916292007000"
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-brand-primary border border-brand-primary/30 rounded-xl hover:bg-brand-light transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> +91 62920 07000
                </a>
                <Link
                  href="/contact"
                  className="px-5 py-2 text-sm font-bold text-white rounded-xl hover:opacity-90 transition-opacity shadow-md"
                  style={{ background: "linear-gradient(135deg, #3F6B2A 0%, #0FA958 100%)" }}
                >
                  Get Quote
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-brand-light transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-4 pb-4 pt-2 space-y-1"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(134,197,107,0.15)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  location === link.href
                    ? "bg-brand-light text-brand-primary"
                    : "text-gray-600 hover:text-brand-primary hover:bg-brand-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-primary bg-brand-light">
                    Admin Panel
                  </Link>
                )}
                <button onClick={() => { logout(); setOpen(false); }} className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/contact" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-bold text-white text-center primary-gradient">
                Get Quote
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
