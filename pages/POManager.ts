import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { SignUpPage } from "./SignUpPage";
import { BasePage } from "./BasePage";
import { DashboardPage } from "./DashboardPage";
import { ProductsPage } from "./ProductsPage";
import { ViewCartPage } from "./ViewCartPage";
import { CheckoutPage } from "./CheckOutPage";
import { PaymentPage } from "./PaymentPage";
import { PaymentDonePage } from "./PaymentDonePage";
export class POManager {
  page: Page;
  basePage: BasePage;
  signUpPage: SignUpPage;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  productsPage: ProductsPage;
  viewCartPage: ViewCartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.signUpPage = new SignUpPage(this.page);
    this.basePage = new BasePage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.viewCartPage = new ViewCartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.paymentPage = new PaymentPage(this.page);
    this.paymentDonePage = new PaymentDonePage(this.page);
  }

  getBasePage() {
    return this.basePage;
  }
  getLoginPage() {
    return this.loginPage;
  }
  getSignUpPage() {
    return this.signUpPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getProductsPage() {
    return this.productsPage;
  }
  getViewCartPage() {
    return this.viewCartPage;
  }
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getPaymentPage() {
    return this.paymentPage;
  }
  getPaymentDonePage() {
    return this.paymentDonePage;
  }
}
