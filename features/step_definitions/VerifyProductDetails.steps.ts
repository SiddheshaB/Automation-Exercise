import { Then, When } from "@cucumber/cucumber";
import { CommonApi } from "./CommonApi.steps";

When("I view the details of the first product", async function () {
  this.commonApi = new CommonApi();
  const firstProduct = await this.commonApi.getAllProductsListViaApi();
  await this.poManager
    .getProductDetailsPage()
    .iViewProductDetails(firstProduct);
});

When(
  "I add a review with {string}, {string} and {string}",
  async function (name: string, email: string, review: string) {
    await this.poManager
      .getProductDetailsPage()
      .iAddAReview(name, email, review);
  }
);
