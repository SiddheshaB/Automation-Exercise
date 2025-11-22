import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
  page: Page;
  viewCart: Locator;
  productInformation: Locator;
  availability: Locator;
  condition: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewCart = this.page
      .getByRole("link", { name: "View Product" })
      .nth(0);
    this.productInformation = this.page.locator(".product-information");
    this.availability = this.page.getByText("Availability: In Stock", {
      exact: true,
    });
    this.condition = this.page.getByText("Condition: New", { exact: true });
  }

  async iViewProductDetails(firstProduct: any) {
    await this.viewCart.click();
    const info = await this.productInformation.innerText();
    expect(info).toContain(firstProduct.name);
    expect(info).toContain(firstProduct.brand);
    expect(info).toContain(firstProduct.price);
    expect(info).toContain(firstProduct.category.category);
    expect(info).toContain(firstProduct.category.usertype.usertype);
    expect(await this.availability).toBeVisible();
    expect(await this.condition).toBeVisible();
  }
}
