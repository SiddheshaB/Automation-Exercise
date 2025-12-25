import { test, expect } from "../../fixtures/pageFixtures";
import urls from "../../constants/urls";
import { getPages } from "../helpers/getPages";
test.describe("Registration", () => {
  test.beforeEach(async ({ poManager }) => {
    await poManager.getLoginPage().open(urls.LOGIN);
  });

  test("new user registered", async ({ poManager, authApi }) => {
    const { signUpPage, dashboardPage } = getPages(poManager);
    await authApi.deleteUserViaApi("johndoeuser@testing.com", "password@2025");
    await signUpPage.signUp();
    await expect(dashboardPage.accountCreatedMessage).toBeVisible();
    await dashboardPage.clickContinue();
    await expect(dashboardPage.loggedInUser).toBeVisible();
  });

  test("shows error for existing email", async ({ poManager }) => {
    const { loginPage } = getPages(poManager);
    await loginPage.registerWithExistingEmail();
    await expect(loginPage.signupError).toBeVisible();
  });
});
