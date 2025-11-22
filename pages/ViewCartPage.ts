import { Page, Locator, expect } from "@playwright/test";
import { CommonApi } from "../features/step_definitions/CommonApi.steps";

export class ViewCartPage {
  page: Page;
  checkoutButton: Locator;
  registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByText("Proceed To Checkout");
    this.registerLink = this.page.getByText("Register / Login", {
      exact: true,
    });
  }
  async iVerifyProductInCart(item: string) {
    const quantity = await this.page.locator(".cart_quantity").innerText();
    expect(quantity).toEqual(item);
  }
  async iProceedToCheckout() {
    await this.checkoutButton.click();
  }

  async iSeeRegisterOption() {
    expect(await this.registerLink.isVisible()).toBeTruthy();
    await this.registerLink.click();
  }
}
