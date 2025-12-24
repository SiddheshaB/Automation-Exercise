import { expect, Locator, Page } from "@playwright/test";

export class ProductsPage {
  page: Page;
  searchBox: Locator;
  searchButton: Locator;
  addToCartButton: Locator;
  productsList: Locator;
  productPage: Locator;
  acceptCookies: Locator;
  productName: Locator;
  constructor(page: Page) {
    this.page = page;
    this.searchBox = this.page.getByPlaceholder("Search Product");
    this.searchButton = this.page.locator("#submit_search");
    this.addToCartButton = this.page.getByText("Add to cart");
    this.productsList = this.page.locator(".productinfo");
    this.productPage = this.page.getByText("All Products");
    this.acceptCookies = this.page.locator('button:has-text("Consent")');
    this.productName = this.page.locator(".productinfo p");
  }
  async firstProduct() {
    return await this.productName.first().allTextContents();
  }

  async addProduct(index: number) {
    await this.productPage.isVisible();
    await this.productName.nth(index).hover();
    await this.addToCartButton.nth(index).click();
    await this.page.getByText("Added!").first().waitFor();
    return await this.productName.first().allTextContents();
  }

  async iSearchForAProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }

  async iVerifySearchedProductsAreVisible(product: string) {
    const count = await this.productName.count();
    for (let i = 0; i < count; i++) {
      expect(await this.productName.nth(i).textContent()).toContain(product);
    }
  }
  async iAddAnItemToTheCart(index: number) {
    await this.productName.nth(index).hover();
    await this.page
      .locator(".product-image-wrapper")
      .nth(index)
      .locator(".product-overlay a.add-to-cart")
      .click();
    await this.page.getByText("Added!").waitFor();
  }
}
