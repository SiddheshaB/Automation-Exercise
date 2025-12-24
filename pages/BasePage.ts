import { expect, Locator, Page } from "@playwright/test";
export class BasePage {
  page: Page;
  acceptCookies: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookies = this.page.locator('button:has-text("Consent")');
    this.continueButton = this.page.locator('[data-qa="continue-button"]');
  }
  async gotoURL(pageURL: string) {
    const baseURL = "https://automationexercise.com";
    await this.page.goto(baseURL + pageURL);
    await this.consentCookies();
    //await this.page.goto("https://automationexercise.com/login");
  }
  async consentCookies() {
    if (await this.acceptCookies.isVisible()) {
      await this.acceptCookies.click({ timeout: 5000 });
    }
  }
  async logout() {
    await this.page.getByText(/\bLogout\b/).click({ timeout: 15000 });

    await expect(this.page.getByText(" Signup / Login")).toBeVisible();
  }
  async deleteAccount() {
    await this.page.getByText(" Delete Account").click();
    await expect(
      this.page.getByRole("heading", { name: "Account Deleted!" })
    ).toBeVisible();
    await this.page.locator('[data-qa="continue-button"]').click();
    await expect(this.page.getByText(" Signup / Login")).toBeVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
