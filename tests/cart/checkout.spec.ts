import { test, expect } from "../../fixtures/pageFixtures";
import userData from "../../test-data/userData.json";
test.describe("checkout", async () => {
  test.beforeEach(async ({ poManager, page }) => {
    await page.goto("https://automationexercise.com/login");
    await poManager.getBasePage().consentCookies();
  });
  test("checkout as registered user", async ({ poManager, page, authApi }) => {
    await authApi.createUserViaApi();
    await poManager.getLoginPage().login(userData.email, userData.password);
    await expect(page.getByText("Logged in as John Doe")).toBeVisible();
    await page.goto("https://automationexercise.com/products");
    const addedProduct = await poManager.getProductsPage().addProduct(0);
    await poManager.getBasePage().clickByText("View Cart");
    await expect(
      page.getByText("Shopping Cart", { exact: true })
    ).toBeVisible();
    await expect(addedProduct[0]).toEqual(
      await poManager.getViewCartPage().getProductName(0)
    );
    await poManager.getBasePage().clickByText("Proceed To Checkout");
    const rawBillingAddress = await poManager
      .getCheckoutPage()
      .getBillingAddress();
    const billingAddress = await poManager
      .getBasePage()
      .normalizeText(rawBillingAddress);
    expect(billingAddress).toContain(
      userData.address1 +
        " " +
        userData.address2 +
        " " +
        userData.city +
        " " +
        userData.state +
        " " +
        userData.zipcode +
        " " +
        userData.country
    );
    const rawDeliveryAddress = await poManager
      .getCheckoutPage()
      .getDeliveryAddress();
    const deliveryAddress = await poManager
      .getBasePage()
      .normalizeText(rawDeliveryAddress);
    expect(deliveryAddress).toContain(
      userData.address1 +
        " " +
        userData.address2 +
        " " +
        userData.city +
        " " +
        userData.state +
        " " +
        userData.zipcode +
        " " +
        userData.country
    );
    await poManager
      .getCheckoutPage()
      .enterComment("Please deliver between 9 AM to 5 PM");
    await poManager.getBasePage().clickByText("Place Order");
    await poManager.getPaymentPage().enterCardDetails();
    expect(await page.getByText("Order Placed!")).toBeVisible();
    await poManager.getPaymentDonePage().downloadInvoice();
    // await poManager.getLoginPage().deleteAccount();
  });
});
