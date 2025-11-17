import { Locator, Page } from "@playwright/test";

export class PaymentPage {
  page: Page;
  cardName: Locator;
  cardNumber: Locator;
  cvc: Locator;
  expiryMonth: Locator;
  expiryYear: Locator;
  constructor(page: Page) {
    this.page = page;
    this.cardName = this.page.locator("input[name='name_on_card']");
    this.cardNumber = this.page.locator("input[name='card_number']");
    this.cvc = this.page.locator("input[name='cvc']");
    this.expiryMonth = this.page.locator("input[name='expiry_month']");
    this.expiryYear = this.page.locator("input[name='expiry_year']");
  }

  async enterCardDetails() {
    await this.cardName.fill("John Doe");
    await this.cardNumber.fill("4111111111111111");
    await this.cvc.fill("123");
    await this.expiryMonth.fill("12");
    await this.expiryYear.fill("2025");
    await this.page.getByText("Pay and Confirm Order").click();
  }
}
