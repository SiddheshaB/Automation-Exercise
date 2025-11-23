import { Page, Locator, expect } from "@playwright/test";
import { CommonApi } from "../features/step_definitions/CommonApi.steps";

export class ViewCartPage {
  page: Page;
  checkoutButton: Locator;
  registerLink: Locator;
  productName: Locator;
  removeButton: Locator;
  //commonApi: CommonApi;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByText("Proceed To Checkout");
    this.registerLink = this.page.getByText("Register / Login", {
      exact: true,
    });
    this.productName = this.page.locator(".cart_description h4 a");
    this.removeButton = this.page.locator(".cart_quantity_delete");
  }
  async getProductName(index: number) {
    console.log(
      "Product in cart " + (await this.productName.nth(index).allTextContents())
    );
    return await this.productName.nth(index).textContent();
  }
  async iProceedToCheckout() {
    await this.checkoutButton.click();
  }

  async iSeeRegisterOption() {
    expect(await this.registerLink.isVisible()).toBeTruthy();
    await this.registerLink.click();
  }

  async iRemoveAnItem() {
    await this.removeButton.click();
  }

  async iVerifyCartItems(index: number) {
    const commonApi = new CommonApi();
    const productsList = await commonApi.getAllProductsListViaApi();
    for (let i = 0; i < index; i++) {
      expect(productsList[i].name).toBe(await this.getProductName(i));
    }
  }
}
