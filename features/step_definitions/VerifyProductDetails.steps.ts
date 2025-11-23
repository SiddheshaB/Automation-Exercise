import { Then, When } from "@cucumber/cucumber";
import { CommonApi } from "./CommonApi.steps";

When(
  "I view the details of the {string} product",
  async function (index: string) {
    const commonApi = new CommonApi();
    const products = await commonApi.getAllProductsListViaApi();
    await this.poManager
      .getProductDetailsPage()
      .iViewProductDetails(products[index], index);
  }
);

When(
  "I add a review with {string}, {string} and {string}",
  async function (name: string, email: string, review: string) {
    await this.poManager
      .getProductDetailsPage()
      .iAddAReview(name, email, review);
  }
);
