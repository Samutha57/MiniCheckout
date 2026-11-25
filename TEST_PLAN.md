# NEO CHECKOUT — Test Plan & SDET Compliance Audit Report
### Fynd Hiring Hackathon 2026 | Comprehensive Quality Assurance Specification

This document details the test matrix, test cases, execution steps, expected outcomes, actual verified results, and evidence artifact references for the **NEO CHECKOUT** single-page ecommerce checkout application.

---

## 📋 Test Matrix Overview

| Test ID | Test Objective | Test Type | Priority | Expected Result | Actual Result | Status | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-E2E-001** | Verify happy-path checkout with 2 products, name input, and unique order reference generation. | Automated (Playwright) | `P0 (Critical)` | Confirmation shown, reference `ORD-NEO-*` generated, name & ₹2,298 verified. | Single confirmation rendered, ref `ORD-NEO-...` verified, name and total match. | **PASSED** | `screenshots/test1-successful-checkout.png` |
| **TC-VAL-002** | Verify blank/whitespace customer name blocks checkout and preserves 100% of cart contents. | Automated (Playwright) | `P0 (Critical)` | Checkout blocked, alert displayed, 0 confirmations, cart items & totals intact. | Error alert rendered, 0 orders placed, both cart items and line totals preserved. | **PASSED** | `screenshots/test2-blank-name-validation.png` |
| **TC-CALC-003** | Verify fresh state, quantity adjustment with stepper, and real-time synchronization of line and order totals. | Automated (Playwright) | `P0 (Critical)` | Cart empty on load, adding Mouse & incrementing to 2 updates line and grand totals to ₹1,598. | Fresh state verified, quantity updated to 2, line total ₹1,598, order total ₹1,598. | **PASSED** | `screenshots/test3-quantity-and-totals.png` |
| **TC-VAL-004** | Verify empty cart blocks checkout and displays contextual error alert. | Automated (Playwright) | `P1 (High)` | Block submission, display `"Your cart is empty..."`, 0 orders placed. | Blocked instantly, alert rendered, 0 orders placed. | **PASSED** | `screenshots/test4-empty-cart-validation.png` |
| **TC-CONC-005** | Verify synchronous ref guard suppresses rapid duplicate/double clicks on checkout. | Automated (Playwright) | `P0 (Critical)` | Synchronous guard blocks concurrent triggers, strictly 1 confirmation & 1 reference. | Single confirmation and unique reference generated without duplicate state mutations. | **PASSED** | `screenshots/test5-rapid-double-click-protection.png` |
| **TC-VIEW-006** | Verify zero vertical & horizontal scrolling across desktop resolutions (1920x1080, 1792x849, 1366x768, 1280x720). | Automated (Playwright) | `P0 (Critical)` | Complete checkout UI visible without scrollbars or clipped elements. | Zero scrollbars detected; cards, cart, and checkout button fully in viewport. | **PASSED** | `screenshots/viewport-*.png` |
| **TC-MAN-001** | Manual verification of empty-cart checkout prevention and UX alert behavior. | Manual Exploratory | `P1 (High)` | User cannot proceed without products; descriptive warning displayed. | Empty cart prompt visible; clicking Complete Checkout immediately triggers alert. | **PASSED** | Live Browser Interactive Verification |
| **TC-MAN-002** | Manual verification of rapid repeated checkout button double-clicks. | Manual Exploratory | `P0 (Critical)` | Multiple rapid mouse clicks trigger exactly one checkout submission. | Double-click was immediately absorbed by synchronous ref lock; only 1 order created. | **PASSED** | Live Browser Interactive Verification |

---

## 🤖 1. Automated Playwright Test Specifications

### TC-E2E-001: Successful Checkout & Visible Order Reference
- **Test ID**: `TC-E2E-001`
- **Test Objective**: Verify the end-to-end happy path checkout flow from product selection to confirmed order reference.
- **Priority**: `P0 (Critical)`
- **Preconditions**: Fresh browser session at `http://127.0.0.1:5173`.
- **Steps**:
  1. Load page and assert Wireless Mouse (₹799) and Mechanical Keyboard (₹1,499) cards are visible.
  2. Click "Add to Cart" on Wireless Mouse.
  3. Click "Add to Cart" on Mechanical Keyboard.
  4. Verify cart list displays both items with initial quantity 1 each and subtotal ₹2,298.
  5. Enter customer name `"Alex Mercer"` into the name input.
  6. Click "Complete Checkout" button.
- **Expected Results**:
  - Checkout completes immediately without network errors.
  - Order confirmation screen renders (`data-testid="order-confirmation"`).
  - Unique order reference is displayed matching format `^ORD-NEO-[A-Z0-9]+-[A-Z0-9]+$`.
  - Confirmed customer name displays `"Alex Mercer"`.
  - Confirmed order total displays `"₹2,298"`.
- **Actual Result**:
  - PASSED. Order confirmed with reference (e.g., `ORD-NEO-MJA9K2-89LP1`), customer name `"Alex Mercer"`, and total `"₹2,298"`.
- **Status**: **PASSED**
- **Evidence**: `screenshots/test1-successful-checkout.png`

---

### TC-VAL-002: Missing Customer Name Validation & Cart Content Preservation
- **Test ID**: `TC-VAL-002`
- **Test Objective**: Verify that attempting to checkout with a blank/whitespace name blocks submission, renders a visible alert, and preserves all cart items and totals.
- **Priority**: `P0 (Critical)`
- **Preconditions**: Fresh browser session at `http://127.0.0.1:5173`.
- **Steps**:
  1. Add Wireless Mouse (₹799) and Mechanical Keyboard (₹1,499) to cart.
  2. Leave Customer Name input empty (`""`).
  3. Click "Complete Checkout" button.
- **Expected Results**:
  - Checkout is blocked; no order confirmation component is rendered (`toHaveCount(0)`).
  - Validation error message is displayed: `"Customer name is required to complete checkout."`.
  - All cart contents remain completely preserved:
    - Wireless Mouse: quantity 1, line total ₹799.
    - Mechanical Keyboard: quantity 1, line total ₹1,499.
    - Order Grand Total: ₹2,298.
- **Actual Result**:
  - PASSED. Validation alert rendered immediately with `role="alert"`; 0 orders placed; 100% of cart data and line calculations preserved.
- **Status**: **PASSED**
- **Evidence**: `screenshots/test2-blank-name-validation.png`

---

### TC-CALC-003: Fresh State, Quantity Adjustment & Price Synchronization
- **Test ID**: `TC-CALC-003`
- **Test Objective**: Verify that the application starts with a clean cart state, allows incrementing quantity via stepper, and computes accurate line and grand totals.
- **Priority**: `P0 (Critical)`
- **Preconditions**: Fresh application session (clean localStorage/sessionStorage/memory).
- **Steps**:
  1. Assert fresh state: empty-cart prompt is visible and order total displays `"₹0"`.
  2. Click "Add to Cart" on Wireless Mouse (₹799).
  3. Verify unit price is ₹799, quantity is 1, line total is `"₹799"`, and order total is `"₹799"`.
  4. Click quantity increase `+` button (`data-testid="quantity-increase-1"`).
  5. Assert quantity updates to 2.
  6. Assert line total updates to exactly `"₹1,598"`.
  7. Assert order grand total updates to exactly `"₹1,598"`.
- **Expected Results**:
  - Line total equals `2 × 799 = ₹1,598`.
  - Order grand total equals `"₹1,598"`.
- **Actual Result**:
  - PASSED. Quantity incremented smoothly from 1 to 2; line total updated to `"₹1,598"`; order total updated to `"₹1,598"`.
- **Status**: **PASSED**
- **Evidence**: `screenshots/test3-quantity-and-totals.png`

---

### TC-VAL-004: Empty Cart Checkout Prevention
- **Test ID**: `TC-VAL-004`
- **Test Objective**: Verify that submitting checkout with zero items in cart is blocked and displays an explanatory validation alert.
- **Priority**: `P1 (High)`
- **Preconditions**: Fresh application session, zero items in cart.
- **Steps**:
  1. Verify cart is empty (`data-testid="empty-cart-message"` is visible).
  2. Click "Complete Checkout" button without adding any products.
- **Expected Results**:
  - Submission is blocked; no order confirmation is generated.
  - Validation alert is displayed: `"Your cart is empty. Please add at least one product."`.
- **Actual Result**:
  - PASSED. Alert rendered with `role="alert"`; submission blocked; 0 orders created.
- **Status**: **PASSED**
- **Evidence**: `screenshots/test4-empty-cart-validation.png`

---

### TC-CONC-005: Rapid Double-Click Duplicate Submission Protection
- **Test ID**: `TC-CONC-005`
- **Test Objective**: Verify that rapid consecutive checkout clicks cannot produce duplicate orders or multiple order references.
- **Priority**: `P0 (Critical)`
- **Preconditions**: Cart contains 1 Mechanical Keyboard, customer name `"Elena Rostova"` entered.
- **Steps**:
  1. Populate cart with Mechanical Keyboard (₹1,499).
  2. Fill customer name `"Elena Rostova"`.
  3. Execute rapid double-click on "Complete Checkout" button (`checkoutBtn.dblclick()`).
- **Expected Results**:
  - Synchronous `isSubmittingRef.current` lock engages on the first click event.
  - Subsequent click events are discarded synchronously before re-render.
  - Exactly one order confirmation component is rendered (`toHaveCount(1)`).
  - Exactly one order reference is generated (`toHaveCount(1)`).
- **Actual Result**:
  - PASSED. Only 1 confirmation screen rendered; exactly 1 unique reference generated (`ORD-NEO-...`); no duplicate orders created.
- **Status**: **PASSED**
- **Evidence**: `screenshots/test5-rapid-double-click-protection.png`

---

### TC-VIEW-006: Desktop Viewport Fitting & Zero Scroll Verification
- **Test ID**: `TC-VIEW-006`
- **Test Objective**: Verify that the complete checkout application interface fits within standard desktop viewports without requiring vertical or horizontal scrolling.
- **Priority**: `P0 (Critical)`
- **Preconditions**: Application loaded with items in cart.
- **Resolutions Evaluated**:
  1. `1920 × 1080` (Full HD Desktop)
  2. `1792 × 849` (Widescreen Windowed)
  3. `1366 × 768` (Standard Laptop)
  4. `1280 × 720` (Compact 720p HD Display)
- **Steps**:
  1. Populate cart with products.
  2. For each resolution, set viewport size.
  3. Assert title, product cards, and checkout button are strictly within the visible viewport (`toBeInViewport()`).
  4. Measure document scroll dimensions against window inner dimensions:
     - `doc.scrollHeight <= window.innerHeight` (no vertical scroll).
     - `doc.scrollWidth <= window.innerWidth` (no horizontal scroll).
- **Expected Results**:
  - All controls visible without scrolling at all 4 target resolutions.
  - Zero clipping or hidden elements.
- **Actual Result**:
  - PASSED. Verified zero vertical and horizontal overflow measured at 1920x1080, 1792x849, 1366x768, and 1280x720.
- **Status**: **PASSED**
- **Evidence**:
  - `screenshots/viewport-1920x1080.png`
  - `screenshots/viewport-1792x849.png`
  - `screenshots/viewport-1366x768.png`
  - `screenshots/viewport-1280x720.png`

---

## ✋ 2. Manual Exploratory Test Specifications

### TC-MAN-001: Manual Audit — Empty Cart Checkout Prevention
- **Test ID**: `TC-MAN-001`
- **Test Objective**: Manually verify human interaction when attempting to checkout with an empty cart.
- **Preconditions**: Fresh browser session opened to `http://127.0.0.1:5173`.
- **Execution Steps**:
  1. Navigate to the NEO CHECKOUT application in a desktop browser.
  2. Notice the empty cart placeholder showing `"Your cart is empty"` and shopping bag icon.
  3. Notice total is `"₹0"`.
  4. Directly click the "Complete Checkout" button.
- **Expected Result**:
  - The application rejects the action immediately.
  - A red validation banner appears: `"Your cart is empty. Please add at least one product."`.
  - The page does not navigate away and no confirmation is displayed.
- **Actual Observed Result**:
  - The validation banner appeared instantaneously beneath the customer name input field. The checkout button did not enter a loading state. Cart remained empty and no state was corrupted.
- **Status**: **PASSED**
- **Verification Method**: Manual browser test execution in Chromium session.

---

### TC-MAN-002: Manual Audit — Rapid Repeated Checkout Clicks (Double-Click)
- **Test ID**: `TC-MAN-002`
- **Test Objective**: Manually verify that rapid, erratic multiple clicks on the checkout button do not cause race conditions, duplicate orders, or corrupted order references.
- **Preconditions**: Application loaded with 1 item in cart and valid customer name.
- **Execution Steps**:
  1. Add Mechanical Keyboard (₹1,499) to cart.
  2. Type `"Manual Tester"` into the "Your Name" field.
  3. Rapidly double-click / triple-click the "Complete Checkout" button with mouse.
- **Expected Result**:
  - Only the first click event triggers order finalization.
  - Exactly one order confirmation screen is displayed.
  - Exactly one order reference ID is shown.
  - No flickering or multiple confirmations appear.
- **Actual Observed Result**:
  - The first click immediately engaged the synchronous guard (`isSubmittingRef.current = true`). Subsequent clicks were ignored. The order confirmation screen rendered smoothly with a single reference `ORD-NEO-...` and exact total ₹1,499.
- **Status**: **PASSED**
- **Verification Method**: Manual browser rapid pointer click testing in Chromium session.

---

## 🏆 Summary of Hackathon Test Results

- **Automated Tests**: 6 executed, 6 passed, 0 failed.
- **Manual Exploratory Tests**: 2 executed, 2 passed, 0 failed.
- **Test Suite Runtime**: ~19.5s across Chromium.
- **Regression / Flakiness**: None (all tests start with fresh state, zero arbitrary timeouts).
- **Compliance Status**: **100% PASS** on all Fynd Hiring Hackathon 2026 requirements.
