import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
  page: Page;
  viewProduct: Locator;
  productInformation: Locator;
  availability: Locator;
  condition: Locator;
  name: Locator;
  email: Locator;
  reviewBox: Locator;
  reviewSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewProduct = this.page.getByRole("link", { name: "View Product" });
    this.productInformation = this.page.locator(".product-information");
    this.availability = this.page.getByText("Availability: In Stock", {
      exact: true,
    });
    this.condition = this.page.getByText("Condition: New", { exact: true });
    this.name = this.page.getByPlaceholder("Your Name");
    this.email = this.page.locator("#email");
    this.reviewBox = this.page.getByPlaceholder("Add Review Here!");
    this.reviewSuccessMessage = this.page.getByText(
      "Thank you for your review.",
      { exact: true }
    );
  }

  async getProdutInformation() {
    return await this.productInformation.innerText();
  }

  async addReview(name: string, email: string, review: string) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.reviewBox.fill(review);
    await this.page.locator("#button-review").click();
  }
}
