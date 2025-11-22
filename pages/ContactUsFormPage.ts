import { Locator, Page, expect } from "@playwright/test";
const path = require("path");
export class ContactUsFormPage {
  page: Page;
  name: Locator;
  email: Locator;
  subject: Locator;
  message: Locator;
  chooseFile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = this.page.getByPlaceholder("Name");
    this.email = this.page.getByRole("textbox", { name: "Email", exact: true });
    this.subject = this.page.getByPlaceholder("Subject");
    this.message = this.page.getByPlaceholder("Your Message Here");
    this.chooseFile = this.page.locator("input[name='upload_file']");
  }

  async iSubmitContactUsForm(
    Name: string,
    Email: string,
    Subject: string,
    Message: string,
    FileName: string
  ) {
    expect(
      await this.page.getByRole("heading", { name: "Get In Touch" })
    ).toBeVisible();
    await this.name.fill(Name);
    await this.email.fill(Email);
    await this.subject.fill(Subject);
    await this.message.fill(Message);
    await this.chooseFile.setInputFiles(path.join(__dirname, FileName));
    await this.page.locator('[name="submit"]').click();
    // await this.page.on("dialog", (dialog) => dialog.accept());
    // await this.page.getByRole("button").click();
  }
}
