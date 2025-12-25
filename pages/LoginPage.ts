import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
export class LoginPage extends BasePage {
  loginEmail: Locator;
  password: Locator;
  loginButton: Locator;
  name: Locator;
  signUpEmail: Locator;
  signUpButton: Locator;
  loginError: Locator;
  signupError: Locator;
  constructor(page: Page) {
    //this.page = page;
    super(page);
    this.loginEmail = page.locator('[data-qa="login-email"]');
    this.password = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.name = page.getByPlaceholder("Name");
    this.signUpEmail = page.locator('[data-qa="signup-email"]');
    this.signUpButton = page.getByRole("button", { name: "Signup" });
    this.loginError = page.getByText("Your email or password is incorrect!");
    this.signupError = page.getByText("Email Address already exist!");
  }
  async login(emailAddress: string, password: string) {
    await this.loginEmail.fill(emailAddress);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async registerWithExistingEmail() {
    await this.name.fill("John Doe");
    await this.signUpEmail.fill("johndoeuser@testing.com");
    await this.signUpButton.click();
  }
}
