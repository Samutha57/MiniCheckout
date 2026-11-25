import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

export default function ProductCard3D({ product, onAddToCart, inCartQuantity = 0 }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = -((y - centerY) / centerY) * 10;

    setTilt({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleAdd = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 450);
  };

  const transformStyle = prefersReducedMotion
    ? {}
    : {
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
      };

  return (
    <div
      ref={cardRef}
      data-testid={`product-card-${product.numericId}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className="relative group rounded-2xl p-4 sm:p-4.5 glass-panel hover:border-cyan-400/40 transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-neo-card h-full"
    >
      {/* Glare Dynamic Overlay */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
          }}
        />
      )}

      {/* Ambient Corner Glow */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 opacity-40 group-hover:opacity-75"
        style={{ backgroundColor: product.accentColor }}
      />

      {/* Top Meta */}
      <div className="relative z-10 flex items-center justify-between mb-1">
        <span className="text-[13px] font-mono tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300">
          {product.category}
        </span>
      </div>

      {/* Product 3D Imagery */}
      <div className="relative z-10 py-1 flex items-center justify-center my-0.5">
        <div
          className="w-full h-24 sm:h-28 lg:h-30 flex items-center justify-center transition-transform duration-300"
          style={{
            transform: isHovered && !prefersReducedMotion ? 'translateZ(35px) scale(1.05)' : 'translateZ(0px)'
          }}
        >
          {product.svgType === 'mouse' ? (
            <svg
              className="w-24 sm:w-28 lg:w-30 h-24 sm:h-28 lg:h-30 drop-shadow-[0_8px_18px_rgba(0,242,254,0.35)]"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mouseBody" x1="50" y1="20" x2="150" y2="180" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E293B" />
                  <stop offset="0.5" stopColor="#0F172A" />
                  <stop offset="1" stopColor="#020617" />
                </linearGradient>
                <linearGradient id="cyanStripe" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00F2FE" />
                  <stop offset="1" stopColor="#0284C7" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <ellipse cx="100" cy="105" rx="52" ry="72" fill="url(#mouseBody)" stroke="#38BDF8" strokeWidth="2.5" />
              <path d="M70 45 C75 35, 125 35, 130 45 L125 155 C120 165, 80 165, 75 155 Z" fill="#090E1A" opacity="0.6" />
              <path d="M62 90 C58 130, 80 165, 100 170 C120 165, 142 130, 138 90" stroke="url(#cyanStripe)" strokeWidth="3" filter="url(#glow)" fill="none" />
              <line x1="100" y1="35" x2="100" y2="85" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
              <rect x="94" y="50" width="12" height="28" rx="6" fill="#00F2FE" filter="url(#glow)" />
              <line x1="94" y1="60" x2="106" y2="60" stroke="#020617" strokeWidth="1.5" />
              <line x1="94" y1="68" x2="106" y2="68" stroke="#020617" strokeWidth="1.5" />
              <rect x="96" y="88" width="8" height="10" rx="2" fill="#38BDF8" opacity="0.8" />
              <path d="M75 55 Q90 40 100 40" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              className="w-28 sm:w-32 lg:w-34 h-28 sm:h-32 lg:h-34 drop-shadow-[0_8px_20px_rgba(168,85,247,0.35)]"
              viewBox="0 0 240 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="kbChassis" x1="20" y1="40" x2="220" y2="150" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E1B4B" />
                  <stop offset="0.6" stopColor="#0F172A" />
                  <stop offset="1" stopColor="#020617" />
                </linearGradient>
                <linearGradient id="purpleGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#C084FC" />
                  <stop offset="1" stopColor="#818CF8" />
                </linearGradient>
                <filter id="kbGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <polygon points="35,60 205,60 220,135 20,135" fill="url(#kbChassis)" stroke="#A855F7" strokeWidth="2.5" />
              <line x1="25" y1="135" x2="215" y2="135" stroke="url(#purpleGlow)" strokeWidth="4" filter="url(#kbGlow)" />
              {[46, 70, 94, 118, 142, 166, 190].map((x, i) => (
                <rect key={`r1-${i}`} x={x} y="68" width="18" height="12" rx="3" fill="#312E81" stroke="#A855F7" strokeWidth="1" />
              ))}
              {[43, 67, 91, 115, 139, 163, 187, 197].map((x, i) => (
                <rect key={`r2-${i}`} x={x} y="84" width="18" height="12" rx="3" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1" />
              ))}
              {[40, 64, 88, 112, 136, 160, 184].map((x, i) => (
                <rect
                  key={`r3-${i}`}
                  x={x}
                  y="100"
                  width="18"
                  height="12"
                  rx="3"
                  fill={i === 1 || i === 2 ? '#C084FC' : '#1E1B4B'}
                  stroke={i === 1 || i === 2 ? '#FFFFFF' : '#818CF8'}
                  strokeWidth="1.2"
                  filter={i === 1 || i === 2 ? 'url(#kbGlow)' : 'none'}
                />
              ))}
              <rect x="36" y="116" width="22" height="12" rx="3" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1" />
              <rect x="74" y="116" width="76" height="12" rx="3" fill="#4C1D95" stroke="#C084FC" strokeWidth="1.5" filter="url(#kbGlow)" />
              <rect x="166" y="116" width="22" height="12" rx="3" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1" />
            </svg>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="relative z-10 space-y-1 mt-0.5">
        <div className="flex items-start justify-between">
          <div>
            <h3
              data-testid={`product-name-${product.numericId}`}
              className="text-[20px] font-bold text-white tracking-tight"
            >
              {product.name}
            </h3>
            <p className="text-[14px] text-slate-400 mt-0.5 line-clamp-1">{product.tagline}</p>
          </div>
          <div className="text-right">
            <span
              data-testid={`product-price-${product.numericId}`}
              className="text-[21px] font-black font-mono tracking-tight text-white block"
            >
              {product.formattedPrice}
            </span>
          </div>
        </div>

        {/* Specs Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.specs.map((spec, i) => (
            <span
              key={i}
              className="text-[13px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-400 border border-slate-800"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Action Area */}
      <div className="relative z-10 pt-2.5 mt-2 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {inCartQuantity > 0 ? (
            <span className="inline-flex items-center space-x-1 text-[12px] font-mono font-medium text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
              <Check className="w-3 h-3" />
              <span>{inCartQuantity} in cart</span>
            </span>
          ) : (
            <span className="text-[13px] text-slate-400 font-mono">In Stock</span>
          )}
        </div>

        <button
          type="button"
          data-testid={`add-to-cart-${product.numericId}`}
          onClick={handleAdd}
          className={`relative group/btn inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-[14px] transition-all duration-200 shadow-md ${
            isAdding
              ? 'scale-95 bg-cyan-400 text-slate-950 shadow-cyan-400/40'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_15px_rgba(0,242,254,0.35)] active:scale-95'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className={`w-3.5 h-3.5 transition-transform ${isAdding ? 'scale-125' : 'group-hover/btn:-translate-y-0.5'}`} />
          <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}
