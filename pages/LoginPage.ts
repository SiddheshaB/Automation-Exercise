import {Locator, Page} from"@playwright/test";
export class LoginPage{
    page: Page;
    emailAddress: Locator;
    password: Locator;
    loginButton: Locator;
    constructor(page: Page){
        this.page= page;
        this.emailAddress= this.page.locator('[data-qa="login-email"]');
        this.password= this.page.getByPlaceholder("Password");
        this.loginButton= this.page.getByRole("button", {name: "Login"});
    }
    async iLoginWithCredentials(emailAddress: string, password: string){
        await this.emailAddress.fill(emailAddress);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}