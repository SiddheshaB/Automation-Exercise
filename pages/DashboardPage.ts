import { expect, Locator, Page } from "@playwright/test";
export class DashboardPage {
  page: Page;
  addToCartButton: Locator;
  viewCartButton: Locator;
  subscribeEmail: Locator;
  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = this.page.getByText("Add to cart");
    this.viewCartButton = this.page.locator('u:has-text("View Cart")');
    this.subscribeEmail = this.page.locator("#susbscribe_email");
  }

  async addProductToCart() {
    await this.addToCartButton.first().click();
    await this.page.getByText("Added!").first().waitFor();
    await this.viewCartButton.click();
  }

  async iClickOnMenuItem(menuItem: string) {
    await this.page.getByRole("link", { name: menuItem }).click();
  }

  async iSubscribe(email: string) {
    await this.page.getByRole("heading", { name: "Subscription" });
    await this.subscribeEmail.fill(email);
    await this.page.locator("#subscribe").click();
  }

  async iClickScrollUpArrow() {
    await this.page.locator("#scrollUp").click();
  }

  async iVerifyTextOnTheTop(pageHeading: string) {
    expect(
      await this.page
        .getByRole("heading", { name: pageHeading })
        .first()
        .isVisible()
    ).toBeTruthy();
  }
}
module.exports = { DashboardPage };
