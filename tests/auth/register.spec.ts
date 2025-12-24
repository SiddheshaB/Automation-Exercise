import { test, expect } from "../../fixtures/pageFixtures";
test.describe("Registration", () => {
  test.beforeEach(async ({ poManager, page }) => {
    await page.goto("https://automationexercise.com/login");
    await poManager.getBasePage().consentCookies();
  });

  test("new user registered", async ({ poManager, page, authApi }) => {
    await authApi.deleteUserViaApi("johndoeuser@testing.com", "password@2025");
    await poManager.getSignUpPage().signUp();
    await expect(
      page.getByRole("heading", { name: "Account Created!" })
    ).toBeVisible();
    await poManager.getBasePage().clickContinue();
    await expect(page.getByText("Logged in as John Doe")).toBeVisible({
      timeout: 15000,
    });
  });

  test("shows error for existing email", async ({ poManager, page }) => {
    await poManager.getLoginPage().registerWithExistingEmail();
    await expect(page.getByText("Email Address already exist!")).toBeVisible();
  });
});
