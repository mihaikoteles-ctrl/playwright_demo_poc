import { test, expect } from '../fixtures/pageFixture';
import { users, products } from '../data/testData';

test.describe('Shopping Cart Tests', () => {
  
  test.beforeEach(async ({ pageManager }) => {
    // Login before each test
    await pageManager.loginPage.navigate();
    await pageManager.loginPage.login(users.standard.username, users.standard.password);
    await pageManager.inventoryPage.verifyPageLoaded();
  });

  test('should add single item to cart', async ({ pageManager }) => {
    // Add backpack to cart
    await pageManager.inventoryPage.addToCart(products.backpack);
    
    // Verify cart badge shows 1 item
    const itemCount = await pageManager.inventoryPage.getCartItemCount();
    expect(itemCount).toBe('1');
  });

  test('should add multiple items to cart', async ({ pageManager }) => {
    // Add three different items
    await pageManager.inventoryPage.addToCart(products.backpack);
    await pageManager.inventoryPage.addToCart(products.bikeLight);
    await pageManager.inventoryPage.addToCart(products.tshirt);
    
    // Verify cart badge shows 3 items
    const itemCount = await pageManager.inventoryPage.getCartItemCount();
    expect(itemCount).toBe('3');
  });

  test('should navigate to cart page', async ({ pageManager }) => {
    // Add item to cart
    await pageManager.inventoryPage.addToCart(products.backpack);
    
    // Go to cart
    await pageManager.inventoryPage.goToCart();
    
    // Verify we're on cart page
    await expect(pageManager.inventoryPage.page).toHaveURL(/.*cart.html/);
  });
});
