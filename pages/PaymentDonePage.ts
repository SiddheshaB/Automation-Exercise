import { expect, Page } from "@playwright/test";

export class PaymentDonePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async iVerifyOrderConfirmation() {
    expect(await this.page.getByText("Order Placed!").isVisible()).toBeTruthy();
  }

  async iDownloadInvoice() {
    await this.page.getByText("Download Invoice").click();
  }
}
