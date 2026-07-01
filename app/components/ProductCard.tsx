'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { useCart, Product } from './CartContext';
import { ProductIcon } from './Icons';
import PlaceholderImage from './PlaceholderImage';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-hover bg-white rounded-2xl shadow-md overflow-hidden border border-cream-dark group"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cream to-cream-dark">
        {product.imageUrl ? (
          <PlaceholderImage
            src={product.imageUrl}
            alt={product.name}
            fill
            className="group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gold">
            <ProductIcon name={product.image} size={56} />
          </div>
        )}
        {product.category && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-navy/80 text-gold-light backdrop-blur-sm">
            {product.category}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-navy mb-2">{product.name}</h3>
        <p className="text-navy/60 mb-4 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold text-gold">
            £{product.price.toFixed(2)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              isAdding
                ? 'bg-green-600 text-white'
                : 'btn-primary text-navy'
            }`}
          >
            {isAdding ? (
              <span className="flex items-center gap-1.5">
                <Check size={16} /> Added
              </span>
            ) : (
              'Add to Cart'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
