import React, { useState, useRef } from 'react';
import Header from './components/Header.jsx';
import ProductCard3D from './components/ProductCard3D.jsx';
import Cart from './components/Cart.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';
import { PRODUCTS } from './constants/products.js';
import { Sparkles, Cpu, Layers } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Synchronous duplicate submission guard
  const isSubmittingRef = useRef(false);

  // Add product to cart
  const handleAddToCart = (product) => {
    setValidationError(''); // Clear validation errors on active cart modification
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (productId, newQuantity) => {
    setValidationError('');
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Customer Name change handler (preserves input)
  const handleCustomerNameChange = (name) => {
    setCustomerName(name);
    if (validationError && name.trim()) {
      setValidationError('');
    }
  };

  // Checkout submission handler with synchronous duplicate-submission guard
  const handleCheckout = () => {
    // 1. Synchronous Guard: immediately blocks rapid duplicate clicks
    if (isSubmittingRef.current) {
      return;
    }

    // 2. Cart empty validation
    if (cartItems.length === 0) {
      setValidationError('Your cart is empty. Please add at least one product.');
      return;
    }

    // 3. Customer name validation (blank/whitespace)
    if (!customerName || !customerName.trim()) {
      setValidationError('Customer name is required to complete checkout.');
      return;
    }

    // Set synchronous guard flag
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setValidationError('');

    // Generate unique order reference (e.g. ORD-NEO-L9X8B2)
    const uniqueSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const timestampPart = Date.now().toString(36).toUpperCase();
    const orderRef = `ORD-NEO-${timestampPart}-${uniqueSuffix}`;

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const completedOrder = {
      orderReference: orderRef,
      customerName: customerName.trim(),
      items: [...cartItems],
      totalAmount,
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
    };

    // Refined transition to confirmation
    setConfirmedOrder(completedOrder);
    setCartItems([]);
    setIsSubmitting(false);
  };

  // Reset to place a new order
  const handleResetOrder = () => {
    isSubmittingRef.current = false;
    setConfirmedOrder(null);
    setCartItems([]);
    setCustomerName('');
    setValidationError('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col neo-bg-ambient selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {confirmedOrder ? (
          <OrderConfirmation order={confirmedOrder} onReset={handleResetOrder} />
        ) : (
          <div className="space-y-10">
            {/* Hero / Section Intro */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next-Gen SDET Benchmark Interface</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Ultra-Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Checkout</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Interact with precision 3D hardware products, tune quantities, and place your order with verified synchronous duplicate-submission immunity.
              </p>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Product Selection Area (7 Columns on Large) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center space-x-2 text-white">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-base font-bold font-mono tracking-wider uppercase">
                      Hardware Catalogue (2 SKUs)
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Interactive 3D Tilt Enabled
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {PRODUCTS.map((product) => {
                    const cartItem = cartItems.find((i) => i.id === product.id);
                    return (
                      <ProductCard3D
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        inCartQuantity={cartItem ? cartItem.quantity : 0}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Shopping Cart & Checkout Manifest (5 Columns on Large) */}
              <div className="lg:col-span-5 sticky top-28">
                <Cart
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  customerName={customerName}
                  onCustomerNameChange={handleCustomerNameChange}
                  validationError={validationError}
                  onCheckout={handleCheckout}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#04060C] py-6 text-center text-xs text-slate-400 font-mono">
        <p>NEO CHECKOUT • Fynd Hiring Hackathon 2026 • High-Reliability SDET Architecture</p>
      </footer>
    </div>
  );
}
