import { Page, Locator, expect } from "@playwright/test";

export class ViewCartPage {
  page: Page;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByText("Proceed To Checkout");
  }
  async verifyProductInCart() {
    const quantity = await this.page.locator(".cart_quantity").innerText();
    expect(quantity).toEqual("1");
  }
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
