import { When, Then, Given } from "@cucumber/cucumber";
import { POManager } from "../../pages/POManager";
import { BasePage } from "../../pages/BasePage";
import { expect } from "@playwright/test";

declare module "@cucumber/cucumber" {
  interface World {
    poManager: POManager;
    basePage: BasePage;
  }
}

Given("User signup with personal information", async function () {
  this.basePage = this.poManager.getBasePage();
  await this.basePage.gotoURL();
  await this.basePage.consentCookies();
  await this.poManager.getSignUpPage().userSignUpWithPersonalInformation();
});
When(
  "I login with credentials {string} and {string}",
  async function (emailAddress, password) {
    await this.poManager.getBasePage().gotoURL();
    await this.poManager.getBasePage().consentCookies();
    await this.poManager
      .getLoginPage()
      .iLoginWithCredentials(emailAddress, password);
  }
);

Then("I should see the {string}", async function (result) {
  await expect(this.page.getByText(result)).toBeVisible();
});
Then("I delete the account", async function () {
  await this.poManager.getBasePage().deleteAccount();
});

Given("I logout from the account", async function () {
  await this.poManager.getBasePage().logout();
});
