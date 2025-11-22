import { Locator, Page } from "@playwright/test";
export class LoginPage {
  page: Page;
  loginEmail: Locator;
  password: Locator;
  loginButton: Locator;
  name: Locator;
  signUpEmail: Locator;
  signUpButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.loginEmail = this.page.locator('[data-qa="login-email"]');
    this.password = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.name = this.page.getByPlaceholder("Name");
    this.signUpEmail = this.page.locator('[data-qa="signup-email"]');
    this.signUpButton = this.page.getByRole("button", { name: "Signup" });
  }
  async iLoginWithCredentials(emailAddress: string, password: string) {
    await this.loginEmail.fill(emailAddress);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async iRegisterwithExistingEmail() {
    await this.name.fill("John Doe");
    await this.signUpEmail.fill("johndoetest7@testing.com");
    await this.signUpButton.click();
  }
}
