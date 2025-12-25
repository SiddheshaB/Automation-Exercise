import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class DashboardPage extends BasePage {
  page: Page;
  addToCartButton: Locator;
  viewCartButton: Locator;
  subscribeEmail: Locator;
  loggedInUser: Locator;
  accountCreatedMessage: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addToCartButton = this.page.getByText("Add to cart");
    this.viewCartButton = this.page.locator('u:has-text("View Cart")');
    this.subscribeEmail = this.page.locator("#susbscribe_email");
    this.loggedInUser = this.page.getByText("Logged in as John Doe");
    this.accountCreatedMessage = this.page.getByText("Account Created!");
  }

  async addProductToCart() {
    await this.addToCartButton.first().click();
    await this.page.getByText("Added!").first().waitFor();
    await this.viewCartButton.click();
  }

  async gotoMenuItem(menuItem: string) {
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
