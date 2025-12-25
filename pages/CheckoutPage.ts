import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  page: Page;
  reviewOrder: Locator;
  comment: Locator;
  deliveryAddress: Locator;
  billingAddress: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.reviewOrder = this.page.getByRole("heading", {
      name: "Review Your Order",
    });
    this.comment = this.page.locator("textarea[name='message']");
    this.deliveryAddress = this.page.locator("#address_delivery");
    this.billingAddress = this.page.locator("#address_invoice");
  }

  async getDeliveryAddress() {
    return await this.deliveryAddress.innerText();
  }
  async getBillingAddress() {
    return await this.billingAddress.innerText();
  }
  async enterComment(comment: string) {
    await this.comment.fill(comment);
  }
  async proceedToCheckout() {
    await this.page.getByText("Place Order").click();
  }
}
