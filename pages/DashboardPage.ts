import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  addToCartButton: Locator;
  viewCartButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = this.page.getByText("Add to cart");
    this.viewCartButton = this.page.locator('u:has-text("View Cart")');
  }

  async addProductToCart() {
    await this.addToCartButton.first().click();
    await this.page.getByText("Added!").first().waitFor();
    await this.viewCartButton.click();
  }
}
module.exports = { DashboardPage };
