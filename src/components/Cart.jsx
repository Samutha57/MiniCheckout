import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, User, ShoppingBag, AlertCircle, Shield } from 'lucide-react';

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  customerName,
  onCustomerNameChange,
  validationError,
  onCheckout,
  isSubmitting,
}) {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="rounded-3xl p-6 sm:p-8 glass-panel-glow flex flex-col justify-between shadow-2xl relative">
      <div>
        {/* Cart Header */}
        <div className="flex items-center justify-between pb-5 border-b border-cyan-500/15">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Hardware Manifest
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {totalUnits} {totalUnits === 1 ? 'unit' : 'units'} selected
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            SECURE CART
          </span>
        </div>

        {/* Cart Items List */}
        <div className="py-5 space-y-3.5 min-h-[160px]">
          {cartItems.length === 0 ? (
            <div
              data-testid="empty-cart-message"
              className="flex flex-col items-center justify-center py-10 px-4 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/40"
            >
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 mb-3 border border-slate-800">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-300">Your cart is empty</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Select from our high-performance hardware catalogue to proceed with checkout.
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              const lineTotal = item.price * item.quantity;
              return (
                <div
                  key={item.id}
                  data-testid={`cart-item-${item.numericId}`}
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all duration-200"
                >
                  {/* Item Info */}
                  <div className="flex items-center space-x-3.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border font-mono text-xs font-bold"
                      style={{
                        backgroundColor: `${item.accentColor}15`,
                        borderColor: `${item.accentColor}40`,
                        color: item.accentColor
                      }}
                    >
                      {item.numericId === 1 ? 'WM' : 'MK'}
                    </div>
                    <div>
                      <h4
                        data-testid={`cart-item-name-${item.numericId}`}
                        className="text-sm font-semibold text-white tracking-tight"
                      >
                        {item.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-400">
                        {item.formattedPrice} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls & Line Total */}
                  <div className="flex items-center space-x-3 sm:space-x-5">
                    {/* Stepper */}
                    <div className="flex items-center space-x-1.5 bg-slate-950/80 rounded-xl p-1 border border-slate-800">
                      <button
                        type="button"
                        data-testid={`quantity-decrease-${item.numericId}`}
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span
                        data-testid={`cart-item-quantity-${item.numericId}`}
                        className="w-6 text-center font-mono font-bold text-sm text-white"
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        data-testid={`quantity-increase-${item.numericId}`}
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-right min-w-[70px]">
                      <span
                        data-testid={`line-total-${item.numericId}`}
                        className="font-mono font-bold text-sm text-cyan-300"
                      >
                        ₹{lineTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Remove Action */}
                    <button
                      type="button"
                      data-testid={`remove-item-${item.numericId}`}
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Customer Information Form */}
        <div className="pt-4 border-t border-slate-800/90 space-y-3">
          <label
            htmlFor="customer-name"
            className="block text-xs font-semibold tracking-wide uppercase text-slate-300 flex items-center space-x-1.5"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Customer Name <span className="text-rose-400">*</span></span>
          </label>
          <div className="relative">
            <input
              id="customer-name"
              name="customerName"
              type="text"
              autoComplete="name"
              data-testid="customer-name-input"
              aria-label="Customer Name"
              placeholder="Enter full name for order dispatch..."
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-medium"
            />
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div
              data-testid="validation-error"
              role="alert"
              className="flex items-center space-x-2.5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-medium animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{validationError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Cart Footer & Totals */}
      <div className="pt-6 mt-6 border-t border-cyan-500/15 space-y-4">
        {/* Order Grand Total */}
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">
              Total Payable Amount
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Includes all hackathon standard pricing
            </span>
          </div>
          <div className="text-right">
            <span
              data-testid="order-total"
              className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200"
            >
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Primary Checkout Button */}
        <button
          type="button"
          data-testid="checkout-button"
          aria-label="Complete Checkout"
          disabled={isSubmitting}
          onClick={onCheckout}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
            isSubmitting
              ? 'opacity-60 cursor-not-allowed bg-slate-800 text-slate-400'
              : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:via-sky-400 hover:to-blue-500 hover:shadow-[0_0_30px_rgba(0,242,254,0.45)] active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              <span>Processing Transaction...</span>
            </>
          ) : (
            <>
              <span className="text-slate-950 font-extrabold uppercase">Complete Checkout</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </>
          )}
        </button>

        {/* Trust Footnote */}
        <div className="flex items-center justify-center space-x-1.5 text-[11px] font-mono text-slate-400">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Synchronous Submission Guard Active • Single Confirmation Guaranteed</span>
        </div>
      </div>
    </div>
  );
}
