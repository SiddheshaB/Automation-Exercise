import { test, expect } from "../../fixtures/pageFixtures";
import userData from "../../test-data/userData.json";
test.describe("Login", () => {
  test.beforeEach(async ({ poManager, page }) => {
    await page.goto("https://automationexercise.com/login");
    await poManager.getLoginPage().consentCookies();
  });

  test("shows error for invalid email", async ({ poManager, page }) => {
    await poManager
      .getLoginPage()
      .login("johndoe@testing.com", "password@2025");
    await expect(
      page.getByText("Your email or password is incorrect!")
    ).toBeVisible();
  });

  test("shows error for invalid password", async ({ poManager, page }) => {
    await poManager
      .getLoginPage()
      .login("johndoetest4@testing.com", "wrongpassword");
    await expect(
      page.getByText("Your email or password is incorrect!")
    ).toBeVisible();
  });

  test("logs in with valid credentials", async ({
    poManager,
    authApi,
    page,
  }) => {
    await authApi.createUserViaApi();
    await poManager.getLoginPage().login(userData.email, userData.password);
    await expect(page.getByText("Logged in as John Doe")).toBeVisible();
    await poManager.getLoginPage().deleteAccount();
  });
});
