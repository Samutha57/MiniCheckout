# NEO CHECKOUT — Test Plan & Compliance Audit Report
### Fynd Hiring Hackathon 2026 | SDET Quality Assurance Specification

This document details the test matrix, test cases, execution steps, expected outcomes, actual verified results, and evidence artifact references for the **NEO CHECKOUT** high-performance ecommerce checkout application.

---

## 📋 Test Matrix Overview

| Test ID | Test Category | Priority | Automated / Manual | Status | Verified Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-E2E-001** | Happy Path Checkout | `P0 (Critical)` | Automated (Playwright) | **PASSED** | Single confirmation displayed, order reference `ORD-NEO-*` visible, customer name and total verified. |
| **TC-VAL-002** | Blank Name Validation | `P0 (Critical)` | Automated (Playwright) | **PASSED** | Checkout blocked, alert displayed, 100% cart items and line totals preserved. |
| **TC-CALC-003** | Quantity & Price Sync | `P0 (Critical)` | Automated (Playwright) | **PASSED** | Fresh state, added Mouse, incremented to 2; line total ₹1,598 and order total ₹1,598 verified. |
| **TC-VAL-004** | Empty Cart Guard | `P1 (High)` | Manual & Automated | **PASSED** | Blank cart blocks checkout, displays empty cart validation warning, 0 orders placed. |
| **TC-CONC-005** | Duplicate Submission Guard | `P0 (Critical)` | Manual & Automated | **PASSED** | Synchronous ref guard suppresses rapid double clicks; strictly 1 confirmation & 1 reference generated. |

---

## 🔍 Detailed Test Specifications & Execution Logs

### TC-E2E-001: Successful Checkout & Visible Order Reference
- **Priority**: P0 (Critical)
- **Preconditions**: Application loaded on `http://127.0.0.1:5173`.
- **Steps**:
  1. Load application and verify 2 hardware products (Wireless Mouse ₹799, Mechanical Keyboard ₹1,499) render.
  2. Click "Add to Cart" for Wireless Mouse.
  3. Click "Add to Cart" for Mechanical Keyboard.
  4. Verify cart manifest reflects 2 items with total ₹2,298.
  5. Fill customer name field with `"Alex Mercer"`.
  6. Click "Complete Checkout" button.
- **Expected Results**:
  - Checkout completes immediately.
  - Order confirmation screen renders.
  - Order reference is visible matching format `^ORD-NEO-[A-Z0-9]+-[A-Z0-9]+$`.
  - Customer name displays `"Alex Mercer"`.
  - Confirmed total displays `"₹2,298"`.
- **Actual Result**:
  - Confirmed: Rendered order reference (e.g. `ORD-NEO-MJA9K2-89LP1`), customer name `"Alex Mercer"`, total `"₹2,298"`.
- **Status**: **PASSED**
- **Evidence**: `screenshots/test1-successful-checkout.png`

---

### TC-VAL-002: Blank Customer Name Validation & Cart Content Preservation
- **Priority**: P0 (Critical)
- **Preconditions**: Fresh browser session.
- **Steps**:
  1. Add Wireless Mouse (₹799) and Mechanical Keyboard (₹1,499) to cart.
  2. Verify quantities are 1 each, subtotal is ₹2,298.
  3. Leave Customer Name field empty (or whitespace).
  4. Click "Complete Checkout" button.
- **Expected Results**:
  - Checkout is blocked; no order confirmation appears.
  - Validation error displayed: `"Customer name is required to complete checkout."`.
  - Cart contents remain completely preserved (Wireless Mouse qty: 1, Mechanical Keyboard qty: 1, total: ₹2,298).
- **Actual Result**:
  - Confirmed: Error alert rendered immediately, 0 order confirmations created, both cart items and exact totals remained intact.
- **Status**: **PASSED**
- **Evidence**: `screenshots/test2-blank-name-validation.png`

---

### TC-CALC-003: Fresh State, Quantity Adjustment & Price Calculation
- **Priority**: P0 (Critical)
- **Preconditions**: Fresh application session (clean cart).
- **Steps**:
  1. Verify fresh state: cart empty prompt visible, total ₹0.
  2. Click "Add to Cart" for Wireless Mouse (₹799).
  3. Verify unit price is ₹799, quantity is 1, line total is ₹799, order total is ₹799.
  4. Click `+` stepper button to increment quantity to 2.
  5. Assert quantity updates to 2.
  6. Assert line total is exactly `"₹1,598"`.
  7. Assert order total is exactly `"₹1,598"`.
- **Expected Results**:
  - Line total equals `2 × 799 = ₹1,598`.
  - Order grand total equals `"₹1,598"`.
- **Actual Result**:
  - Confirmed: Quantity updated to 2, line total rendered `"₹1,598"`, order total rendered `"₹1,598"`.
- **Status**: **PASSED**
- **Evidence**: `screenshots/test3-quantity-and-totals.png`

---

### TC-VAL-004: Empty Cart Manual & Automated Audit
- **Priority**: P1 (High)
- **Preconditions**: Fresh application session, 0 items in cart.
- **Steps**:
  1. Ensure cart is empty (`data-testid="empty-cart-message"` visible).
  2. Click "Complete Checkout" button.
- **Expected Results**:
  - Checkout is blocked.
  - Validation error displayed: `"Your cart is empty. Please add at least one product."`.
  - No order confirmation generated.
- **Actual Result**:
  - Confirmed: Blocked instantaneously with alert message, no network or order state mutation.
- **Status**: **PASSED**
- **Evidence**: `screenshots/test4-empty-cart-validation.png`

---

### TC-CONC-005: Rapid Double-Click Duplicate Submission Protection
- **Priority**: P0 (Critical)
- **Preconditions**: Fresh application session.
- **Steps**:
  1. Add Mechanical Keyboard (₹1,499) to cart.
  2. Enter customer name `"Elena Rostova"`.
  3. Rapidly double-click "Complete Checkout" button within <100ms.
- **Expected Results**:
  - Synchronous duplicate-submission guard immediately locks on first trigger.
  - Exactly 1 confirmation screen rendered (`toHaveCount(1)`).
  - Exactly 1 order reference generated (`toHaveCount(1)`).
  - Zero duplicate order side-effects.
- **Actual Result**:
  - Confirmed: Synchronous guard blocked duplicate submission cleanly; exactly 1 order reference generated (`ORD-NEO-...`).
- **Status**: **PASSED**
- **Evidence**: `screenshots/test5-rapid-double-click-protection.png`

---

## 🏆 Audit Summary

- **Total Test Cases Executed**: 5 (3 Core Mandatory + 2 Supporting Quality Gates)
- **Passed**: 5
- **Failed**: 0
- **Regression / Flakiness**: None detected
- **Browser Automation Suite**: Playwright v1.49.1 (Chromium)
- **Audit Conclusion**: 100% compliant with all Fynd Hiring Hackathon 2026 guidelines.
