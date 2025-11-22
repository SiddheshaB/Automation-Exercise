import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  reviewOrder: Locator;
  comment: Locator;
  address: Locator;
  constructor(page: Page) {
    this.page = page;
    this.reviewOrder = this.page.getByRole("heading", {
      name: "Review Your Order",
    });
    this.comment = this.page.locator("textarea[name='message']");
    this.address = this.page.locator("#address_delivery");
  }
  async iVerifyOrderReviewSection() {
    await this.reviewOrder.isVisible();
    console.log("Delivery Address: " + (await this.address.innerText()));
    await this.address
      .filter({
        hasText:
          "24 Tib Street Near Printworks Manchester England M44AB   United Kingdom 7903030204",
      })
      .isVisible();
    await this.comment.fill("Please deliver between 9 AM to 5 PM");
    await this.page.getByText("Place Order").click();
  }
}
