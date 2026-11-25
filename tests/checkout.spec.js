import { test, expect } from '@playwright/test';

test.describe('NEO CHECKOUT — Automated Browser Test Suite', () => {
  let consoleErrors = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('pageerror', (err) => consoleErrors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Ensure every test starts with an independent, fresh browser state
    await page.goto('http://127.0.0.1:5173');
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async () => {
    expect(consoleErrors, 'No console errors or unhandled exceptions should occur').toEqual([]);
  });

  test('TEST 1: Verifies successful checkout and visible order reference', async ({ page }) => {
    // 1. Verify product catalog loads
    const mouseCard = page.getByTestId('product-card-1');
    const kbCard = page.getByTestId('product-card-2');
    await expect(mouseCard).toBeVisible();
    await expect(kbCard).toBeVisible();

    // 2. Add Wireless Mouse (₹799) and Mechanical Keyboard (₹1,499)
    await page.getByTestId('add-to-cart-1').click();
    await page.getByTestId('add-to-cart-2').click();

    // 3. Verify items appear in cart
    await expect(page.getByTestId('cart-item-1')).toBeVisible();
    await expect(page.getByTestId('cart-item-2')).toBeVisible();

    // 4. Fill required customer name
    const customerInput = page.getByTestId('customer-name-input');
    await customerInput.fill('Alex Mercer');

    // 5. Submit checkout
    const checkoutBtn = page.getByTestId('checkout-button');
    await checkoutBtn.click();

    // 6. Assert order confirmation is displayed
    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).toBeVisible();

    // 7. Assert unique order reference is visible and properly formatted
    const orderRef = page.getByTestId('order-reference');
    await expect(orderRef).toBeVisible();
    const orderRefText = await orderRef.innerText();
    expect(orderRefText).toMatch(/^ORD-NEO-[A-Z0-9]+-[A-Z0-9]+$/);

    // 8. Assert customer name and confirmed total
    const confirmedName = page.getByTestId('confirmed-customer-name');
    await expect(confirmedName).toHaveText('Alex Mercer');

    const confirmedTotal = page.getByTestId('confirmed-order-total');
    await expect(confirmedTotal).toHaveText('₹2,298');

    // 9. Capture screenshot evidence
    await page.screenshot({ path: 'screenshots/test1-successful-checkout.png', fullPage: true });
  });

  test('TEST 2: Verifies blank customer name blocks checkout and preserves cart contents', async ({ page }) => {
    // 1. Add both products to cart
    await page.getByTestId('add-to-cart-1').click();
    await page.getByTestId('add-to-cart-2').click();

    // 2. Verify both items are present with initial quantities
    const mouseQty = page.getByTestId('cart-item-quantity-1');
    const kbQty = page.getByTestId('cart-item-quantity-2');
    await expect(mouseQty).toHaveText('1');
    await expect(kbQty).toHaveText('1');

    // 3. Ensure customer name field is blank
    const customerInput = page.getByTestId('customer-name-input');
    await customerInput.fill('');

    // 4. Attempt to checkout with blank customer name
    const checkoutBtn = page.getByTestId('checkout-button');
    await checkoutBtn.click();

    // 5. Assert checkout is blocked: validation error must be visible
    const validationError = page.getByTestId('validation-error');
    await expect(validationError).toBeVisible();
    await expect(validationError).toContainText(/Customer name is required/i);

    // 6. Assert NO order confirmation was created
    await expect(page.getByTestId('order-confirmation')).toHaveCount(0);

    // 7. CRITICAL: Assert cart contents remain completely preserved
    await expect(page.getByTestId('cart-item-1')).toBeVisible();
    await expect(page.getByTestId('cart-item-2')).toBeVisible();
    await expect(mouseQty).toHaveText('1');
    await expect(kbQty).toHaveText('1');

    // Verify line totals and order total remain intact
    await expect(page.getByTestId('line-total-1')).toHaveText('₹799');
    await expect(page.getByTestId('line-total-2')).toHaveText('₹1,499');
    await expect(page.getByTestId('order-total')).toHaveText('₹2,298');

    // 8. Capture screenshot evidence
    await page.screenshot({ path: 'screenshots/test2-blank-name-validation.png', fullPage: true });
  });

  test('TEST 3: Fresh application state - Add Wireless Mouse, increase quantity to 2, assert line total is exactly ₹1,598 and order total is exactly ₹1,598', async ({ page }) => {
    // 1. Verify fresh application state (empty cart)
    await expect(page.getByTestId('empty-cart-message')).toBeVisible();
    await expect(page.getByTestId('order-total')).toHaveText('₹0');

    // 2. Add Wireless Mouse (₹799)
    await page.getByTestId('add-to-cart-1').click();

    // 3. Verify item in cart with quantity 1
    const mouseItem = page.getByTestId('cart-item-1');
    await expect(mouseItem).toBeVisible();
    const mouseQty = page.getByTestId('cart-item-quantity-1');
    await expect(mouseQty).toHaveText('1');
    await expect(page.getByTestId('line-total-1')).toHaveText('₹799');
    await expect(page.getByTestId('order-total')).toHaveText('₹799');

    // 4. Increase quantity to 2
    const increaseBtn = page.getByTestId('quantity-increase-1');
    await increaseBtn.click();

    // 5. Assert quantity is 2
    await expect(mouseQty).toHaveText('2');

    // 6. Assert line total is exactly ₹1,598
    const lineTotal = page.getByTestId('line-total-1');
    await expect(lineTotal).toHaveText('₹1,598');

    // 7. Assert order total is exactly ₹1,598
    const orderTotal = page.getByTestId('order-total');
    await expect(orderTotal).toHaveText('₹1,598');

    // 8. Capture screenshot evidence
    await page.screenshot({ path: 'screenshots/test3-quantity-and-totals.png', fullPage: true });
  });

  test('TEST 4: Empty-cart validation - blocks checkout when cart has no items', async ({ page }) => {
    // 1. Verify cart is empty
    await expect(page.getByTestId('empty-cart-message')).toBeVisible();

    // 2. Click checkout without adding any products
    const checkoutBtn = page.getByTestId('checkout-button');
    await checkoutBtn.click();

    // 3. Assert validation error is visible and specifies empty cart
    const validationError = page.getByTestId('validation-error');
    await expect(validationError).toBeVisible();
    await expect(validationError).toContainText(/cart is empty/i);

    // 4. Assert order confirmation is NOT displayed
    await expect(page.getByTestId('order-confirmation')).toHaveCount(0);

    // 5. Capture screenshot evidence
    await page.screenshot({ path: 'screenshots/test4-empty-cart-validation.png', fullPage: true });
  });

  test('TEST 5: Rapid double-click protection - ensures exactly one confirmation and one reference', async ({ page }) => {
    // 1. Add Mechanical Keyboard to cart
    await page.getByTestId('add-to-cart-2').click();

    // 2. Fill customer name
    const customerInput = page.getByTestId('customer-name-input');
    await customerInput.fill('Elena Rostova');

    // 3. Rapid double-click on checkout button
    const checkoutBtn = page.getByTestId('checkout-button');
    await checkoutBtn.dblclick();

    // 4. Assert exactly one confirmation is shown
    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toHaveCount(1);

    // 5. Assert exactly one unique order reference is generated
    const orderRef = page.getByTestId('order-reference');
    await expect(orderRef).toHaveCount(1);
    const orderRefText = await orderRef.innerText();
    expect(orderRefText).toMatch(/^ORD-NEO-[A-Z0-9]+-[A-Z0-9]+$/);

    // 6. Assert correct total
    const confirmedTotal = page.getByTestId('confirmed-order-total');
    await expect(confirmedTotal).toHaveText('₹1,499');

    // 7. Capture screenshot evidence
    await page.screenshot({ path: 'screenshots/test5-rapid-double-click-protection.png', fullPage: true });
  });

  test('TEST 6: Viewport fitting verification - ensures complete checkout page fits without scrolling at 1920x1080, 1792x849, 1366x768, and 1280x720', async ({ page }) => {
    const desktopResolutions = [
      { name: '1920x1080', width: 1920, height: 1080 },
      { name: '1792x849', width: 1792, height: 849 },
      { name: '1366x768', width: 1366, height: 768 },
      { name: '1280x720', width: 1280, height: 720 },
    ];

    // Add an item to test the populated cart layout as well
    await page.getByTestId('add-to-cart-1').click();

    for (const res of desktopResolutions) {
      await page.setViewportSize({ width: res.width, height: res.height });

      // Verify header, cards, and checkout button are in viewport
      await expect(page.getByTestId('product-card-1')).toBeInViewport();
      await expect(page.getByTestId('product-card-2')).toBeInViewport();
      await expect(page.getByTestId('checkout-button')).toBeInViewport();

      // Verify no horizontal or vertical overflow on document element
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          hasVerticalScroll: doc.scrollHeight > window.innerHeight + 2, // 2px subpixel margin
          hasHorizontalScroll: doc.scrollWidth > window.innerWidth + 2,
        };
      });

      expect(overflow.hasVerticalScroll, `Vertical scroll detected at ${res.name}`).toBe(false);
      expect(overflow.hasHorizontalScroll, `Horizontal scroll detected at ${res.name}`).toBe(false);

      // Capture viewport evidence screenshot
      await page.screenshot({ path: `screenshots/viewport-${res.name}.png` });
    }
  });

});
