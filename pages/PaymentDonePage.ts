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
    const downloadPromise = this.page.waitForEvent("download");
    await this.page.getByText("Download Invoice").click();
    const download = await downloadPromise;
    await download.saveAs(
      "C:/PlaywrightWithCucumberAutomation/ECommerceAutomationProject/downloads/" +
        download.suggestedFilename()
    );
  }
}
