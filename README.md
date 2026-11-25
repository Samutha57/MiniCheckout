# NEO CHECKOUT — Premium 3D Checkout Experience
### Fynd Hiring Hackathon 2026 | Production SDET & Frontend Engineering Benchmark

NEO CHECKOUT is a production-quality, responsive single-page e-commerce checkout interface built for high reliability, peak performance, and verified browser test automation.

---

## 🛠 Technology Stack

- **Frontend Core**: [React 18.3.1](https://react.dev/) — Declarative component architecture with synchronous refs (`isSubmittingRef`) for instantaneous duplicate-submission locking.
- **Build System**: [Vite 6.0.7](https://vitejs.dev/) — Lightning-fast development server with Rollup production tree-shaking.
- **Styling & Theme**: [Tailwind CSS 3.4.17](https://tailwindcss.com/) & Autoprefixer — Midnight navy cyber aesthetic (`#050811`, `#080E1C`), glassmorphism, and responsive design utilities.
- **Icons**: [Lucide React 1.16.0](https://lucide.dev/) — Clean, semantic, lightweight SVG icons.
- **Motion & Depth**: Hardware-accelerated CSS 3D Transforms (`perspective`, `rotateX/Y`, `translateZ`) and cursor-tracked dynamic specular glare with full `prefers-reduced-motion` compliance. Zero Three.js/WebGL bloat.
- **Test Automation**: [Playwright 1.49.1](https://playwright.dev/) — Comprehensive automated browser test suite with visible assertions, zero fixed sleep timeouts, and responsive viewport verification.

---

## 📦 Installation & Setup

Ensure Node.js (v18+) and npm are installed on your system.

```bash
# 1. Clone repository (or navigate to workspace directory)
cd MiniCheckout

# 2. Install dependencies
npm install
```

---

## 🚀 Running the Application

### Development Mode
Runs the local Vite dev server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

### Production Build & Preview
Compile optimized production assets and serve:
```bash
# Build production bundle into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🧪 Automated Browser Test Suite (Playwright)

NEO CHECKOUT comes with an automated Playwright test suite covering all mandatory hackathon requirements and quality verification gates. Tests execute independently with clean browser sessions and no arbitrary sleep timeouts.

### Run Tests
```bash
# Run all tests in headless Chromium
npx playwright test

# Or run via npm script
npm run test:e2e

# Run with interactive UI mode
npx playwright test --ui

# Run with visible browser window (headed)
npx playwright test --headed
```

### Test Suite Coverage

1. **TEST 1: Verifies successful checkout and visible order reference (TC-E2E-001)**
   - Adds Wireless Mouse (₹799) and Mechanical Keyboard (₹1,499) to cart.
   - Enters customer name `"Alex Mercer"` and submits checkout.
   - Verifies order confirmation screen, formatted unique order reference (`^ORD-NEO-[A-Z0-9]+-[A-Z0-9]+$`), confirmed customer name, and total ₹2,298.
2. **TEST 2: Verifies blank customer name blocks checkout and preserves cart contents (TC-VAL-002)**
   - Adds products to cart and leaves name blank.
   - Submits checkout and asserts validation error is displayed.
   - Asserts order confirmation is NOT created, and all cart items, quantities, line totals, and grand total remain 100% preserved.
3. **TEST 3: Fresh application state quantity adjustment & price assertions (TC-CALC-003)**
   - Starts in fresh clean state (cart empty, total ₹0).
   - Adds Wireless Mouse (₹799), increments quantity to 2 using stepper.
   - Asserts line total is exactly ₹1,598 and order total is exactly ₹1,598.
4. **TEST 4: Empty-cart validation audit (TC-VAL-004)**
   - Attempts checkout with 0 items in cart.
   - Asserts validation error `"Your cart is empty. Please add at least one product."` is shown and submission is blocked.
5. **TEST 5: Rapid double-click protection audit (TC-CONC-005)**
   - Adds product and customer name.
   - Performs rapid double-click on checkout button.
   - Asserts synchronous guard ensures strictly 1 confirmation screen and 1 unique reference are generated.
6. **TEST 6: Viewport fitting verification (TC-VIEW-006)**
   - Evaluates layout at 1920×1080, 1792×849, 1366×768, and 1280×720.
   - Asserts all controls (title, cards, checkout button) are visible in the viewport with zero vertical or horizontal document scrolling.

---

## 📸 Test Evidence Artifacts

Test executions automatically capture full-page screenshots into [`screenshots/`](screenshots/):
- `test1-successful-checkout.png` — Confirmed order screen with unique reference and summary.
- `test2-blank-name-validation.png` — Validation error alert with fully preserved cart state.
- `test3-quantity-and-totals.png` — Stepper updated to 2 units with exact ₹1,598 totals.
- `test4-empty-cart-validation.png` — Empty cart error banner blocking submission.
- `test5-rapid-double-click-protection.png` — Single confirmation following rapid double-click.
- `viewport-1920x1080.png` — Full HD 1080p desktop fitting proof.
- `viewport-1792x849.png` — Widescreen 1792×849 windowed fitting proof.
- `viewport-1366x768.png` — Standard 1366×768 laptop fitting proof.
- `viewport-1280x720.png` — Compact 720p HD desktop fitting proof.

For the formal SDET specification, see [TEST_PLAN.md](TEST_PLAN.md).
