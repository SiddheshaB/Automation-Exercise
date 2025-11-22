import { Then, When } from "@cucumber/cucumber";
import { CommonApi } from "./CommonApi.steps";

When("I view the details of the first product", async function () {
  this.commonApi = new CommonApi();
  const firstProduct = await this.commonApi.getAllProductsListViaApi();
  await this.poManager
    .getProductDetailsPage()
    .iViewProductDetails(firstProduct);
});

Then("I should see the product details", async function () {
  // Write code here that turns the phrase above into concrete actions
});
