import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly shoppingCart: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.shoppingCart = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addToCart(productName: string) {
    const addButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await this.click(addButton);
  }

  async getCartItemCount(): Promise<string> {
    return await this.getText(this.cartBadge);
  }

  async goToCart() {
    await this.click(this.shoppingCart);
  }
}
