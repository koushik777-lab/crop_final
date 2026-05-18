import { Link } from "wouter";
import { motion } from "framer-motion";
import { Tag, PackageCheck, MessageSquare } from "lucide-react";
import type { Product } from "../lib/api";

interface Props {
  product: Product;
}

const categoryColors: Record<string, string> = {
  fertilizers: "bg-yellow-100 text-yellow-700",
  pesticides: "bg-red-100 text-red-700",
  herbicides: "bg-orange-100 text-orange-700",
  "growth-regulators": "bg-purple-100 text-purple-700",
  "organic-products": "bg-green-100 text-green-700",
};

export default function ProductCard({ product }: Props) {
  const catSlug = product.category?.slug || "";
  const colorClass = categoryColors[catSlug] || "bg-brand-light text-brand-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl overflow-hidden card-hover flex flex-col"
    >
      {/* Image / Placeholder */}
      <div className="relative bg-brand-light h-44 flex items-center justify-center overflow-hidden">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-brand-secondary">
            <PackageCheck className="w-12 h-12 opacity-40" />
            <span className="text-xs font-medium opacity-50">No Image</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-brand-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            Featured
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-700 text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-brand-dark text-sm leading-snug">{product.name}</h3>
          <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
            {product.category?.name || "General"}
          </span>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed flex-1">
          {product.description}
        </p>

        {product.price > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <Tag className="w-3.5 h-3.5 text-brand-earth" />
            <span className="text-sm font-semibold text-brand-earth">₹{product.price}/{product.unit}</span>
          </div>
        )}

        <div className="flex gap-2 mt-auto">
          <Link
            href={`/product/${product.slug}`}
            className="flex-1 text-center py-2 text-xs font-semibold text-brand-primary border border-brand-primary rounded-lg hover:bg-brand-light transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/contact?product=${product.slug}&type=quote`}
            className="flex-1 text-center py-2 text-xs font-semibold text-white primary-gradient rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
          >
            <MessageSquare className="w-3 h-3" /> Get Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
