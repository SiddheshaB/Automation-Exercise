import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
  page: Page;
  viewCart: Locator;
  productInformation: Locator;
  availability: Locator;
  condition: Locator;
  name: Locator;
  email: Locator;
  reviewText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewCart = this.page.getByRole("link", { name: "View Product" });
    this.productInformation = this.page.locator(".product-information");
    this.availability = this.page.getByText("Availability: In Stock", {
      exact: true,
    });
    this.condition = this.page.getByText("Condition: New", { exact: true });
    this.name = this.page.getByPlaceholder("Your Name");
    this.email = this.page.locator("#email");
    this.reviewText = this.page.getByPlaceholder("Add Review Here!");
  }

  async iViewProductDetails(firstProduct: any, item: string) {
    const index = Number(item);
    await this.viewCart.nth(index).click();
    const info = await this.productInformation.innerText();
    expect(info).toContain(firstProduct.name);
    expect(info).toContain(firstProduct.brand);
    expect(info).toContain(firstProduct.price);
    expect(info).toContain(firstProduct.category.category);
    expect(info).toContain(firstProduct.category.usertype.usertype);
    expect(await this.availability).toBeVisible();
    expect(await this.condition).toBeVisible();
  }

  async iAddAReview(name: string, email: string, review: string) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.reviewText.fill(review);
    await this.page.locator("#button-review").click();
    expect(
      await this.page.getByText("Thank you for your review.", { exact: true })
        .isVisible
    ).toBeTruthy();
  }
}
