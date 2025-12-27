import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  page: Page;
  searchBox: Locator;
  searchButton: Locator;
  addToCartButton: Locator;
  productsList: Locator;
  pageHeading: Locator;
  acceptCookies: Locator;
  productNames: Locator;
  searchedHeading: Locator;
  continueShopping: Locator;
  viewCart: Locator;
  viewProduct: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.searchBox = this.page.getByPlaceholder("Search Product");
    this.searchButton = this.page.locator("#submit_search");
    this.addToCartButton = this.page.getByText("Add to cart");
    this.productsList = this.page.locator(".productinfo");
    this.pageHeading = this.page.getByText("All Products");
    this.acceptCookies = this.page.locator('button:has-text("Consent")');
    this.productNames = this.page.locator(".productinfo p");
    this.searchedHeading = this.page.getByText("Searched Products");
    this.continueShopping = this.page.getByText("Continue Shopping");
    this.viewCart = this.page.getByText("View Cart");
    this.viewProduct = this.page.getByRole("link", { name: "View Product" });
  }

  async getAllProductNames() {
    return await this.productNames.allTextContents();
  }

  async clickViewCart() {
    await this.viewCart.click();
  }
  async clickContinueShopping() {
    await this.continueShopping.click();
  }
  async addProduct(index: number) {
    await this.productNames.nth(index).hover();
    await this.addToCartButton.nth(index).click();
    await this.page.getByText("Added!").first().waitFor();
    return await this.productNames.first().allTextContents();
  }

  async clickViewProduct(index: number) {
    await this.viewProduct.nth(index).click();
  }
  async searchProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }

  async iAddAnItemToTheCart(index: number) {
    await this.productNames.nth(index).hover();
    await this.page
      .locator(".product-image-wrapper")
      .nth(index)
      .locator(".product-overlay a.add-to-cart")
      .click();
    await this.page.getByText("Added!").waitFor();
  }
}
