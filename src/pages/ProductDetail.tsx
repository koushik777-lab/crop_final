import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertTriangle, BookOpen, MessageSquare, Phone, PackageCheck, Tag } from "lucide-react";
import api, { Product } from "../lib/api";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    api.get(`/products/${slug}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading product...</p>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="text-center">
        <PackageCheck className="w-16 h-16 text-green-200 mx-auto mb-4" />
        <h2 className="font-heading font-bold text-xl text-brand-dark mb-2">Product Not Found</h2>
        <Link href="/shop" className="text-brand-primary hover:underline text-sm">Back to Shop</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-brand-light rounded-2xl h-72 lg:h-96 flex items-center justify-center overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover rounded-2xl transition-all duration-300" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-brand-secondary">
                  <PackageCheck className="w-20 h-20 opacity-30" />
                  <span className="text-sm text-gray-400">Product Image</span>
                </div>
              )}
            </div>
            
            {/* Thumbnails Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-brand-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-2">
              <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">{product.category?.name}</span>
            </div>
            <h1 className="font-heading font-bold text-3xl text-brand-dark mb-3">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>

            {product.price > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-brand-earth" />
                <span className="font-heading font-bold text-2xl text-brand-earth">₹{product.price}</span>
                <span className="text-gray-400 text-sm">/ {product.unit}</span>
              </div>
            )}

            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6 ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/contact?product=${product.slug}&type=quote`}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white primary-gradient rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote
              </Link>
              <a
                href={`https://wa.me/919000000000?text=I'm interested in ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#25D366] rounded-xl hover:opacity-90 transition-opacity"
              >
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Benefits */}
          {product.benefits?.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-brand-accent" />
                <h3 className="font-heading font-semibold text-brand-dark">Key Benefits</h3>
              </div>
              <ul className="space-y-2">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Usage Guide */}
          {product.usageGuide && (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-semibold text-brand-dark">Usage Guide</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{product.usageGuide}</p>
            </div>
          )}

          {/* Safety */}
          {product.safetyInstructions && (
            <div className="glass-card rounded-2xl p-6 border border-orange-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className="font-heading font-semibold text-brand-dark">Safety Instructions</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{product.safetyInstructions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
