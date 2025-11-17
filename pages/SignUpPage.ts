import { expect, Locator, Page } from "@playwright/test";
export class SignUpPage {
  page: Page;
  name: Locator;
  emailAddress: Locator;
  signUpButton: Locator;
  acceptCookies: Locator;
  title: Locator;
  password: Locator;
  day: Locator;
  month: Locator;
  year: Locator;
  firstName: Locator;
  lastName: Locator;
  company: Locator;
  addressLine1: Locator;
  addressLine2: Locator;
  country: Locator;
  state: Locator;
  city: Locator;
  zipcode: Locator;
  mobileNumber: Locator;
  createAccountButton: Locator;
  continueButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.name = this.page.getByPlaceholder("Name");
    this.emailAddress = this.page.locator('[data-qa="signup-email"]');
    this.signUpButton = this.page.getByRole("button", { name: "Signup" });
    this.acceptCookies = this.page.locator('button:has-text("Consent")');
    this.title = this.page.getByLabel("Mr.");
    this.password = this.page.getByLabel("password");
    this.day = this.page.locator("#days");
    this.month = this.page.locator("#months");
    this.year = this.page.locator("#years");
    this.firstName = this.page.locator("#first_name");
    this.lastName = this.page.locator("#last_name");
    this.company = this.page.locator("#company");
    this.addressLine1 = this.page.locator("#address1");
    this.addressLine2 = this.page.locator("#address2");
    this.country = this.page.locator("#country");
    this.state = this.page.locator("#state");
    this.city = this.page.locator("#city");
    this.zipcode = this.page.locator("#zipcode");
    this.mobileNumber = this.page.locator("#mobile_number");
    this.createAccountButton = this.page.locator('[data-qa="create-account"]');
    this.continueButton = this.page.locator('[data-qa="continue-button"]');
  }
  async userSignUpWithPersonalInformation() {
    await this.name.fill("John Doe");
    await this.emailAddress.fill("johndoetest7@testing.com");
    await this.signUpButton.click();
    // Wait for the personal information section to appear after clicking Signup.
    // If the page closes unexpectedly, surface a clearer error.
    if (this.page.isClosed && this.page.isClosed()) {
      throw new Error("Page was closed after clicking Signup button");
    }
    // Wait for the title radio/label to be visible (could be slow on some networks)
    await expect(this.title).toBeVisible({ timeout: 15000 });
    await this.title.click();
    await this.password.fill("password@2025");
    await this.day.selectOption("9");
    await this.month.selectOption("9");
    await this.year.selectOption("2000");
    await this.firstName.fill("John");
    await this.lastName.fill("Doe");
    await this.company.fill("ABC Testing");
    await this.addressLine1.fill("24 Tib Street");
    await this.addressLine2.fill("Near Printworks");
    await this.country.selectOption("India");
    await this.state.fill("England");
    await this.city.fill("Manchester");
    await this.zipcode.fill("M44AB");
    await this.mobileNumber.fill("7903030204");
    await this.createAccountButton.click();
    await expect(
      this.page.getByRole("heading", { name: "Account Created!" })
    ).toBeVisible();
    await this.continueButton.click();
    await expect(this.page.getByText("Logged in as John Doe")).toBeVisible();
  }
}
