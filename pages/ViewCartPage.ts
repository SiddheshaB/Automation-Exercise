import { Page, Locator, expect } from "@playwright/test";
import { CommonApi } from "../features/step_definitions/CommonApi.steps";
import { BasePage } from "./BasePage";

export class ViewCartPage extends BasePage {
  page: Page;
  checkoutButton: Locator;
  registerLink: Locator;
  productName: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.checkoutButton = this.page.getByText("Proceed To Checkout");
    this.registerLink = this.page.getByText("Register / Login", {
      exact: true,
    });
    this.productName = this.page.locator(".cart_description h4 a");
  }
  async getProductName(index: number) {
    console.log(
      "Product in cart " + (await this.productName.nth(index).allTextContents())
    );
    return await this.productName.nth(index).textContent();
  }

  async clickRegisterLink() {
    await this.registerLink.click();
  }
  async removeAnItem(index: number) {
    await this.page
      .locator(
        "//tr[@id='product-" + index + "']//a[@class='cart_quantity_delete']"
      )
      .click();
  }
  async getCartItems() {
    return await this.productName.allTextContents();
  }
  async iVerifyCartItems(index: number) {
    const commonApi = new CommonApi();
    const productsList = await commonApi.getAllProductsListViaApi();
    for (let i = 0; i < index; i++) {
      expect(productsList[i].name).toBe(await this.getProductName(i));
    }
  }
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
