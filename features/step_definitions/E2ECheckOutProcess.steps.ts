import { When, Then, Given } from "@cucumber/cucumber";
import { POManager } from "../../pages/POManager";
import { CommonApi } from "./CommonApi.steps";
declare module "@cucumber/cucumber" {
  interface World {
    poManager: POManager;
  }
}

Given(
  "I create a User {string} with password {string} via API",
  async function (email: string, password: string) {
    const commonApi = new CommonApi();
    await commonApi.createUserViaApi(email, password);
  }
);

When("I proceed to checkout", async function () {
  await this.poManager.getViewCartPage().iProceedToCheckout();
});

Then("I download the invoice", async function () {
  await this.poManager.getPaymentDonePage().iDownloadInvoice();
});

Then("I should see the order confirmation page", async function () {
  await this.poManager.getPaymentDonePage().iVerifyOrderConfirmation();
});

Then(
  "I should see be asked to login or register before checkout",
  async function () {
    await this.poManager.getViewCartPage().iSeeRegisterOption();
  }
);

When("I enter card details", async function () {
  await this.poManager.getCheckoutPage().iVerifyOrderReviewSection();
  await this.poManager.getPaymentPage().iEnterCardDetails();
});

When(
  "I verify quantity in the cart is {string}",
  async function (item: string) {
    await this.poManager.getViewCartPage().iVerifyProductInCart(item);
  }
);
