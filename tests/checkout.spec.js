import { test, expect } from '@playwright/test';

test.describe('NEO CHECKOUT — Automated Browser Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5173');
  });

  test('TEST 1: End-to-end checkout flow - adds products, adjusts quantity, calculates line totals & grand total, and verifies order confirmation', async ({ page }) => {
    // 1. Verify products are displayed
    const mouseCard = page.getByTestId('product-card-1');
    const kbCard = page.getByTestId('product-card-2');
    await expect(mouseCard).toBeVisible();
    await expect(kbCard).toBeVisible();

    // 2. Add Wireless Mouse (₹799) to cart
    const addMouseBtn = page.getByTestId('add-to-cart-1');
    await addMouseBtn.click();

    // 3. Add Mechanical Keyboard (₹1,499) to cart
    const addKbBtn = page.getByTestId('add-to-cart-2');
    await addKbBtn.click();

    // 4. Verify initial cart state
    const mouseCartItem = page.getByTestId('cart-item-1');
    const kbCartItem = page.getByTestId('cart-item-2');
    await expect(mouseCartItem).toBeVisible();
    await expect(kbCartItem).toBeVisible();

    // 5. Increase Wireless Mouse quantity to 2
    const increaseMouseBtn = page.getByTestId('quantity-increase-1');
    await increaseMouseBtn.click();

    // 6. Verify quantity and line totals
    const mouseQty = page.getByTestId('cart-item-quantity-1');
    await expect(mouseQty).toHaveText('2');

    const mouseLineTotal = page.getByTestId('line-total-1');
    await expect(mouseLineTotal).toHaveText('₹1,598');

    const kbLineTotal = page.getByTestId('line-total-2');
    await expect(kbLineTotal).toHaveText('₹1,499');

    // 7. Verify grand total: ₹1,598 + ₹1,499 = ₹3,097
    const grandTotal = page.getByTestId('order-total');
    await expect(grandTotal).toHaveText('₹3,097');

    // 8. Provide customer name
    const customerInput = page.getByTestId('customer-name-input');
    await customerInput.fill('Alex Mercer');

    // 9. Execute checkout action
    const checkoutBtn = page.getByTestId('checkout-button');
    await checkoutBtn.click();

    // 10. Verify order confirmation
    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).toBeVisible();

    const orderRef = page.getByTestId('order-reference');
    await expect(orderRef).toBeVisible();
    const orderRefText = await orderRef.innerText();
    expect(orderRefText).toMatch(/^ORD-NEO-/);

    const confirmedName = page.getByTestId('confirmed-customer-name');
    await expect(confirmedName).toHaveText('Alex Mercer');

    const confirmedTotal = page.getByTestId('confirmed-order-total');
    await expect(confirmedTotal).toHaveText('₹3,097');
  });

  test('TEST 2: Validation errors and customer input preservation - empty cart and blank customer name', async ({ page }) => {
    const checkoutBtn = page.getByTestId('checkout-button');
    const customerInput = page.getByTestId('customer-name-input');

    // Scenario A: Attempt checkout with empty cart
    await checkoutBtn.click();
    const validationError = page.getByTestId('validation-error');
    await expect(validationError).toBeVisible();
    await expect(validationError).toContainText(/cart is empty/i);

    // Confirmation should NOT be visible
    await expect(page.getByTestId('order-confirmation')).toHaveCount(0);

    // Scenario B: Add product, leave customer name blank, attempt checkout
    const addMouseBtn = page.getByTestId('add-to-cart-1');
    await addMouseBtn.click();

    await checkoutBtn.click();
    await expect(validationError).toBeVisible();
    await expect(validationError).toContainText(/Customer name is required/i);
    await expect(page.getByTestId('order-confirmation')).toHaveCount(0);

    // Scenario C: Enter name, empty cart, verify name remains preserved
    await customerInput.fill('Sarah Connor');

    // Remove the product to empty the cart
    const removeMouseBtn = page.getByTestId('remove-item-1');
    await removeMouseBtn.click();

    // Verify empty cart message
    await expect(page.getByTestId('empty-cart-message')).toBeVisible();

    // Attempt checkout with empty cart again
    await checkoutBtn.click();
    await expect(validationError).toBeVisible();
    await expect(validationError).toContainText(/cart is empty/i);

    // CRITICAL: Customer name must remain preserved in the input
    await expect(customerInput).toHaveValue('Sarah Connor');
  });

  test('TEST 3: Rapid double-click duplicate submission protection - ensures exactly one order confirmation', async ({ page }) => {
    // 1. Add product to cart
    const addKbBtn = page.getByTestId('add-to-cart-2');
    await addKbBtn.click();

    // 2. Fill customer name
    const customerInput = page.getByTestId('customer-name-input');
    await customerInput.fill('Elena Rostova');

    // 3. Rapid double-click on checkout button to test duplicate submission protection
    const checkoutBtn = page.getByTestId('checkout-button');
    await checkoutBtn.dblclick();

    // 4. Assert exactly one confirmation is shown
    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toHaveCount(1);

    // 5. Assert unique order reference is generated
    const orderRef = page.getByTestId('order-reference');
    await expect(orderRef).toHaveCount(1);
    const orderRefText = await orderRef.innerText();
    expect(orderRefText).toMatch(/^ORD-NEO-/);

    // 6. Assert correct total
    const confirmedTotal = page.getByTestId('confirmed-order-total');
    await expect(confirmedTotal).toHaveText('₹1,499');
  });

});
