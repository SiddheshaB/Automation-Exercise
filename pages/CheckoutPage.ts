import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  reviewOrder: Locator;
  comment: Locator;
  constructor(page: Page) {
    this.page = page;
    this.reviewOrder = this.page.getByRole("heading", {
      name: "Review Your Order",
    });
    this.comment = this.page.locator("textarea[name='message']");
  }
  async verifyOrderReviewSection() {
    await this.reviewOrder.isVisible();
    await this.comment.fill("Please deliver between 9 AM to 5 PM");
    await this.page.getByText("Place Order").click();
  }
}
