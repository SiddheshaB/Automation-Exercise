import { When } from "@cucumber/cucumber";

When(
  "I submit the Contact Us form with {string}, {string}, {string}, {string} and {string}",
  async function (
    name: string,
    email: string,
    subject: string,
    fileName: string,
    message: string
  ) {
    await this.poManager
      .getContactUsFormPage()
      .iSubmitContactUsForm(name, email, subject, message, fileName);
  }
);
