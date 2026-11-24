import React from 'react';
import { CheckCircle2, Copy, ArrowLeft, Calendar, Check } from 'lucide-react';

export default function OrderConfirmation({ order, onReset }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (order?.orderReference) {
      navigator.clipboard?.writeText(order.orderReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      data-testid="order-confirmation"
      className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8 glass-panel-glow shadow-neo-card text-center relative overflow-hidden my-4"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Success Badge */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          data-testid="confirmation-icon"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_24px_rgba(0,242,254,0.3)] mb-3"
        >
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Order Confirmed!
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md">
          Thank you, <strong data-testid="confirmed-customer-name" className="text-cyan-300 font-semibold">{order.customerName}</strong>. Your order has been placed successfully.
        </p>

        {/* Order Reference Card */}
        <div className="w-full max-w-sm my-4 p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 shadow-inner flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
              Order Reference
            </span>
            <span
              data-testid="order-reference"
              className="text-base sm:text-lg font-mono font-bold text-cyan-400 tracking-wider"
            >
              {order.orderReference}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            title="Copy Order Reference"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Summary Details */}
      <div className="relative z-10 text-left rounded-xl bg-slate-900/60 border border-slate-800/90 p-4 sm:p-5 mb-5">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-2.5 border-b border-slate-800 flex items-center justify-between">
          <span>Order Summary</span>
          <span className="text-cyan-400 font-bold">{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</span>
        </h4>

        <div data-testid="confirmed-items-list" className="py-2.5 space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-xs sm:text-sm py-0.5">
              <div className="flex items-center space-x-2">
                <span className="text-slate-300 font-medium">{item.name}</span>
                <span className="text-xs font-mono text-slate-400">× {item.quantity}</span>
              </div>
              <span className="font-mono font-semibold text-slate-200">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-slate-300">Total Paid</span>
          <span
            data-testid="confirmed-order-total"
            className="text-lg sm:text-xl font-mono font-black text-cyan-300"
          >
            ₹{order.totalAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Meta Specs Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-3 text-left mb-6">
        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-0.5 font-mono">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Date</span>
          </div>
          <span className="text-xs font-mono font-medium text-slate-200">
            {order.timestamp}
          </span>
        </div>
        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
          <div className="text-slate-400 text-xs mb-0.5 font-mono">
            Status
          </div>
          <span className="text-xs font-mono font-medium text-emerald-300">
            Confirmed
          </span>
        </div>
      </div>

      {/* Action to Start New Order */}
      <div className="relative z-10 flex justify-center">
        <button
          type="button"
          data-testid="new-order-button"
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-semibold text-xs sm:text-sm hover:bg-cyan-950/40 hover:border-cyan-400/60 hover:shadow-[0_0_18px_rgba(0,242,254,0.2)] transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Place Another Order</span>
        </button>
      </div>
    </div>
  );
}
