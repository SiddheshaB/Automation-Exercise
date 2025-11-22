import { Locator, Page } from "@playwright/test";

export class ProductsPage {
  page: Page;
  searchBox: Locator;
  searchButton: Locator;
  addToCartButton: Locator;
  viewCartButton: Locator;
  productsList: Locator;
  productPage: Locator;
  // firstProduct: Locator;
  acceptCookies: Locator;
  productName: Locator;
  constructor(page: Page) {
    this.page = page;
    this.searchBox = this.page.getByPlaceholder("Search Product");
    this.searchButton = this.page.locator("#submit_search");
    this.addToCartButton = this.page.getByText("Add to cart");
    this.viewCartButton = this.page.getByText("View Cart");
    this.productsList = this.page.locator(".productinfo");
    this.productPage = this.page.getByText("All Products");
    this.acceptCookies = this.page.locator('button:has-text("Consent")');
    this.productName = this.page.locator(".productinfo p");
  }
  async iGetProductNameAt(index: number) {
    return await this.productName.nth(index).allTextContents();
  }

  async iAddProductToCart(index: number) {
    if (await this.acceptCookies.isVisible()) {
      await this.acceptCookies.click({ timeout: 3000 });
    }
    await this.productPage.isVisible();
    await this.productName.nth(index).hover();
    await this.addToCartButton.nth(index).click();
    await this.page.getByText("Added!").first().waitFor();
    await this.viewCartButton.click();
  }

  async searchForProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
    //const count = await this.productsList.count();
    // console.log("products found: " + count);
    // for (let i = 0; i < count; i++) {
    //   console.log("Inside the for loop");
    //   if (
    //     (await this.productsList.nth(i).locator("p").textContent()) ==
    //     productName
    //   ) {
    //     console.log("Product found");
    //     await this.addToCartButton
    //       .nth(i)
    //       .locator('text= "Add to cart"')
    //       .click();
    //   } else {
    //     console.log("Product Not found");
    //   }
    // }
  }
}
