import { Given, Then, When } from "@cucumber/cucumber";

Then("I search for item {string}", async function (productName: string) {
  await this.poManager.getProductsPage().iSearchForAProduct(productName);
});

Then(
  "I should see all the products related to {string} are visible",
  async function (product: string) {
    await this.poManager
      .getProductsPage()
      .iVerifySearchedProductsAreVisible(product);
  }
);

Given("I navigate to the {string} page", async function (pageURL: string) {
  await this.poManager.getBasePage().gotoURL(pageURL);
});

When("I add item {string} to the cart", async function (index: string) {
  const numIndex = Number(index);
  await this.poManager.getProductsPage().iAddAnItemToTheCart(numIndex - 1);
});

When("I click on {string} button", async function (button: string) {
  await this.poManager.getProductsPage().iClickOnTheButton(button);
});

Then("I should not see item in the cart", async function () {});

When("I remove {string} from the cart", async function (item: string) {
  // Write code here that turns the phrase above into concrete actions
});

Then("I should see {string} items in the cart", async function (items: string) {
  await this.poManager.getViewCartPage().iVerifyCartItems(items);
});
