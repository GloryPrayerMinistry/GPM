'use client';

import { motion } from 'framer-motion';
import { useCart, Product } from '../components/CartContext';
import { useState, useEffect } from 'react';
import { ProductIcon } from '../components/Icons';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';

const categories = [
  'All',
  'Books & Devotionals',
  'Apparel',
  'Prayer Resources',
  'Gifts',
];

export default function Shop() {
  const { cart, getTotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-20 bg-cream-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeading
          title="Shop with Purpose"
          subtitle="Every purchase helps support the mission and outreach of Glory Prayer Ministry."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-navy text-gold-light shadow-md'
                  : 'bg-white text-navy/70 hover:bg-navy/5 border border-cream-dark'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="fixed bottom-8 right-8 z-40">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(!showCart)}
            className="text-navy px-6 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2 btn-primary"
          >
            <ShoppingCart size={20} />
            Cart ({cart.length})
          </motion.button>
        </div>

        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowCart(false)}
            />
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-navy">Shopping Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-1.5 rounded-lg text-navy/50 hover:text-navy hover:bg-cream transition-colors"
                    aria-label="Close cart"
                  >
                    <X size={22} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-navy/50 text-center py-12">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-cream/50 rounded-xl border border-cream-dark"
                        >
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-cream text-gold">
                            <ProductIcon name={item.image} size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-navy truncate">{item.name}</h3>
                            <p className="text-sm text-navy/60">
                              £{item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-cream hover:bg-cream-dark flex items-center justify-center text-navy"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-cream hover:bg-cream-dark flex items-center justify-center text-navy"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 rounded text-navy/40 hover:text-burgundy hover:bg-red-50 transition-colors"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-cream-dark pt-4 mb-4">
                      <div className="flex justify-between text-xl font-bold mb-4 text-navy">
                        <span>Total:</span>
                        <span className="text-gold">£{getTotal().toFixed(2)}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl font-semibold btn-primary mb-2"
                        onClick={() => {
                          // TODO: Integrate checkout/payment here (e.g. Stripe Checkout)
                          console.log('Proceed to checkout');
                        }}
                      >
                        Proceed to Checkout
                      </motion.button>
                      <button
                        onClick={clearCart}
                        className="w-full text-navy/50 hover:text-navy py-2 text-sm"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}

        {loading ? (
          <p className="text-center text-navy/50 py-16">Loading products…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-navy/50 py-12">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
