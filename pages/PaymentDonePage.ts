import { expect, Locator, Page } from "@playwright/test";

export class PaymentDonePage {
  page: Page;
  orderPlacedMessage: Locator;
  constructor(page: Page) {
    this.page = page;
    this.orderPlacedMessage = this.page.getByText("Order Placed!");
  }

  async downloadInvoice() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.page.getByText("Download Invoice").click();
    const download = await downloadPromise;
    await download.saveAs(
      "C:/PlaywrightWithCucumberAutomation/ECommerceAutomationProject/downloads/" +
        download.suggestedFilename()
    );
  }
}
