# NEO CHECKOUT — Premium 3D Checkout Experience
### Fynd Hiring Hackathon 2026 | Production SDET & Frontend Engineering Benchmark

NEO CHECKOUT is a production-quality, futuristic e-commerce checkout interface built for high reliability, peak performance, and verified automated browser test suites.

---

## 🚀 Key Highlights & Architecture

### 1. Distinctive Visual Identity & 3D Depth
- **Cyber Midnight Aesthetic**: Layered midnight navy backdrop (`#050811`, `#080E1C`) accented with electric cyan (`#00F2FE`) and subtle violet (`#A855F7`).
- **Interactive 3D Mouse-Follow Tilt**: Product cards calculate cursor angle in real time to apply smooth perspective rotation (`perspective(1000px) rotateX(...) rotateY(...) scale3d(...)`) with physics-inspired spring release.
- **Dynamic Glare Lighting**: Cursor tracking projects dynamic specular reflections across the glassmorphic panels.
- **Zero Heavy WebGL Dependencies**: Crafted with pure, hardware-accelerated CSS 3D transforms (`translateZ`, `rotateX/Y`), eliminating Three.js/WebGL bloat and guaranteeing instant load times.
- **`prefers-reduced-motion` Compliant**: Gracefully degrades to crisp static layouts when reduced motion is preferred by the user/system.

### 2. High-Integrity Checkout Logic
- **Fixed Catalog**:
  - `Wireless Mouse` — ₹799
  - `Mechanical Keyboard` — ₹1,499
- **Cart Management**: Real-time quantity increment/decrement, line removal, and accurate line totals (`₹unit_price × quantity`).
- **Real-Time Total Calculation**: Synchronized grand total calculation.
- **Robust Validations**:
  - Empty cart rejection with explicit contextual alerts.
  - Required customer name validation (whitespace trimming).
  - State preservation: customer input persists across validation failures and cart alterations.
- **Synchronous Duplicate Submission Guard**: Employs an immediate synchronous ref guard (`isSubmittingRef.current`) that neutralizes rapid double-clicks and concurrent form triggers.
- **Unique Order Reference**: Generates unique cryptographic references (`ORD-NEO-[TIMESTAMP]-[HASH]`).

---

## 🧪 Automated Browser Test Suite (Playwright)

NEO CHECKOUT includes 3 mandatory automated end-to-end tests:

1. **TEST 1: End-to-end checkout flow**
   - Adds Wireless Mouse (₹799) and Mechanical Keyboard (₹1,499) to cart.
   - Adjusts quantity of Wireless Mouse to 2.
   - Verifies individual line totals (`₹1,598` and `₹1,499`).
   - Verifies grand order total (`₹3,097`).
   - Completes checkout with customer name and validates single confirmation and unique order reference.

2. **TEST 2: Validation errors & input preservation**
   - Validates empty cart checkout denial.
   - Validates blank customer name rejection.
   - Validates preservation of entered customer name after cart modifications and validation warnings.

3. **TEST 3: Rapid double-click duplicate submission protection**
   - Rapidly fires concurrent checkout triggers.
   - Verifies synchronous guard allows strictly 1 confirmation without duplicates.

---

## 🛠 Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Vite production build
npm run build

# Run Playwright E2E test suite
npm run test:e2e
```
