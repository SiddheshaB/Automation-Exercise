import { test, expect } from "../../fixtures/pageFixtures";
import userData from "../../test-data/userData.json";
test.describe("Check Login Functionality", () => {
  test.beforeEach(async ({ poManager, page }) => {
    await page.goto("https://automationexercise.com/login");
    await poManager.getLoginPage().consentCookies();
  });

  test("Login with invalid email address", async ({ poManager, page }) => {
    await poManager
      .getLoginPage()
      .login("johndoe@testing.com", "password@2025");
    await expect(
      page.getByText("Your email or password is incorrect!")
    ).toBeVisible();
  });

  test("Login with invalid password", async ({ poManager, page }) => {
    await poManager
      .getLoginPage()
      .login("johndoetest4@testing.com", "wrongpassword");
    await expect(
      page.getByText("Your email or password is incorrect!")
    ).toBeVisible();
  });

  test("Login with valid credentials", async ({ poManager, authApi, page }) => {
    await authApi.createUserViaApi();
    await poManager.getLoginPage().login(userData.email, userData.password);
    await expect(page.getByText("Logged in as John Doe")).toBeVisible();
    await poManager.getLoginPage().deleteAccount();
  });
});
