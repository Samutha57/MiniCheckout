import React, { useState, useRef } from 'react';
import Header from './components/Header.jsx';
import ProductCard3D from './components/ProductCard3D.jsx';
import Cart from './components/Cart.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';
import { PRODUCTS } from './constants/products.js';

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
    setValidationError('');
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

    // Generate unique order reference
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
    <div className="min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between neo-bg-ambient selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <Header />

      <main className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-2.5">
        {confirmedOrder ? (
          <OrderConfirmation order={confirmedOrder} onReset={handleResetOrder} />
        ) : (
          <div className="space-y-2 sm:space-y-3 lg:space-y-3">
            {/* Main Page Title: Shopping Made Simple */}
            <div className="text-center max-w-xl mx-auto space-y-0.5">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Shopping Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Simple</span>
              </h1>
              <p className="text-slate-400 text-xs">
                Select your products, adjust quantities, and complete your order with ease.
              </p>
            </div>

            {/* Main Grid: Products on Left/Center, Cart on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
              {/* Products Area */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-1.5">
                <div className="flex items-center justify-between pb-0.5">
                  <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider uppercase text-white">
                    Our Products
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 flex-1 items-stretch">
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

              {/* Shopping Cart */}
              <div className="lg:col-span-5 flex flex-col justify-between">
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
      <footer className="border-t border-slate-900 bg-[#04060C] py-2 text-center text-[11px] text-slate-500 font-mono flex-shrink-0">
        <p>NEO CHECKOUT • Fynd Hiring Hackathon 2026</p>
      </footer>
    </div>
  );
}
