import { When, Then, Given } from "@cucumber/cucumber";
import { POManager } from "../../pages/POManager";
import { CommonApi } from "./CommonApi.steps";
declare module "@cucumber/cucumber" {
  interface World {
    poManager: POManager;
  }
}
const url = "https://automationexercise.com/";

Given(
  "I create a User {string} with password {string}",
  async function (email: string, password: string) {
    this.commonApi = new CommonApi();
    await this.commonApi.createUserViaApi(email, password);
  }
);

Then("I search for item {string}", async function (productName: string) {
  await this.poManager.getProductsPage().searchForProduct(productName);
});

When("I add first item to the cart", async function () {
  await this.page.goto(url + "/products");
  await this.poManager.getProductsPage().addProductToCart();
  await this.poManager.getViewCartPage().verifyProductInCart();
});

When("I proceed to checkout", async function () {
  await this.poManager.getViewCartPage().proceedToCheckout();
  await this.poManager.getCheckoutPage().verifyOrderReviewSection();
  await this.poManager.getPaymentPage().enterCardDetails();
});

Then("I download the invoice", async function () {
  await this.poManager.getPaymentDonePage().downloadInvoice();
});

Then("I should see the order confirmation page", async function () {
  await this.poManager.getPaymentDonePage().verifyOrderConfirmation();
});
