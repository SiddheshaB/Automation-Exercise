import { expect, Locator, Page } from "@playwright/test";
export class BasePage {
  page: Page;
  acceptCookies: Locator;
  constructor(page: Page) {
    this.page = page;
    this.acceptCookies = this.page.locator('button:has-text("Consent")');
  }
  async gotoURL() {
    await this.page.goto("https://automationexercise.com/login");
  }
  async consentCookies() {
    await this.acceptCookies.click({ timeout: 3000 });
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
}
