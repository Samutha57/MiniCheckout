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
  - State preservation: customer input and cart contents persist across validation failures.
- **Synchronous Duplicate Submission Guard**: Employs an immediate synchronous ref guard (`isSubmittingRef.current`) that neutralizes rapid double-clicks and concurrent form triggers.
- **Unique Order Reference**: Generates unique cryptographic references (`ORD-NEO-[TIMESTAMP]-[HASH]`).

---

## 🧪 Automated Browser Test Suite (Playwright)

NEO CHECKOUT includes 5 automated tests (covering the 3 mandatory core tests + manual quality audits):

1. **TEST 1: Verifies successful checkout and visible order reference**
   - Adds Wireless Mouse (₹799) and Mechanical Keyboard (₹1,499) to cart.
   - Completes checkout with customer name and validates single confirmation and unique order reference (`ORD-NEO-*`).
2. **TEST 2: Verifies blank customer name blocks checkout and preserves cart contents**
   - Adds items to cart, attempts checkout with blank customer name.
   - Verifies validation error is displayed, order confirmation is not created, and all cart items and quantities remain intact.
3. **TEST 3: Fresh application state quantity adjustment & price assertions**
   - Starts in fresh clean state, adds Wireless Mouse.
   - Increments quantity to 2, asserts line total is exactly ₹1,598 and order total is exactly ₹1,598.
4. **TEST 4: Empty-cart validation audit**
   - Attempts checkout with 0 items; verifies error message and blocked submission.
5. **TEST 5: Rapid double-click protection audit**
   - Rapidly fires double-click checkout events; verifies synchronous guard ensures strictly 1 confirmation and 1 order reference.

---

## 📸 Test Evidence Screenshots

Captured directly from headless Playwright test executions into [`screenshots/`](screenshots/):
- `test1-successful-checkout.png` — Confirmed order with unique reference.
- `test2-blank-name-validation.png` — Error alert with preserved cart items.
- `test3-quantity-and-totals.png` — 2 units of Wireless Mouse with exact ₹1,598 line & order totals.
- `test4-empty-cart-validation.png` — Validation alert on empty cart submission.
- `test5-rapid-double-click-protection.png` — Single confirmation following rapid double-click.

See [TEST_PLAN.md](TEST_PLAN.md) for full audit specification.

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
