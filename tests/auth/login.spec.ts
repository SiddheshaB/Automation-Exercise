import { test, expect } from "../../fixtures/pageFixtures";
import userData from "../../test-data/userData.json";
import urls from "../../constants/urls";
import { getPages } from "../helpers/getPages";
test.describe("Login", () => {
  test.beforeEach(async ({ poManager }) => {
    await poManager.getLoginPage().open(urls.LOGIN);
  });

  test("shows error for invalid email", async ({ poManager }) => {
    const { loginPage } = getPages(poManager);
    await loginPage.login("johndoe@testing.com", "password@2025");
    await expect(
      loginPage.loginError).toBeVisible();
  });

  test("shows error for invalid password", async ({ poManager }) => {
    const { loginPage } = getPages(poManager);
    await loginPage.login("johndoetest4@testing.com", "wrongpassword");
    await expect(
      loginPage.loginError).toBeVisible();
  });

  test("logs in with valid credentials", async ({ poManager, authApi }) => {
    const { loginPage, dashboardPage } = getPages(poManager);
    await authApi.createUserViaApi();
    await loginPage.login(userData.email, userData.password);
    await expect(dashboardPage.loggedInUser).toBeVisible();
    await loginPage.deleteAccount();
  });
});
