import { When, Then, Given } from "@cucumber/cucumber";
import { POManager } from "../../pages/POManager";
import { BasePage } from "../../pages/BasePage";
import { expect } from "@playwright/test";

declare module "@cucumber/cucumber" {
  interface World {
    poManager: POManager;
  }
}

Given("I signup with personal information", async function () {
  await this.poManager.getBasePage().gotoURL("/login");
  await this.poManager.getSignUpPage().userSignUpWithPersonalInformation();
});
When(
  "I login with credentials {string} and {string}",
  async function (emailAddress, password) {
    await this.poManager.getBasePage().gotoURL("/login");
    await this.poManager
      .getLoginPage()
      .iLoginWithCredentials(emailAddress, password);
  }
);

Then("I should see the result {string}", async function (result) {
  await expect(this.page.getByText(result)).toBeVisible();
});
Then("I delete the account", async function () {
  await this.poManager.getBasePage().deleteAccount();
});

Given("I logout from the account", async function () {
  await this.poManager.getBasePage().logout();
});

When("I register with existing email", async function () {
  await this.poManager.getLoginPage().iRegisterwithExistingEmail();
});
