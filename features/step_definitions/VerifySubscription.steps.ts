import { Then, When } from "@cucumber/cucumber";

When("I click on {string} in the menu", async function (menuItem: string) {
  await this.poManager.getDashboardPage().iClickOnMenuItem(menuItem);
});

When("I subscribe with email {string}", async function (email: string) {
  await this.poManager.getDashboardPage().iSubscribe(email);
});

When("I click on the scroll up arrow", async function () {
  await this.poManager.getDashboardPage().iClickScrollUpArrow();
});

Then(
  "I should verify {string} is present on the top",
  async function (pageHeading: string) {
    await this.poManager.getDashboardPage().iVerifyTextOnTheTop(pageHeading);
  }
);
